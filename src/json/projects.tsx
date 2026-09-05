import type { TProject, TProjectBadge } from '@/components/ui/projectCard';

import HTML from '@/svg/vscode-icons/html--custom.svg';
import CSS from '@/svg/vscode-icons/css--custom.svg';
import TS from '@/svg/vscode-icons/typescript.svg';
import Tailwind from '@/svg/vscode-icons/tailwind.svg';
import Vite from '@/svg/vscode-icons/vite--custom.svg';
import ReactIcon from '@/svg/vscode-icons/reactjs.svg';
import Preact from '@/svg/vscode-icons/preact.svg';
import Next from '@/svg/vscode-icons/next.svg';
import VSCode from '@/svg/vscode-icons/vscode.svg';
import Firefox from '@/svg/firefox.svg';

import Phadonia from '@/svg/phadonia.svg';
import CvMaker from '@/svg/cv-maker.svg';
import GridOn from '@/svg/materialDesignIcons/rounded/grid_on.svg';
import Grid3x3 from '@/svg/materialDesignIcons/rounded/grid_3x3.svg';

import ClassCollapse from '@/../public/img/production/icon.png';
import SleepyTabs from '@/../public/img/production/projects/sleepy-tabs.png';
import ForgetMe from '@/../public/img/production/projects/forget-me.png';

export const badges = {
	html: { svg: HTML, text: 'HTML' },
	css: { svg: CSS, text: 'CSS' },
	ts: { svg: TS, text: 'Typescript' },
	tailwind: { svg: Tailwind, text: 'Tailwind' },
	vite: { svg: Vite, text: 'Vite' },
	react: { svg: ReactIcon, text: 'React' },
	preact: { svg: Preact, text: 'Preact' },
	next: { svg: Next, text: 'Next.js' },
	vscode: { svg: VSCode, text: 'VSCode' },
	firefox: { svg: Firefox, text: 'Firefox' },
} satisfies Record<string, TProjectBadge>;

export const projects: TProject[] = [
	{
		src: Phadonia,
		title: 'Phadonia Search',
		text: "Fast search router that supports all of DuckDuckGo's bangs without impacting speed.",
		badges: [badges.ts, badges.vite, badges.tailwind, badges.html],
		live: 'https://search.phadonia.com',
		source: 'https://github.com/Etsi0/search',
		highlighted: true,
	},
	{
		src: CvMaker,
		title: 'CV-Maker',
		text: 'Edit, preview, and export. All running locally; your data never leaves your device.',
		badges: [badges.next, badges.react, badges.ts, badges.tailwind],
		live: 'https://cv-maker.phadonia.com',
		source: 'https://github.com/Etsi0/cv-maker',
		highlighted: true,
	},
	{
		src: ClassCollapse,
		title: 'Class Collapse',
		text: 'A VSCode extension with 8K+ downloads that allows you to collapse section of code.',
		badges: [badges.ts, badges.vscode],
		live: 'https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse',
		source: 'https://github.com/Etsi0/class-collapse',
		highlighted: true,
	},
	{
		src: Phadonia,
		title: 'Phadonia',
		text: 'The site you are looking at right now. My personal corner of the internet where I share what I build.',
		badges: [badges.next, badges.react, badges.ts, badges.tailwind],
		live: 'https://www.phadonia.com',
		source: 'https://github.com/Etsi0/Website',
	},
	{
		src: SleepyTabs,
		title: 'Sleepy Tabs',
		text: 'Browser extension that automatically unloads inactive tabs after a set amount of time to free up memory.',
		badges: [badges.firefox, badges.preact, badges.ts, badges.vite, badges.tailwind],
		live: 'https://addons.mozilla.org/en-US/firefox/addon/sleepy-tab/',
		source: 'https://github.com/Etsi0/browser-extensions/tree/main/Sleepy-tabs',
	},
	{
		src: ForgetMe,
		title: 'ForgetMe',
		text: 'Browser extension that automatically removes browsing history based on your own filters.',
		badges: [badges.firefox, badges.preact, badges.ts, badges.vite, badges.tailwind],
		live: 'https://addons.mozilla.org/en-CA/firefox/addon/forget-me/',
		source: 'https://github.com/Etsi0/browser-extensions/tree/main/forget-me',
	},
	{
		src: GridOn,
		title: 'Nonogram',
		text: 'Logic puzzle game drawn on a canvas. Fill in the grid using the numerical clues to reveal the hidden pattern.',
		badges: [badges.ts, badges.vite, badges.html, badges.css],
		live: 'https://nonogram.phadonia.com',
		source: 'https://github.com/Etsi0/nonogram',
	},
	{
		src: Grid3x3,
		title: 'Infinity Tic Tac Toe',
		text: 'My CS50x final project. Tic Tac Toe for two or more players on a board of any size, with a built-in AI opponent.',
		badges: [badges.ts, badges.html, badges.css],
		live: 'https://etsi0.github.io/Infinity-tic-tac-toe/',
		source: 'https://github.com/Etsi0/Infinity-tic-tac-toe',
	},
];

export const highlightedProjects = projects.filter((project) => project.highlighted);
