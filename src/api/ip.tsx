import { z } from 'zod';

export const ipInfoSchema = z.object({
	query: z.string(),
	status: z.string(),
	country: z.string(),
	countryCode: z.string(),
	region: z.string(),
	regionName: z.string(),
	city: z.string(),
	zip: z.string(),
	lat: z.number(),
	lon: z.number(),
	timezone: z.string(),
	isp: z.string(),
	org: z.string(),
	as: z.string(),
});

export async function GetIPInfo() {
	const response = await fetch('http://ip-api.com/json/');

	try {
		const data = await response.json();
		const parsedData = ipInfoSchema.safeParse(data);
		if (!parsedData.success) {
			return false;
		}

		return parsedData.data;
	} catch {
		return false;
	}
}
