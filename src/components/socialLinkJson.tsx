import Linkedin from '@/SVGs/company logos/linkedin-alt';
import Discord from '@/SVGs/company logos/discord';
import GitHub from '@/SVGs/company logos/github-alt';
import CodePen from '@/SVGs/company logos/codepen';
import Dribbble from '@/SVGs/company logos/dribbble';

//class='fill-main transition-colors group-hover:fill-main-lighter group-focus-visible:fill-main-lighter'

export default function App() {
	return [
		{
			img: Linkedin,
			name: 'Linkedin',
			path: 'https://www.linkedin.com/in/albinkarlsson2003/',
		},
		{
			img: Discord,
			name: 'Discord',
			path: 'https://discordapp.com/users/850433812089012335',
		},
		{
			img: GitHub,
			name: 'GitHub',
			path: 'https://github.com/Albin0825',
		},
		{
			img: CodePen,
			name: 'CodePen',
			path: 'https://codepen.io/albinkarlsson',
		},
		{
			img: Dribbble,
			name: 'Dribbble',
			path: 'https://dribbble.com/Etsi0',
		},
	];
}
