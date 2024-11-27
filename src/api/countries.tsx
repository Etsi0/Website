import { z } from 'zod';

export const countriesDataSchema = z.array(
	z.object({
		name: z.object({
			common: z.string(),
		}),
		cca2: z.string(),
		flag: z.string(),
	})
);

export async function GetCountryCodes() {
	const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca2', {
		headers: {
			'Content-Type': 'application/json',
		},
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
		const sortedData = data.sort((a, b) => {
			if (a.name.common < b.name.common) return -1;
			if (a.name.common > b.name.common) return 1;
			return 0;
		});
		return sortedData;
	} catch {
		return false;
	}
}
