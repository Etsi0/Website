import type { ComponentPropsWithoutRef, FC, ReactNode, SVGProps } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { cn } from '@/lib/cn';
import CodeBlock from '@/svg/materialDesignIcons/rounded/code_blocks.svg';
import Public from '@/svg/materialDesignIcons/rounded/public.svg';
import { Card } from '@/components/ui/card';
import { LinkButton } from '@/components/ui/link';

const clazz = 'grow shrink-0 basis-[calc(50%-0.25rem)] text-nowrap text-center px-[1.5em] py-[0.75em] corner-shape-[1.3125rem]';
const bgIconClass = 'object-contain aspect-video scale-500 filter-[url(#light-figma-fx)] dark:filter-[url(#dark-figma-fx)]';
const iconClass = 'object-contain aspect-square scale-62';

export type TProjectBadge = {
	svg: FC<SVGProps<SVGElement>>;
	text: string;
};

export type TProject = {
	src: StaticImageData | FC<SVGProps<SVGElement>>;
	title: string;
	text: string;
	badges: TProjectBadge[];
	live?: string;
	source?: string;
	highlighted?: boolean;
};

type TBadge = { children: ReactNode, className?: string } & ComponentPropsWithoutRef<'div'>;
function Badge({ children, className, ...props }: TBadge) {
	return (
		<div
			className={cn('flex items-center gap-1 text-body-700 text-sm bg-[color-mix(in_oklch,var(--color-body-100),var(--color-body-50))] px-3 py-1 rounded-full dark:text-body-300 dark:bg-body-800 dark:border-body-700', className)}
			{...props}
		>
			{ children }
		</div>
	);
}

type TProjectCard = TProject & {
	heading?: 'h2' | 'h3';
};

export function ProjectCard({ src, title, text, badges, live = '', source = '', heading: Heading = 'h3' }: TProjectCard) {
	const Icon = src;
	const badge = badges[0];
	const anchorName = `--card-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}` as const;

	return (
		<Card className='@container grid gap-4'>
			<div className='corner-shape-[2.5rem] aspect-square overflow-clip grid place-items-center border border-body-50 dark:border-body-850 *:col-1 *:row-1'>
				{typeof Icon === 'function' && (
					<>
						<Icon className={cn(bgIconClass, 'w-full h-auto *:fill-body-950 dark:*:fill-body-50')} aria-hidden="true" />
						<Icon className={cn(iconClass, 'w-full h-auto *:fill-body-950 dark:*:fill-body-50')} aria-hidden="true" />
					</>
				)}
				{(typeof Icon === 'object' && Icon !== null && 'src' in Icon && 'height' in Icon && 'width' in Icon) && (
					<>
						<Image className={bgIconClass} width={Icon.width} height={Icon.height} src={Icon} alt='' aria-hidden="true" />
						<Image className={iconClass} width={Icon.width} height={Icon.height} src={Icon} alt="" aria-hidden="true" />
					</>
				)}
			</div>
			<div className='flex grow flex-col gap-3'>
				<div className='px-[calc(2.5rem*0.9)] grow space-y-2'>
					<Heading className='text-custom-2xl'>{title}</Heading>
					<p>{text}</p>
					<div className='flex flex-wrap items-start gap-2 font-mono'>
						<Badge>
							<badge.svg className='fill-body-700 dark:fill-body-300 size-[1em] *:fill-current!' aria-hidden="true" /> {badge.text}
						</Badge>
						{badges.length > 1 && (
							<>
								<Badge tabIndex={0} className='peer px-[0.35rem]' style={{ anchorName }}>+{badges.length - 1}</Badge>
								<div
									popover=""
									className={cn(
										'invisible flex flex-wrap gap-2 bg-body-100 p-3 border border-body-150 corner-shape-[1.6875rem] mx-8 mb-3 shadow-xl opacity-0 [transition:opacity_150ms_ease,visibility_0ms_150ms] dark:bg-body-900 dark:border-body-850',
										'[.peer:hover+&]:visible [.peer:hover+&]:opacity-100 [.peer:hover+&]:[transition:opacity_150ms_ease,visibility_0ms]',
										'[.peer:focus-visible+&]:visible [.peer:focus-visible+&]:opacity-100 [.peer:focus-visible+&]:[transition:opacity_150ms_ease,visibility_0ms]',
									)}
									style={{ positionAnchor: anchorName, positionArea: "top" }}
								>
									{badges.slice(1).sort((a, b) => (a.text || '').localeCompare(b.text || '')).map((badge, index) => (
										<Badge key={index} className='flex-[0_0_0]'>
											<badge.svg className='fill-body-850 dark:fill-body-150 size-[1em] *:fill-current!' aria-hidden="true" /> {badge.text}
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
						className={cn(clazz, 'text-white bg-primary-550')}
						disabled={!live}
						isButton
					>
						<Public className='inline-block align-center fill-primary-50 size-[1em]' aria-hidden="true" /> Live
					</LinkButton>
					<LinkButton
						href={source}
						className={cn(clazz, 'text-body-800 bg-body-50 border border-body-100 dark:text-body-200 dark:bg-body-850 dark:border-body-800')}
						disabled={!source}
						isButton
					>
						<CodeBlock className='inline-block align-center fill-body-800 dark:fill-body-200 size-[1em]' aria-hidden="true" /> Source
					</LinkButton>
				</div>
			</div>
		</Card>
	);
}

/**
 * SVG filters used by the blurred background icon inside of `ProjectCard`.
 * Render this once per page that uses `ProjectCard`.
 */
export function ProjectCardFilters() {
	return (
		<svg className='absolute' width="0" height="0" aria-hidden="true">
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
	);
}
