import { z } from 'zod';

const side = ['required', 'optional', 'unsupported'] as const;
export const projectSchema = z.array(
	z.object({
		categories: z.array(z.string()),
		client_side: z.enum(side),
		game_versions: z.array(z.string()),
		icon_url: z.string(),
		id: z.string(),
		loaders: z.array(z.string()),
		server_side: z.enum(side),
		slug: z.string(),
		title: z.string(),
	})
);

export const dependenciesSchema = z.object({
	projects: z.array(
		z.object({
			id: z.string(),
			slug: z.string(),
			title: z.string(),
		})
	),
});

export const collectionSchema = z.array(
	z.object({
		projects: z.array(z.string()),
	})
);

export const versionSchema = z.array(
	z.object({
		date_published: z.string(),
		files: z.array(
			z.object({
				url: z.string(),
			})
		),
		game_versions: z.array(z.string()),
	})
);
