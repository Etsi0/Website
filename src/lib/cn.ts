import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<'corner-shape'>({
	extend: {
		classGroups: {
			'corner-shape': [
				{
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					'corner-shape': [(_: string) => true],
				},
			],
		},
		conflictingClassGroups: {
			'corner-shape': ['rounded'],
			'rounded': ['corner-shape'],
		},
	},
});

export function cn(...input: ClassValue[]) {
	return twMerge(clsx(input));
}
