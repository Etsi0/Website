import { createCn, validators } from 'cn/config';

export const cn = createCn({
	extend: {
		classGroups: {
			'corner-shape': [
				{
					'corner-shape': [validators.isNumber, validators.isArbitraryValue]
				},
			],
		},
		conflictingClassGroups: {
			'corner-shape': ['rounded'],
			'rounded': ['corner-shape'],
		},
	},
});
