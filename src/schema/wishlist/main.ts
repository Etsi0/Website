import { z } from 'zod';

export const schemaWishlist = z.array(
	z.object({
		id: z.number(),
		img: z.string(),
		title: z.string(),
		description: z.string().nullable(),
		video: z.string().nullable(),
		url: z.string().nullable(),
		priority: z.number().nullable(),
	})
);
