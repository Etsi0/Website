import { z } from 'zod';

export const countriesDataSchema = z.tuple([
	z.object({}),
	z.array(
		z.object({
			iso2Code: z.string(),
			name: z.string(),
		})
	),
]);

export async function GetCountryCodes() {
	const response = await fetch('http://api.worldbank.org/v2/country?format=json&per_page=999', {
		next: {
			revalidate: 3600,
		},
	});

	try {
		const countriesData: unknown = await response.json();
		const parsedCountriesData = countriesDataSchema.safeParse(countriesData);
		if (!parsedCountriesData.success) {
			return false;
		}
		const { data } = parsedCountriesData;
		const sortedData = data[1].sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
		return sortedData;
	} catch {
		return false;
	}
}
