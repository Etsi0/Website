import { FC, ReactNode, SVGProps } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/cn';
import CodeBlock from '@/svg/materialDesignIcons/rounded/code_blocks.svg';
import Public from '@/svg/materialDesignIcons/rounded/public.svg';
import { LinkButton } from '@/components/ui/link';

import HTML from '@/svg/vscode-icons/html--custom.svg';
import Tailwind from '@/svg/vscode-icons/tailwind.svg';
import Vite from '@/svg/vscode-icons/vite--custom.svg';
import ReactIcon from '@/svg/vscode-icons/reactjs.svg';
import Next from '@/svg/vscode-icons/next.svg';
import TS from '@/svg/vscode-icons/typescript.svg';
import ArrowOutward from '@/svg/materialDesignIcons/rounded/arrow_outward.svg';

import Icon from '@/../public/img/production/icon.png';
import Phadonia from '@/svg/phadonia.svg';
import CvMaker from '@/svg/cv-maker.svg';
import { Card } from '@/components/ui/card';

const clazz = 'grow shrink-0 basis-[calc(50%-0.25rem)] text-nowrap text-center px-[1.5em] py-[0.75em] corner-shape-[1.3125rem] border';
const bgIconClass = 'object-contain aspect-video scale-500 filter-[url(#light-figma-fx)] dark:filter-[url(#dark-figma-fx)]';
const iconClass = 'object-contain aspect-square scale-62';

type TCards = {
	src: StaticImageData | FC<SVGProps<SVGElement>>;
	title: string;
	text: string;
	badges: {
		svg: FC<SVGProps<SVGElement>>;
		text: string
	}[];
	live?: string;
	source?: string
};

type TBadge = { children: ReactNode, className?: string } & ComponentPropsWithoutRef<'div'>;
function Badge({ children, className, ...props }: TBadge) {
	return (
		<div
			className={cn('flex items-center gap-1 text-text-700 text-sm bg-body-200 px-3 py-1 border border-body-300 corner-shape-9999', className)}
			{...props}
		>
			{ children }
		</div>
	);
}

function Cards({ src, title, text, badges, live = '', source = '' }: TCards) {
	const Icon = src;
	const badge = badges[0];
	const anchorName = `--card-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}` as const;

	return (
		<Card className='@container grid gap-4'>
			<div className='corner-shape-[2.5rem] overflow-clip grid place-items-center border border-body-200 *:col-1 *:row-1'>
				{typeof Icon === 'function' && (
					<>
						<Icon className={cn(bgIconClass, '*:fill-text-900')} />
						<Icon className={cn(iconClass, '*:fill-text-900')} />
					</>
				)}
				{(typeof Icon === 'object' && Icon !== null && 'src' in Icon && 'height' in Icon && 'width' in Icon) && (
					<>
						<Image className={bgIconClass} width={Icon.width} height={Icon.height} src={Icon} alt='asd' />
						<Image className={iconClass} width={Icon.width} height={Icon.height} src={Icon} alt='asd' />
					</>
				)}
			</div>
			<div className='flex grow flex-col gap-3'>
				<div className='px-[calc(2.5rem*0.9)] grow space-y-2'>
					<h3 className='text-custom-2xl'>{title}</h3>
					<p>{text}</p>
					<div className='flex flex-wrap items-start gap-2 font-mono'>
						<Badge>
							{<badge.svg className='fill-text-700 size-[1em] *:fill-current!' />} {badge.text}
						</Badge>
						{badges.length > 1 && (
							<>
								<Badge tabIndex={0} className='peer px-[0.35rem]' style={{ anchorName }}>+{badges.length - 1}</Badge>
								<div
									popover=""
									className={cn(
										'invisible flex flex-wrap gap-2 bg-body-100 p-3 border border-body-200 corner-shape-[1.6875rem] mx-8 mb-3 shadow-xl opacity-0 [transition:opacity_150ms_ease,visibility_0ms_150ms]',
										'[.peer:hover+&]:visible [.peer:hover+&]:opacity-100 [.peer:hover+&]:[transition:opacity_150ms_ease,visibility_0ms]',
										'[.peer:focus-visible+&]:visible [.peer:focus-visible+&]:opacity-100 [.peer:focus-visible+&]:[transition:opacity_150ms_ease,visibility_0ms]',
									)}
									style={{ positionAnchor: anchorName, positionArea: "top" }}
								>
									{badges.slice(1).sort((a, b) => (a.text || '').localeCompare(b.text || '')).map((badge, index) => (
										<Badge key={index} className='flex-[0_0_0]'>
											{<badge.svg className='fill-text-800 size-[1em] *:fill-current!' />} {badge.text}
										</Badge>
									))}
								</div>
							</>
						)}
					</div>
				</div>
				<div className='flex flex-wrap gap-2 leading-none px-[calc(2.5rem-21px)] pb-[calc(2.5rem-21px)]'>
					<LinkButton
						href={live}
						className={cn(clazz, 'text-primary-50 bg-primary-500 border-primary-400 dark:bg-primary-600 dark:border-primary-700')}
						disabled={!live}
						isButton
					>
						<Public className='inline-block align-center fill-primary-50 size-[1em]' /> Live
					</LinkButton>
					<LinkButton
						href={source}
						className={cn(clazz, 'text-text-800 bg-body-200 border-body-300')}
						disabled={!source}
						isButton
					>
						<CodeBlock className='inline-block align-center fill-text-800 size-[1em]' /> Source
					</LinkButton>
				</div>
			</div>
		</Card>
	);
}

export function Portfolio() {
	return (
		<>
			<svg className='absolute' width="0" height="0" aria-hidden>
				{/* Dark mode: darken → blur → contrast */}
				<filter
					id="dark-figma-fx"
					colorInterpolationFilters="sRGB"
					x="-50%"
					y="-50%"
					width="200%"
					height="200%"
				>
					<feComponentTransfer result="gamma">
						<feFuncR type="gamma" amplitude="0.5" exponent="1" offset="0"/>
						<feFuncG type="gamma" amplitude="0.5" exponent="1" offset="0"/>
						<feFuncB type="gamma" amplitude="0.5" exponent="1" offset="0"/>
					</feComponentTransfer>
					<feComponentTransfer in="gamma" result="linear">
						<feFuncR type="linear" slope="2" intercept="-0.5"/>
						<feFuncG type="linear" slope="2" intercept="-0.5"/>
						<feFuncB type="linear" slope="2" intercept="-0.5"/>
					</feComponentTransfer>
					<feGaussianBlur in="linear" stdDeviation="6.25"/>
				</filter>
				{/* Light mode: soft blur, no heavy darkening — subtle tint behind icon */}
				<filter
					id="light-figma-fx"
					colorInterpolationFilters="sRGB"
					x="-50%"
					y="-50%"
					width="200%"
					height="200%"
				>
					<feComponentTransfer result="gamma">
						<feFuncR type="gamma" amplitude="1.5" exponent="1" offset="0"/>
						<feFuncG type="gamma" amplitude="1.5" exponent="1" offset="0"/>
						<feFuncB type="gamma" amplitude="1.5" exponent="1" offset="0"/>
					</feComponentTransfer>
					<feComponentTransfer in="gamma" result="linear">
						<feFuncR type="linear" slope="0.5" intercept="0.5"/>
						<feFuncG type="linear" slope="0.5" intercept="0.5"/>
						<feFuncB type="linear" slope="0.5" intercept="0.5"/>
					</feComponentTransfer>
					<feGaussianBlur stdDeviation="6.25" in="linear"/>
				</filter>
			</svg>
			<section id='portfolio' className='grid gap-8 py-16 mx-auto'>
				<div className='flex justify-between items-center'>
					<h2>Highlighted <span className='italic text-text-800'>Projects</span></h2>
					<LinkButton
						href='#'
						className='text-text-800 text-custom-lg rounded-xs tracking-wider'
						isButton
					>
						View All <ArrowOutward className="inline-block fill-current" />
					</LinkButton>
				</div>
				<div className='[--max-width:21.24rem] grid gap-5 grid-cols-[minmax(0,var(--max-width))] justify-center w-full lg:grid-cols-[repeat(3,minmax(0,var(--max-width)))]'>
					<Cards
						src={Phadonia}
						title='Phadonia Search'
						badges={[
							{ svg: TS, text: 'Typescript' },
							{ svg: Vite, text: 'Vite' },
							{ svg: Tailwind, text: 'Tailwind' },
							{ svg: HTML, text: 'HTML' },
						]}
						text="Fast search router that supports all of DuckDuckGo's bangs without impacting speed."
						live='https://search.phadonia.com'
						source='https://github.com/Etsi0/search'
					/>
					<Cards
						src={CvMaker}
						title='CV-Maker'
						badges={[
							{ svg: Next, text: 'Next.js' },
							{ svg: ReactIcon, text: 'React' },
							{ svg: TS, text: 'Typescript' },
							{ svg: Tailwind, text: 'Tailwind' },
						]}
						text='Edit, preview, and export. All running locally; your data never leaves your device.'
						live='https://cv-maker.phadonia.com'
						source='https://github.com/Etsi0/cv-maker'
					/>
					<Cards
						src={Icon}
						title='Class Collapse'
						badges={[{ svg: TS, text: 'Typescript' }]}
						text='A VSCode extension with 8K+ downloads that allows you to collapse section of code.'
						live='https://marketplace.visualstudio.com/items?itemName=Etsi0.class-collapse'
						source='https://github.com/Etsi0/class-collapse'
					/>
				</div>
			</section>
		</>
	);
}
