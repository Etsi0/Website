import { SvgList } from '@/components/SVGs';

type TSkillCardJson = {
	SVG: keyof typeof SvgList;
	title: string;
	description: string;
};
export const SkillCardJson: TSkillCardJson[] = [
	{
		SVG: 'HTML',
		title: 'HTML',
		description:
			'Expertise in creating and structuring web pages using semantic HTML, ensuring accessibility and SEO optimization.',
	},
	{
		SVG: 'CSS',
		title: 'CSS',
		description:
			'Advanced knowledge of CSS for styling and layout, including Flexbox, Grid, and responsive design principles to create visually appealing web pages.',
	},
	{
		SVG: 'TypeScript',
		title: 'TypeScript',
		description:
			'Proficiency in TypeScript for building robust and maintainable codebases, with a strong understanding of type safety and advanced JavaScript features.',
	},
	{
		SVG: 'Devices',
		title: 'Mobile First',
		description:
			'Mobile-first design workflow, ensuring that web applications are optimized for performance and usability on all devices.',
	},
	{
		SVG: 'Figma',
		title: 'Design',
		description:
			'Proficient in design tools like Figma and AdobeXD for creating interactive prototypes and high-fidelity UI designs.',
	},
	{
		SVG: 'TailwindCSS',
		title: 'CSS Frameworks',
		description:
			'Skilled in utilizing CSS frameworks such as Tailwind CSS and Bootstrap to streamline development and maintain consistent design patterns.',
	},
	{
		SVG: 'React',
		title: 'Frontend Frameworks',
		description:
			'Extensive experience with frontend frameworks, particularly React, for building dynamic, component-based web applications.',
	},
	{
		SVG: 'GitHub',
		title: 'Version Control',
		description:
			'Familiar with version control systems like Git and SVN for effective collaboration and code management.',
	},
	{
		SVG: 'Framer',
		title: 'Animations',
		description:
			'Expertise in creating smooth, visually appealing animations and transitions using Framer Motion and CSS animations to enhance user experience.',
	},
	{
		SVG: 'UX',
		title: 'UI/UX Design',
		description:
			'Knowledgeable in UI/UX design principles, focusing on creating intuitive and user-friendly interfaces that provide a seamless user experience.',
	},
];
