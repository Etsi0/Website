export async function GetFromAPI(href: string) {
	const response = await fetch(`https://api.modrinth.com/v2/${href}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
	});
	return await response.json();
}
