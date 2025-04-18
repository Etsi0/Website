import { FC, SVGProps } from 'react';
import HTML from '@/svg/vscode-icons/html--custom.svg';
import CSS from '@/svg/vscode-icons/css--custom.svg';
import TypeScript from '@/svg/vscode-icons/typescript.svg';
import Responsive from '@/svg/responsive.svg';
import Figma from '@/svg/figma--solid.svg';
import TailwindCSS from '@/svg/vscode-icons/tailwind.svg';
import React from '@/svg/vscode-icons/reactjs.svg';
import GitHub from '@/svg/gitHub.svg';
import GSAP from '@/svg/gsap.svg';
import UX from '@/svg/ux.svg';

type TSkillCardJson = {
	SVG: FC<SVGProps<SVGElement>>;
	title: string;
	description: string;
};
export const SkillCardJson: TSkillCardJson[] = [
	{
		SVG: HTML,
		title: 'HTML',
		description: 'Expertise in creating and structuring web pages using semantic HTML, ensuring accessibility and SEO optimization.',
	},
	{
		SVG: CSS,
		title: 'CSS',
		description: 'Advanced knowledge of CSS for styling and layout, including Flexbox, Grid, and responsive design principles to create visually appealing web pages.',
	},
	{
		SVG: TypeScript,
		title: 'TypeScript',
		description: 'Proficiency in TypeScript for building robust and maintainable codebases, with a strong understanding of type safety and advanced JavaScript features.',
	},
	{
		SVG: Responsive,
		title: 'Mobile First',
		description: 'Mobile-first design workflow, ensuring that web applications are optimized for performance and usability on all devices.',
	},
	{
		SVG: Figma,
		title: 'Design',
		description: 'Proficient in design tools like Figma and AdobeXD for creating interactive prototypes and high-fidelity UI designs.',
	},
	{
		SVG: TailwindCSS,
		title: 'CSS Frameworks',
		description: 'Skilled in utilizing CSS frameworks such as Tailwind CSS and Bootstrap to streamline development and maintain consistent design patterns.',
	},
	{
		SVG: React,
		title: 'Frontend Frameworks',
		description: 'Extensive experience with frontend frameworks, particularly React, for building dynamic, component-based web applications.',
	},
	{
		SVG: GitHub,
		title: 'Version Control',
		description: 'Familiar with version control systems like Git and SVN for effective collaboration and code management.',
	},
	{
		SVG: GSAP,
		title: 'Animations',
		description: 'Expertise in creating smooth, visually appealing animations and transitions using Framer Motion, GSAP and CSS animations to enhance user experience.',
	},
	{
		SVG: UX,
		title: 'UI/UX Design',
		description: 'Knowledgeable in UI/UX design principles, focusing on creating intuitive and user-friendly interfaces that provide a seamless user experience.',
	},
];
