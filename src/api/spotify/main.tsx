import { z } from 'zod';

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

export async function GetSongsFromPlaylist(countryCode: string, playlist: string) {
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

export async function GetSongs(song: string) {
	const response = await GetFromAPI(`https://api.spotify.com/v1/audio-features?ids=${song}`);
	if (!response) {
		return false;
	}

	return await response;
}

export async function GetRecommendations(
	artists: { [x: string]: number },
	countryCode: string,
	data: z.infer<typeof songDataSchema>['audio_features'][number],
	limit: number,
	total: number
) {
	// takes the 5 artists that comes up most often in the playlist
	const topFiveArtists = Object.entries(artists)
		.sort((a: [string, number], b: [string, number]) => b[1] - a[1])
		.slice(0, 5)
		.map((entry) => entry[0]);

	// divides all keys by the number of songs and rounds the number if it should be a int
	for (const key in data) {
		const keyWithTypes = key as keyof z.infer<typeof songDataSchema>['audio_features'][number];
		if (typeof data[keyWithTypes] !== 'number') {
			continue;
		}

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
