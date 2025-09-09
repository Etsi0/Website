import { FC, SVGProps } from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/util';
import CodeBlock from '@/svg/materialDesignIcons/code_blocks.svg';
import Public from '@/svg/materialDesignIcons/public.svg';
import { LinkButton } from '@/components/ui/link';
import HTML from '@/svg/vscode-icons/html--custom.svg';
import CSS from '@/svg/vscode-icons/css--custom.svg';
import JS from '@/svg/vscode-icons/js.svg';
import Tailwind from '@/svg/vscode-icons/tailwind.svg';
import Vite from '@/svg/vscode-icons/vite--custom.svg';
import ReactIcon from '@/svg/vscode-icons/reactjs.svg';
import Next from '@/svg/vscode-icons/next.svg';
import TS from '@/svg/vscode-icons/typescript.svg';
import SQL from '@/svg/vscode-icons/sql.svg';
import Lock from '@/svg/materialDesignIcons/lock.svg';
import Icon from '@/../public/img/production/icon.png';
import Phadonia from '@/../public/img/WIP/svgomg.net/new phadonia logo (phadon).svg?url';
import ForgetMe from '@/../public/img/forgetMe.png';
import MaxPA from '@/../public/img/production/companies/MaxPA.svg?url';

const classes = 'flex items-center justify-center gap-1 rounded-lg p-4';
type TCards = { img: StaticImageData; title: string; badges: { svg?: FC<SVGProps<SVGElement>>; text?: string }[]; text: string; live?: string; source?: string };

function Cards({ img, title, badges, text, live = '', source = '' }: TCards) {
	return (
		<div className='border-body-200 bg-body-50 dark:border-body-300 dark:bg-body-200 flex flex-col overflow-hidden rounded-xl border'>
			<div className='dark:border-body-300 border-body-200 grid border-b *:col-[1_/_span_1] *:row-[1_/_span_1] *:aspect-16/10'>
				<Image className={`w-full object-cover blur-2xl brightness-50 [clip-path:polygon(0_0,100%0,100%100%,0_100%)]`} width={img.width} height={img.height} src={img} alt='asd' />
				<Image className='relative z-10 w-full scale-90 object-contain' width={img.width} height={img.height} src={img} alt='asd' />
			</div>
			<div className='flex grow flex-col gap-3 p-4'>
				<h3>{title}</h3>
				<p>{text}</p>
				<div className='flex grow flex-wrap items-start gap-2'>
					{badges.map((badge, index) => (
						<div key={index} className='bg-body-300 text-text-800 flex items-center gap-1 rounded-full px-3 py-1 text-sm'>
							{badge.svg && <badge.svg className='fill-text-800 size-[1em] *:fill-current!' />} {badge.text}
						</div>
					))}
				</div>
				<div className='grid grid-cols-2 gap-4'>
					<LinkButton
						href={live}
						className={cn(classes, 'bg-primary-500 text-primary-50 ring-offset-body-50 dark:ring-offset-body-200')}
						disabled={!live}
						isButton
					>
						<Public className='fill-primary-50 size-5' /> Live
					</LinkButton>
					<LinkButton
						href={source}
						className={cn(classes, 'bg-body-300 text-text-900 ring-offset-body-50 dark:text-primary-50 dark:ring-offset-body-200')}
						disabled={!source}
						isButton
					>
						<CodeBlock className='fill-text-900 dark:fill-primary-50 size-5' /> Source
					</LinkButton>
				</div>
			</div>
		</div>
	);
}

export function Portfolio() {
	return (
		<>
			<section id='portfolio' className='grid justify-items-center gap-8 py-8'>
				<div className='text-center'>
					<h2>Portfolio</h2>
					<p>Most recent work</p>
				</div>
				<div className='grid w-full gap-x-5 gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
					<Cards
						img={MaxPA}
						title='MaxPA'
						badges={[{ svg: Lock }]}
						text='Swedish payroll system'
						live='https://www.maxpa.se/'
					/>
					<Cards
						img={Phadonia}
						title='Phadonia'
						badges={[
							{ svg: Tailwind, text: 'Tailwind' },
							{ svg: TS, text: 'Typescript' },
							{ svg: ReactIcon, text: 'React' },
							{ svg: Next, text: 'Next.js' },
							{ svg: SQL, text: 'Postgresql' },
						]}
						text='The site you are on right now'
						live='/'
						source='https://github.com/Etsi0/Website'
					/>
					<Cards
						img={ForgetMe}
						title='ForgetMe'
						badges={[
							{ svg: HTML, text: 'HTML' },
							{ svg: Tailwind, text: 'Tailwind' },
							{ svg: JS, text: 'JavaScript' },
						]}
						text='ForgetMe automatically removes history based on user-defined filters.'
						live='https://addons.mozilla.org/en-CA/firefox/addon/forget-me/'
						source='https://github.com/Etsi0/ForgetMe'
					/>
					<Cards
						img={Phadonia}
						title='Phadonia Search'
						badges={[
							{ svg: HTML, text: 'HTML' },
							{ svg: Tailwind, text: 'Tailwind' },
							{ svg: TS, text: 'Typescript' },
							{ svg: Vite, text: 'Vite' },
						]}
						text="Fast search router that supports all of DuckDuckGo's bangs without impacting speed."
						live='https://search.phadonia.com'
						source='https://github.com/Etsi0/search'
					/>
					<Cards
						img={Phadonia}
						title='CV-Maker'
						badges={[
							{ svg: Tailwind, text: 'Tailwind' },
							{ svg: TS, text: 'Typescript' },
							{ svg: ReactIcon, text: 'React' },
							{ svg: Next, text: 'Next.js' },
						]}
						text='I got sick of paying for existing CV builders, so i made my own'
						live='https://cv-maker.phadonia.com'
						source='https://github.com/Etsi0/cv-maker'
					/>
					<Cards
						img={Icon}
						title='Class Collapse'
						badges={[{ svg: TS, text: 'Typescript' }]}
						text='A VSCode extension that allows you to collapse section of code. for example, classes'
						live='https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse'
						source='https://github.com/Etsi0/class-collapse'
					/>
					<Cards
						img={Icon}
						title='Infinity tic tac toe'
						badges={[
							{ svg: HTML, text: 'HTML' },
							{ svg: CSS, text: 'CSS' },
							{ svg: TS, text: 'Typescript' },
						]}
						text='An tic tac toe that never ends if both players plays perfectly'
						live='https://etsi0.github.io/Infinity-tic-tac-toe/'
						source='https://github.com/Etsi0/Infinity-tic-tac-toe'
					/>
					<Cards
						img={Icon}
						title='Dice Game'
						badges={[
							{ svg: HTML, text: 'HTML' },
							{ svg: CSS, text: 'CSS' },
							{ svg: JS, text: 'JavaScript' },
						]}
						text='An old game i made in school that won a competition'
						live='https://etsi0.github.io/DiceGame/'
						source='https://github.com/Etsi0/DiceGame'
					/>
				</div>
				<LinkButton
					href='#'
					className='bg-primary-500 text-primary-50 rounded-md px-[1.5em] py-[0.75em] text-lg'
					isButton
				>
					See all (Coming soon)
				</LinkButton>
			</section>
		</>
	);
}
