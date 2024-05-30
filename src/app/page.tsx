import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/util';

import { SocialLinkJson } from '@/json/socialLink';
import { SkillCardJson } from '@/json/home/skillCard';

import Carousel from '@/components/ui/carousel';
import { EmblaOptionsType } from 'embla-carousel';

import SkillCard from '@/components/skillCard';

import { Download } from '@/components/SVGs';
import { YearsElapsed } from '@/components/yearsElapsed';
import { TypingText } from '@/components/typingText';

import CasualSelfie from '@/../public/img/production/casual selfie/selfie.png';
import StudentCapSelfie from '@/../public/img/production/student cap selfie/selfie.png';

export const metadata: Metadata = {
	title: 'Phadonia',
	description:
		'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default async function App() {
	const OPTIONS: EmblaOptionsType = { loop: true };
	const SLIDE_COUNT = 3;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

	function SocialLinks({ className }: { className: string }) {
		return (
			<ul className={cn('gap-3', className)} aria-label='Social Media Links'>
				{SocialLinkJson.map((item, index) => (
					<li key={index}>
						<a
							className={cn('group block rounded-sm')}
							href={item.path}
							target='blank_'
							rel='noopener'
							aria-label={item.name}
						>
							<item.img className='h-8 text-primary-500 group-hover:text-primary-50 group-focus-visible:text-primary-50' />
						</a>
					</li>
				))}
			</ul>
		);
	}

	return (
		<>
			{/*==================================================
				Home
			==================================================*/}
			<section
				id='home'
				className={cn(
					'heroSection grid content-center justify-items-center gap-3 lg:grid-cols-2',
				)}
			>
				<div className={cn('grid gap-3 self-center')}>
					<h1>Hi, I{"'"}m Albin</h1>
					<div>
						<h2 className={cn('min-h-10')}>
							<TypingText
								textArray={[
									'// Full-stack Dev',
									'<!-- Front-end Dev -->',
									'-- Back-end Dev',
								]}
								delay={4000}
							/>
						</h2>
						<p className={cn('group max-w-prose')}>
							I{"'"}m a {YearsElapsed(new Date('2003-08-25'))}-year-old full-stack
							developer from Skövde, Sweden. I love programming, technology, and
							gaming, and use my skills to create great digital experiences. I enjoy
							learning and working with others. Welcome to my portfolio, let{"'"}s
							build something amazing together.
						</p>
						<audio className={cn('inline-block rounded-lg')} controls>
							<source src='/tts/Hero.mp3' type='audio/mp3' />
							Your browser does not support the audio element.
						</audio>{' '}
						by{' '}
						<a
							className={cn('text-primary-500')}
							href='https://elevenlabs.io/text-to-speech'
						>
							ElevenLabs
						</a>
					</div>
					<SocialLinks className='hidden lg:flex' />
				</div>
				<Image
					className={cn(
						'aspect-square w-full max-w-prose rounded-2xl object-cover object-[50%,25%] [mask-position:_center] [mask-repeat:_no-repeat] [mask-size:_contain] lg:[mask-image:_url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTg3Ij48cGF0aCBkPSJNMTkwIDM2YzE3IDI2IDExIDY3LTggOTgtMTkgMzItNTEgNTQtODIgNTItMzAtMS01OS0yNS03OC01N0MyIDk4LTcgNTkgNyAzNSAyMSAxMCA2MCAwIDk4IDBzNzYgMTEgOTIgMzZaIi8+PC9zdmc+")]',
					)}
					src={CasualSelfie}
					alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
					width={562}
					height={562}
					sizes='(max-width: 375px) 311px, (max-width: 390px) 322px, (max-width: 577px) 514px, 562px'
					blurDataURL={CasualSelfie.blurDataURL}
					placeholder='blur'
				/>
				<SocialLinks className='flex lg:hidden' />
			</section>
			{/*==================================================
				About
			==================================================*/}
			<section id='about' className={cn('py-8')}>
				<div className={cn('grid justify-items-center')}>
					<h2>About Me</h2>
					<p>My Introduction</p>
				</div>
				<div className={cn('grid place-items-center gap-3 pt-3 lg:grid-cols-2')}>
					<div>
						<Image
							className={cn(
								'aspect-square w-full max-w-prose rounded-2xl object-cover',
							)}
							src={StudentCapSelfie}
							alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
							width={449}
							height={449}
							sizes='(max-width: 1024px) 100%, 449px'
							blurDataURL={StudentCapSelfie.blurDataURL}
							placeholder='blur'
						/>
					</div>
					<div className={cn('flex flex-col items-start justify-center gap-3')}>
						<p>
							Hi there! I recently completed my high school engineering degree and am
							currently enhancing my skills through Harvard University{"'"}s CS50x, an
							introduction to computer science and programming. A two-time winner of
							the NTI{"'"}s Game On competition, my commitment to technology extends
							into my free time where I enjoy gaming and programming. I am passionate
							about using my knowledge to create innovative digital solutions.
						</p>
						<a
							className={cn(
								'group space-x-1 rounded-md bg-primary-500 px-6 py-3 text-input hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500',
							)}
							href='/Albin_Karlsson_CV.pdf'
							download="Albin Karlsson's CV"
							target='_blank'
							rel='noopener'
						>
							<span className='align-middle'>Download CV</span>
							<Download
								className={cn(
									'inline-block h-5 text-input group-hover:text-primary-500 group-focus-visible:text-primary-500',
								)}
							/>
						</a>
					</div>
				</div>
			</section>
			{/*==================================================
				Skills
			==================================================*/}
			<section
				id='skills'
				className={cn(
					'bg-body-50 py-8 shadow-[0_0_0_100vmax_hsl(var(--body-color-50))] [clip-path:inset(0_-100vmax)] dark:bg-body-200 dark:shadow-[0_0_0_100vmax_hsl(var(--body-color-200))]',
				)}
			>
				<div className={cn('grid justify-items-center')}>
					<h2>Skills</h2>
					<p>My technical level</p>
				</div>
				<div
					className={cn('grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-12 pt-3')}
				>
					{SkillCardJson.map((item, index) => (
						<SkillCard
							key={index}
							SVG={item.SVG}
							className='aspect-square text-input group-hover:text-primary-500 group-focus-visible:text-primary-500 dark:group-hover:text-body-300 dark:group-focus-visible:text-body-300'
							title={item.title}
							description={item.description}
							modalClassName='aspect-square w-72 text-primary-500'
						/>
					))}
				</div>
			</section>
			{/*==================================================
				Portfolio
			==================================================*/}
			<section id='portfolio' className={cn('grid justify-items-center gap-3 py-8')}>
				<div className={cn('text-center')}>
					<h2>Portfolio</h2>
					<p>Most recent work</p>
				</div>
				<Carousel slides={SLIDES} options={OPTIONS} type='Dot' />
				<Link
					className={cn(
						'rounded-md bg-primary-500 px-5 py-3 text-lg text-input hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500',
					)}
					href='#'
				>
					See all (Coming soon)
				</Link>
			</section>
		</>
	);
}
