import { CodePen, Discord, Extension, GitHub, LinkedIn } from '@/components/SVGs';

export default function App() {
	return [
		{
			img: LinkedIn,
			name: 'Linkedin',
			path: 'https://www.linkedin.com/in/albinkarlsson2003/',
		},
		{
			img: GitHub,
			name: 'GitHub',
			path: 'https://github.com/Etsi0',
		},
		{
			img: Extension,
			name: 'Extension',
			path: 'https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse',
		},
		{
			img: Discord,
			name: 'Discord',
			path: 'https://discordapp.com/users/850433812089012335',
		},
		{
			img: CodePen,
			name: 'CodePen',
			path: 'https://codepen.io/albinkarlsson',
		},
	];
}