'use server';
import { z } from 'zod';

import { GetRecommendations, GetPlaylist, GetAudioFeatures } from '@/api/spotify/main';
import {
	schemaAudioFeatures,
	schemaPlaylist,
	schemaRecommendations,
} from '@/schema/spotify/recommendations/main';

const initialStats: z.infer<typeof schemaAudioFeatures>['audio_features'][number] = {
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

	/*==================================================
		Playlist
	==================================================*/
	const dataPlaylist: unknown = await GetPlaylist(countryCode, playlist);
	const parsedPlaylist = schemaPlaylist.safeParse(dataPlaylist);
	if (!parsedPlaylist.success) {
		return false;
	}
	const { items } = parsedPlaylist.data.tracks;

	const songIds = items.map((item) => item.track.id);

	/*==================================================
		AudioFeatures
	==================================================*/
	const dataAudioFeatures: unknown = await GetAudioFeatures(songIds);
	const parsedAudioFeatures = schemaAudioFeatures.safeParse(dataAudioFeatures);
	if (!parsedAudioFeatures.success) {
		return false;
	}
	const { audio_features } = parsedAudioFeatures.data;

	const artists = items.reduce(
		(accumulator, currentValue) => {
			currentValue.track.artists.forEach((artist) => {
				accumulator[artist.id] = (accumulator[artist.id] || 0) + 1;
			});
			return accumulator;
		},
		{} as { [x: string]: number }
	);

	const totalVibe = audio_features.reduce((accumulator, currentValue) => {
		for (const key in currentValue) {
			const keyWithTypes = key as keyof typeof currentValue;
			accumulator[keyWithTypes] += currentValue[keyWithTypes];
		}
		return accumulator;
	}, initialStats);

	/*==================================================
		Recommendations
	==================================================*/
	const dataRecommendations: unknown = await GetRecommendations(
		artists,
		countryCode,
		totalVibe,
		parseInt(limit),
		audio_features.length
	);
	const parsedRecommendations = schemaRecommendations.safeParse(dataRecommendations);
	if (!parsedRecommendations.success) {
		return false;
	}
	const { tracks } = parsedRecommendations.data;

	return tracks.map((track) => ({
		image: track.album.images[1],
		previewUrl: track.preview_url,
		track: {
			name: track.name,
			link: track.external_urls.spotify,
		},
		artists: track.artists.map((artist) => ({
			name: artist.name,
			link: artist.external_urls.spotify,
		})),
		album: {
			name: track.album.name,
			link: track.album.external_urls.spotify,
		},
	}));
}
