import { FC, SVGProps } from 'react';

type SVG = FC<SVGProps<SVGElement>>;

export type TDialogState = {
	isOpen: boolean;
	title: string;
	description: string;
	SVG: SVG | null;
};

export type TSkillCard = {
	SVG: SVG;
	title: string;
	description: string;
	onOpen: (title: string, description: string, SVG: SVG) => void;
};

export type TSkillCardDialog = {
	SVG: SVG;
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
};
