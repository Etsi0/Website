import { SvgList } from './SVGs';

type TCreditJson = {
	SVG: keyof typeof SvgList;
	title: string;
	description: string;
};

export const CreditJson: TCreditJson[] = [
	{
		SVG: 'React',
		title: 'React Icon',
		description: 'Albin Karlsson | 2024-01-19',
	},
	{
		SVG: 'CSS',
		title: 'CSS Icon',
		description: 'Albin Karlsson | 2024-01-19' /* https://iconscout.com/free-icon/css-131 */,
	},
	{
		SVG: 'Framer',
		title: 'Free Framer Logo Icon in Line Style',
		description:
			'Phosphor Icons | 2024-01-19 | https://iconscout.com/free-icon/framer-logo-3601898',
	},
	{
		SVG: 'UX',
		title: 'UX Icon',
		description:
			'Albin Karlsson | 2024-01-19' /* https://iconscout.com/free-icon/ux-10541844 */,
	},
	{
		SVG: 'TailwindCSS',
		title: 'Free Tailwind Css Logo Icon in Glyph Style',
		description:
			'Termicons | 2024-01-19 | https://iconscout.com/free-icon/tailwind-css-5285308',
	},
	{
		SVG: 'Devices',
		title: 'Free Devices Icon in Line Style',
		description: 'Omar Safaa | 2024-01-19 | https://iconscout.com/free-icon/devices-65',
	},
	{
		SVG: 'HTML',
		title: 'Free Html Icon in Glyph Style',
		description:
			'Font Awesome | 2024-01-19 | https://iconscout.com/free-icon/html-programming-language-css-editing-style',
	},
	{
		SVG: 'Figma',
		title: 'Free Figma Logo Icon in Line Style',
		description:
			'Nicky Lim yean fen | 2024-01-02 | https://iconscout.com/free-icon/figma-3766578',
	},
	{
		SVG: 'Download',
		title: 'Free Download Icon in Line Style',
		description: 'Unicons Font | 2023-12-19 | https://iconscout.com/free-icon/download-1438181',
	},
	{
		SVG: 'Cancel',
		title: 'Free Cancel Icon in Flat Style',
		description:
			'Twitter Emoji | 2023-12-19 | https://iconscout.com/free-icon/cancel-multiplication-multiply-x',
	},
	{
		SVG: 'Moon',
		title: 'Free Moon Icon in Flat Style',
		description: 'maninderkaur | 2023-10-24 | https://iconscout.com/free-icon/moon-9282393',
	},
	{
		SVG: 'Sun',
		title: 'Free Sun Icon in Flat Style',
		description:
			'Twitter Emoji | 2023-10-24 | https://iconscout.com/free-icon/sun-bright-rays-sunny-weather',
	},
	{
		SVG: 'CodePen',
		title: 'Free Codepen Logo Icon in Flat Style',
		description: 'Alexis Doreau | 2023-09-13 | https://iconscout.com/free-icon/codepen-2',
	},
	{
		SVG: 'Discord',
		title: 'Free Discord Logo Icon in Flat Style',
		description: 'Enamo Studios | 2023-09-13 | https://iconscout.com/free-icon/discord-4062811',
	},
	{
		SVG: 'Dribbble',
		title: 'Free Dribbble Logo Icon in Line Style',
		description: 'Unicons Font | 2023-09-13 | https://iconscout.com/free-icon/dribbble-1439854',
	},
	{
		SVG: 'GitHub',
		title: 'Free Github Logo Icon in Line Style',
		description: 'Unicons Font | 2023-09-13 | https://iconscout.com/free-icon/github-1521488',
	},
	{
		SVG: 'LinkedIn',
		title: 'Free Linkedin Logo Icon in Line Style',
		description: 'Unicons Font | 2023-09-13 | https://iconscout.com/free-icon/linkedin-1521491',
	},
	{
		SVG: 'Person',
		title: 'Walking outside',
		description: 'undraw.co | 2023-09-02 | https://undraw.co/search',
	},
	{
		SVG: 'Hamburger',
		title: 'Hamburger',
		description: 'Mikael Ainalem | 2023-08-28 | https://codepen.io/ainalem/pen/wvKOEMV',
	},
];
