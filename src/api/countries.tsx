export async function GetCountryCodes() {
	const response = await fetch('http://api.worldbank.org/v2/country?format=json&per_page=999', {
		next: {
			revalidate: 3600,
		},
	});

	try {
		const result = await response.json();
		if (result.status) {
			return false;
		}
		result.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
		return result;
	} catch {
		return false;
	}
}
