'use server';
import { z } from 'zod';

import { GetRecommendations, GetSongs, GetSongsFromPlaylist } from '@/api/spotify/main';

const playlistDataSchema = z.object({
	tracks: z.object({
		items: z.array(
			z.object({
				track: z.object({
					id: z.string(),
					artists: z.array(
						z.object({
							external_urls: z.object({
								spotify: z.string(),
							}),
							id: z.string(),
							name: z.string(),
						})
					),
				}),
			})
		),
	}),
});

const songDataSchema = z.object({
	audio_features: z.array(
		z.object({
			acousticness: z.number(),
			danceability: z.number(),
			duration_ms: z.number(),
			energy: z.number(),
			instrumentalness: z.number(),
			key: z.number(),
			liveness: z.number(),
			loudness: z.number(),
			mode: z.number(),
			speechiness: z.number(),
			tempo: z.number(),
			time_signature: z.number(),
			valence: z.number(),
		})
	),
});
const recommendationsDataSchema = z.object({
	tracks: z.array(
		z.object({
			album: z.object({
				external_urls: z.object({
					spotify: z.string(),
				}),
				images: z.array(
					z.object({
						url: z.string(),
						height: z.number(),
						width: z.number(),
					})
				),
				name: z.string(),
			}),
			artists: z.array(
				z.object({
					external_urls: z.object({
						spotify: z.string(),
					}),
					name: z.string(),
				})
			),
			external_urls: z.object({
				spotify: z.string(),
			}),
			preview_url: z.string().nullable(),
			name: z.string(),
		})
	),
});

export async function CreateRecommendations(formData: FormData) {
	const countryCode = formData.get('countryCode');
	const playlist = formData.get('playlist');
	const limit = formData.get('limit');
	if (
		typeof countryCode !== 'string' ||
		typeof playlist !== 'string' ||
		typeof limit !== 'string'
	) {
		return false;
	}

	const playlistData: unknown = await GetSongsFromPlaylist(countryCode, playlist);
	const parsedPlaylistData = playlistDataSchema.safeParse(playlistData);
	if (!parsedPlaylistData.success) {
		return false;
	}
	const { items } = parsedPlaylistData.data.tracks;
	const songIds = items.map((item) => item.track.id);

	const songsData: unknown = await GetSongs(songIds.join(','));
	const parsedSongsData = songDataSchema.safeParse(songsData);
	if (!parsedSongsData.success) {
		console.log('Songs');
		return false;
	}
	const { audio_features } = parsedSongsData.data;

	const initialStats: z.infer<typeof songDataSchema>['audio_features'][number] = {
		acousticness: 0,
		danceability: 0,
		duration_ms: 0,
		energy: 0,
		instrumentalness: 0,
		key: 0,
		liveness: 0,
		loudness: 0,
		mode: 0,
		speechiness: 0,
		tempo: 0,
		time_signature: 0,
		valence: 0,
	};

	const songsList = audio_features.reduce((accumulator, currentValue) => {
		for (const key in currentValue) {
			const keyWithTypes = key as keyof typeof currentValue;
			accumulator[keyWithTypes] += currentValue[keyWithTypes];
		}
		return accumulator;
	}, initialStats);

	const artists = items.reduce(
		(accumulator, currentValue) => {
			currentValue.track.artists.forEach((artist) => {
				accumulator[artist.id] = (accumulator[artist.id] || 0) + 1;
			});
			return accumulator;
		},
		{} as { [x: string]: number }
	);

	const recommendationsData: unknown = await GetRecommendations(
		artists,
		countryCode,
		songsList,
		parseInt(limit),
		audio_features.length
	);
	const parsedRecommendationsData = recommendationsDataSchema.safeParse(recommendationsData);
	if (!parsedRecommendationsData.success) {
		return false;
	}
	const { tracks } = parsedRecommendationsData.data;

	return tracks.map((song) => {
		return {
			image: song.album.images[1],
			previewUrl: song.preview_url || '',
			track: {
				name: song.name,
				link: song.external_urls.spotify,
			},
			artists: song.artists.map((artist) => ({
				name: artist.name,
				link: artist.external_urls.spotify,
			})),
			album: {
				name: song.album.name,
				link: song.album.external_urls.spotify,
			},
		};
	});
}
