import { z } from 'zod';

export type TNameLink = {
	name: string;
	link: string;
};

export type TSongs = {
	image: {
		height: number;
		url: string;
		width: number;
	};
	previewUrl: string | null;
	track: TNameLink;
	artists: TNameLink[];
	album: TNameLink;
}[];

export const countriesDataSchema = z.array(
	z.object({
		name: z.object({
			common: z.string(),
		}),
		cca2: z.string(),
		flag: z.string(),
	})
);
