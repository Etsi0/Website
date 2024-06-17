'use server';
import { z } from 'zod';

import { GetRecommendations, GetSongs, GetSongsFromPlaylist } from '@/api/spotify/main';

type TInitialStats = {
	[x: string]: number | { [x: string]: number };
} & {
	artists: { [x: string]: number };
};

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
			preview_url: z.string() || z.null(),
			name: z.string(),
		})
	),
});

export async function CreateRecommendations(formData: FormData) {
	const countryCode = formData.get('countryCode');
	const playlist = formData.get('playlist');
	if (typeof countryCode !== 'string' || typeof playlist !== 'string') {
		return false;
	}

	const playlistData: unknown = await GetSongsFromPlaylist(countryCode, playlist);
	const parsedPlaylistData = playlistDataSchema.safeParse(playlistData);
	if (!parsedPlaylistData.success) {
		return false;
	}
	const { tracks } = parsedPlaylistData.data;
	const songIds = tracks.items.map((item) => item.track.id);

	const songsData: unknown = await GetSongs(songIds.join(','));
	const parsedSongsData = songDataSchema.safeParse(songsData);
	if (!parsedSongsData.success) {
		console.log('Songs');
		return false;
	}
	const { audio_features } = parsedSongsData.data;

	const initialStats: TInitialStats = {
		artists: {},
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
		total: 0,
	};

	const songsList = audio_features.reduce((accumulator, currentSong) => {
		for (const key in currentSong) {
			const keyWithTypes = key as keyof typeof currentSong;
			if (
				typeof accumulator[keyWithTypes] === 'number' &&
				typeof currentSong[keyWithTypes] === 'number'
			) {
				accumulator[keyWithTypes] += currentSong[keyWithTypes];
			}
		}
		return accumulator;
	}, initialStats);
	tracks.items.forEach((item) => {
		item.track.artists.forEach((artist) => {
			songsList.artists[artist.id] = (songsList.artists[artist.id] || 0) + 1;
		});
	});
	songsList.total = audio_features.length;

	const recommendationsData: unknown = await GetRecommendations(
		parseInt(formData.get('limit') as string),
		formData.get('countryCode') as string,
		songsList
	);
	const parsedRecommendationsData = recommendationsDataSchema.safeParse(recommendationsData);
	if (!parsedRecommendationsData.success) {
		return false;
	}
	return parsedRecommendationsData.data.tracks.map((song) => {
		return {
			image: song.album.images[1],
			previewUrl: song.preview_url,
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
