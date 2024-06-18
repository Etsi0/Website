import { z } from 'zod';

export const projectSchema = z.array(
	z.object({
		categories: z.array(z.string()),
		game_versions: z.array(z.string()),
		icon_url: z.string(),
		id: z.string(),
		loaders: z.array(z.string()),
		slug: z.string(),
		title: z.string(),
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

async function GetFromAPI(href: string) {
	const response = await fetch(`https://api.modrinth.com/v2/${href}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
	});

	try {
		return await response.json();
	} catch {
		return false;
	}
}

function ParseData<T>(input: unknown, schema: z.ZodType<T>) {
	const parsedInput = schema.safeParse(input);

	if (!parsedInput.success) {
		return false;
	}

	return parsedInput.data;
}

export async function GetProjects(ids: string[]) {
	const response: unknown = await GetFromAPI(
		`projects?ids=${encodeURIComponent(JSON.stringify(ids))}`
	);

	return ParseData<z.infer<typeof projectSchema>>(response, projectSchema);
}

export async function GetVersions(id: string) {
	const response: unknown = await GetFromAPI(
		`project/${encodeURIComponent(id)}/version?loaders=["fabric"]&featured=true`
	);

	return ParseData<z.infer<typeof versionSchema>>(response, versionSchema);
}
