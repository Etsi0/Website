export async function GET(req: Request) {
	const searchQuery = new URL(req.url).searchParams.get('query');
	const searchVersions = new URL(req.url).searchParams.get('versions');
	const response = await fetch(
		`https://api.modrinth.com/v2/project/${searchQuery}/version?loaders=["fabric"]&game_versions=["${searchVersions}"]`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: process.env.DB_USER,
			},
		},
	);
	if (!response.ok) {
		console.error(`API call failed with status: ${response.status}`);
		throw new Error(`API call failed with status: ${response.status}`);
	}
	const data = await response.json();
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
	});
}
