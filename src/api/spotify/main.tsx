import { z } from 'zod';
import { schemaAudioFeatures } from '@/schema/spotify/recommendations/main';

async function GetToken() {
	const authString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
	const authBase64 = Buffer.from(authString).toString('base64');
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${authBase64}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials',
		}),
		next: {
			revalidate: 3600,
		},
	});
	try {
		const result = await response.json();
		if (result.status) {
			return false;
		}
		return result;
	} catch {
		return false;
	}
}

async function GetFromAPI(href: string) {
	const data = await GetToken();
	if (!data) {
		return false;
	}

	const response = await fetch(href, {
		headers: { Authorization: `${data.token_type} ${data.access_token}` },
	});

	try {
		const result = await response.json();
		if (result.status) {
			return false;
		}
		return result;
	} catch {
		return false;
	}
}

export async function GetPlaylist(countryCode: string, playlist: string) {
	const regex = RegExp('open.spotify.com/playlist/([^?]+)');
	const playlist_id = regex.exec(playlist);
	if (!playlist_id || !playlist_id[1]) {
		return false;
	}

	const response = await GetFromAPI(
		`https://api.spotify.com/v1/playlists/${playlist_id[1]}?market=${countryCode}`
	);

	if (!response) {
		return false;
	}

	return await response;
}

export async function GetAudioFeatures(ids: string[]) {
	const response = await GetFromAPI(
		`https://api.spotify.com/v1/audio-features?ids=${ids.join(',')}`
	);
	if (!response) {
		return false;
	}

	return await response;
}

export async function GetRecommendations(
	artists: { [x: string]: number },
	countryCode: string,
	data: z.infer<typeof schemaAudioFeatures>['audio_features'][number],
	limit: number,
	total: number
) {
	const topFiveArtists = Object.entries(artists)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map((entry) => entry[0]); // removes the number of times the artist appears

	for (const key in data) {
		const keyWithTypes = key as keyof z.infer<
			typeof schemaAudioFeatures
		>['audio_features'][number];
		const value = data[keyWithTypes];

		if (key === 'duration_ms' || key === 'key' || key === 'mode' || key === 'time_signature') {
			data[keyWithTypes] = Math.round(value / total);
		} else {
			data[keyWithTypes] = parseFloat((value / total).toFixed(5));
		}
	}

	const response = await GetFromAPI(
		`https://api.spotify.com/v1/recommendations?limit=${limit}&market=${countryCode}&seed_artists=${topFiveArtists.join(',')}&target_acousticness=${data.acousticness}&target_danceability=${data.danceability}&target_duration_ms=${data.duration_ms}&target_energy=${data.energy}&target_instrumentalness=${data.instrumentalness}&target_key=${data.key}&target_liveness=${data.liveness}&target_loudness=${data.loudness}&target_mode=${data.mode}&target_speechiness=${data.speechiness}&target_tempo=${data.tempo}&target_time_signature=${data.time_signature}&target_valence=${data.valence}`
	);
	if (!response) {
		return false;
	}

	return await response;
}
