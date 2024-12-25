import { z } from 'zod';
import { projectSchema } from '@/schema/minecraft/main';

export type TState = 'required' | 'optional' | 'unsupported';

type TSide = {
	[x in TState]: string[];
} & {
	checked: TState[];
};

export type TFilter = {
	client: TSide;
	server: TSide;
	total: number;
};

export type TProject = z.infer<typeof projectSchema>[number];
