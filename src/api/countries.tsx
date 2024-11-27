'use server';
import { countriesDataSchema } from '@/types/spotify/recommendations/main';

export async function GetCountryCodes() {
	const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,cca2', {
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
