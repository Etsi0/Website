import {
	CSS,
	Cancel,
	CodePen,
	Devices,
	Discord,
	Download,
	Dribbble,
	Figma,
	Framer,
	GitHub,
	HTML,
	Hamburger,
	LinkedIn,
	Moon,
	Person,
	React,
	Sun,
	TailwindCSS,
	UX,
} from '@/components/SVGs';
import WalkingOutside from '@/../public/img/raw SVGs/undraw_walking_outside_re_56xo.svg';

export default function App() {
	function ATag(href: string) {
		return (
			<a
				className='
					justify-self-start
					bg-primary-500
					text-input
					py-3
					px-9
					rounded-md
					hover:bg-primary-50
					hover:text-primary-500
					focus-visible:bg-primary-50
					focus-visible:text-primary-500
				'
				href={href}
				rel='noopener'
				target='_blank'
			>
				Link
			</a>
		);
	}
	function Author(name: string) {
		return (
			<h4
				className='
					text-text-400
				'
			>
				<span
					className='
						text-base
						text-text-300
					'
				>
					by
				</span>{' '}
				{name}
			</h4>
		);
	}
	return [
		{
			SVG: React,
			title: 'React Icon',
			description: (
				<>
					{Author('Albin Karlsson')}
					<p>2024-01-19</p>
				</>
			),
		},
		{
			SVG: CSS,
			title: 'CSS Icon',
			description: (
				<>
					{Author('Albin Karlsson')}
					<p>2024-01-19</p> {/* https://iconscout.com/free-icon/css-131 */}
				</>
			),
		},
		{
			SVG: Framer,
			title: 'Free Framer Logo Icon in Line Style',
			description: (
				<>
					{Author('Phosphor Icons')}
					<p>2024-01-19</p>
					{ATag('https://iconscout.com/free-icon/framer-logo-3601898')}
				</>
			),
		},
		{
			SVG: UX,
			title: 'UX Icon',
			description: (
				<>
					{Author('Albin Karlsson')}
					<p>2024-01-19</p> {/* https://iconscout.com/free-icon/ux-10541844 */}
				</>
			),
		},
		{
			SVG: TailwindCSS,
			title: 'Free Tailwind Css Logo Icon in Glyph Style',
			description: (
				<>
					{Author('Termicons')}
					<p>2024-01-19</p>
					{ATag('https://iconscout.com/free-icon/tailwind-css-5285308')}
				</>
			),
		},
		{
			SVG: Devices,
			title: 'Free Devices Icon in Line Style',
			description: (
				<>
					{Author('Omar Safaa')}
					<p>2024-01-19</p>
					{ATag('https://iconscout.com/free-icon/devices-65')}
				</>
			),
		},
		{
			SVG: HTML,
			title: 'Free Html Icon in Glyph Style',
			description: (
				<>
					{Author('Font Awesome')}
					<p>2024-01-19</p>
					{ATag(
						'https://iconscout.com/free-icon/html-programming-language-css-editing-style'
					)}
				</>
			),
		},
		{
			SVG: Figma,
			title: 'Free Figma Logo Icon in Line Style',
			description: (
				<>
					{Author('Nicky Lim yean fen')}
					<p>2024-01-02</p>
					{ATag('https://iconscout.com/free-icon/figma-3766578')}
				</>
			),
		},
		{
			SVG: Download,
			title: 'Free Download Icon in Line Style',
			description: (
				<>
					{Author('Unicons Font')}
					<p>2023-12-19</p>
					{ATag('https://iconscout.com/free-icon/download-1438181')}
				</>
			),
		},
		{
			SVG: Cancel,
			title: 'Free Cancel Icon in Flat Style',
			description: (
				<>
					{Author('Twitter Emoji')}
					<p>2023-12-19</p>
					{ATag('https://iconscout.com/free-icon/cancel-multiplication-multiply-x')}
				</>
			),
		},
		{
			SVG: Moon,
			title: 'Free Moon Icon in Flat Style',
			description: (
				<>
					{Author('maninderkaur')}
					<p>2023-10-24</p>
					{ATag('https://iconscout.com/free-icon/moon-9282393')}
				</>
			),
		},
		{
			SVG: Sun,
			title: 'Free Sun Icon in Flat Style',
			description: (
				<>
					{Author('Twitter Emoji')}
					<p>2023-10-24</p>
					{ATag('https://iconscout.com/free-icon/sun-bright-rays-sunny-weather')}
				</>
			),
		},
		{
			SVG: CodePen,
			title: 'Free Codepen Logo Icon in Flat Style',
			description: (
				<>
					{Author('Alexis Doreau')}
					<p>2023-09-13</p>
					{ATag('https://iconscout.com/free-icon/codepen-2')}
				</>
			),
		},
		{
			SVG: Discord,
			title: 'Free Discord Logo Icon in Flat Style',
			description: (
				<>
					{Author('Enamo Studios')}
					<p>2023-09-13</p>
					{ATag('https://iconscout.com/free-icon/discord-4062811')}
				</>
			),
		},
		{
			SVG: Dribbble,
			title: 'Free Dribbble Logo Icon in Line Style',
			description: (
				<>
					{Author('Unicons Font')}
					<p>2023-09-13</p>
					{ATag('https://iconscout.com/free-icon/dribbble-1439854')}
				</>
			),
		},
		{
			SVG: GitHub,
			title: 'Free Github Logo Icon in Line Style',
			description: (
				<>
					{Author('Unicons Font')}
					<p>2023-09-13</p>
					{ATag('https://iconscout.com/free-icon/github-1521488')}
				</>
			),
		},
		{
			SVG: LinkedIn,
			title: 'Free Linkedin Logo Icon in Line Style',
			description: (
				<>
					{Author('Unicons Font')}
					<p>2023-09-13</p>
					{ATag('https://iconscout.com/free-icon/linkedin-1521491')}
				</>
			),
		},
		{
			SVG: Person,
			title: 'Walking outside',
			description: (
				<>
					{Author('undraw.co')}
					<p>2023-09-02</p>
					{ATag('https://undraw.co/search')}
				</>
			),
		},
		{
			SVG: Hamburger,
			title: 'Hamburger',
			description: (
				<>
					{Author('Mikael Ainalem')}
					<p>2023-08-28</p>
					{ATag('https://codepen.io/ainalem/pen/wvKOEMV')}
				</>
			),
		},
	];
}
