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
