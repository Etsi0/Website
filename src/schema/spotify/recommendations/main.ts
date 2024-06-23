import { z } from 'zod';

export const schemaPlaylist = z.object({
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

export const schemaAudioFeatures = z.object({
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

export const schemaRecommendations = z.object({
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
