'use server';

import { useSongJsonContext } from '@/context/songsContext';
import { GetRecommendations, GetSongs, GetSongsFromPlaylist } from './page';

export async function CreateRecommendations(formData: FormData) {
	const playlistData = await GetSongsFromPlaylist(
		formData.get('countryCode'),
		formData.get('playlist'),
	);
	if (!playlistData) {
		return false;
	}

	const songIds = playlistData.tracks.items.map((item) => item.track.id);
	const songsData = await GetSongs(songIds.join(','));
	if (!songsData) {
		return false;
	}

	const initialStats = {
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

	const songsList = songsData.audio_features.reduce((accumulator, currentSong) => {
		for (const key in initialStats) {
			if (key === 'artists' || key === 'total') {
				continue;
			}
			accumulator[key] += currentSong[key];
		}
		return accumulator;
	}, initialStats);
	playlistData.tracks.items.forEach((item) => {
		item.track.artists.forEach((artist) => {
			songsList.artists[artist.id] = (songsList.artists[artist.id] || 0) + 1;
		});
	});
	songsList.total = songsData.audio_features.length;

	const recommendationsData = await GetRecommendations(
		parseInt(formData.get('limit') as string),
		formData.get('countryCode') as string,
		songsList,
	);
	if (!recommendationsData) {
		return false;
	}
	return recommendationsData.tracks.map((song) => {
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
