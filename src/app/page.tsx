import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/util';

import socialLinkJson from '@/json/socialLink';
import skillCardJson from '@/components/skillCardJson';

import Carousel from '@/components/ui/carousel';
import { EmblaOptionsType } from 'embla-carousel';

import SkillCard from '@/components/skillCard';

import { Download } from '@/components/SVGs';
import StudentCapSelfie from '@/../public/img/production/student cap selfie/selfie.png';
import CasualSelfie from '@/../public/img/production/casual selfie/selfie.png';
import TypingText from '@/components/typingText';

export default async function App() {
	const latestProjects = skillCardJson()[0];

	const title = 'Home - Phadonia';
	const description = 'Home - Phadonia';

	function CalculateAge(startDate: Date): number {
		const endDate = new Date();
		let diff = endDate.getFullYear() - startDate.getFullYear();

		const monthCheck = endDate.getMonth() < startDate.getMonth();
		const dayCheck =
			endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate();
		if (monthCheck || dayCheck) {
			return --diff;
		}

		return diff;
	}

	const OPTIONS: EmblaOptionsType = { loop: true };
	const SLIDE_COUNT = 3;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

	function SocialLinks({ className }: { className: string }) {
		return (
			<ul className={cn(`gap-3`, className)} aria-label='Social Media Links'>
				{socialLinkJson().map((item, index) => (
					<li key={index}>
						<a
							className={cn(`group block rounded-sm`)}
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
			<Head>
				<title>{title}</title>
				<meta name='description' content='Description of my page' />
				<meta property='og:title' content={title} />
				<meta property='og:description' content='Description of my page' />
				<meta property='og:url' content='website' />
			</Head>
			{/*==================================================
				Home
			==================================================*/}
			<section
				id='home'
				className={cn(
					`heroSection grid content-center justify-items-center gap-3 lg:grid-cols-2`,
				)}
			>
				<div className={cn(`grid gap-3 self-center`)}>
					<h1>Hi, I{"'"}m Albin</h1>
					<div>
						<h2 className={cn(`min-h-10`)}>
							<TypingText
								textArray={[
									'// Full-stack Dev',
									'<!-- Front-end Dev -->',
									'-- Back-end Dev',
								]}
								delay={4000}
							/>
						</h2>
						<p className={cn(`group max-w-prose`)}>
							I{"'"}m a {CalculateAge(new Date('2003-08-25'))}-year-old full-stack
							maestro from Skövde, Sweden. My world revolves around turning complex
							digital challenges into playful solutions. With a heart for programming,
							tech, and gaming, I blend passion with skill to craft remarkable digital
							experiences. Driven by curiosity and the joy of learning, I{"'"}m the
							teammate you{"'"}ve been searching for. Welcome to my portfolio—let{"'"}
							s create something unforgettable together.
						</p>
						<audio className={cn(`inline-block rounded-lg`)} controls>
							<source
								src='/tts/ElevenLabs_2024-03-06T20 42 10_Matilda_pre_s60_sb65_se0_b_m2.mp3'
								type='audio/mp3'
							/>
							Your browser does not support the audio element.
						</audio>{' '}
						by{' '}
						<a
							className={cn(`text-primary-500`)}
							href='https://elevenlabs.io/text-to-speech'
						>
							ElevenLabs
						</a>
					</div>
					<SocialLinks className='hidden lg:flex' />
				</div>
				<Image
					className={cn(
						`blob aspect-square w-full max-w-prose rounded-2xl object-cover object-[50%,25%]`,
					)}
					src={CasualSelfie}
					alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
					width={562}
					height={562}
					sizes='(max-width: 375px) 311px, (max-width: 390px) 322px, (max-width: 577px) 514px, 562px'
					blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBQTFRFP1BTRFVZSVpeSVdZSllbQVRYO05RNklNMkRIMEBEQVJVRFZaSlxgX25ymJ+poam0g4+XSltgNEdLMEFFRVZZS1xfUmJlhI6TZmdqYGNmaW1weoSJOUtOLz9DRFRXT11gWmhrU1dXbFVMclpRRzs1PUZHOktPMkNHR1VYUV9hW2lrbmhksn1trHdnimNVVFJQQlRYTFpcUmFjWWhqbWxrxIp6sXZnlm9hXWNkR1ldNkhMTFpdUWBjVGVoWGdqnHxvrIFycF9XRFVYM0ZKSVlcUGFkV2hsVWNnnIR5qoyAlJCPMjs9Pk5QM0RISVZYS1lbPkhLOj4/oXx4zry/aGpsICIjIycoJi4vSldZO0RGHyEiTkxOlURCsJ6iLjEyHh8guNYg1AAAAHZJREFUeJxjYGBkYmZhZWPn4GTg4ubh5eMXEBQSZhARFROXkJSSlpFlkJNXUFRSVlFVU2fQ0NTS1tHV0zcQYjA0MjYxNTO3sLRisLaxtbN3cLRxcmZwcXVz9/D08vbxZfDzDwgMCg4JDQtniIiMio6JjQuNigcAsvASzuB80OQAAAAASUVORK5CYII='
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
							blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBQTFRFP1BTRFVZSVpeSVdZSllbQVRYO05RNklNMkRIMEBEQVJVRFZaSlxgX25ymJ+poam0g4+XSltgNEdLMEFFRVZZS1xfUmJlhI6TZmdqYGNmaW1weoSJOUtOLz9DRFRXT11gWmhrU1dXbFVMclpRRzs1PUZHOktPMkNHR1VYUV9hW2lrbmhksn1trHdnimNVVFJQQlRYTFpcUmFjWWhqbWxrxIp6sXZnlm9hXWNkR1ldNkhMTFpdUWBjVGVoWGdqnHxvrIFycF9XRFVYM0ZKSVlcUGFkV2hsVWNnnIR5qoyAlJCPMjs9Pk5QM0RISVZYS1lbPkhLOj4/oXx4zry/aGpsICIjIycoJi4vSldZO0RGHyEiTkxOlURCsJ6iLjEyHh8guNYg1AAAAHZJREFUeJxjYGBkYmZhZWPn4GTg4ubh5eMXEBQSZhARFROXkJSSlpFlkJNXUFRSVlFVU2fQ0NTS1tHV0zcQYjA0MjYxNTO3sLRisLaxtbN3cLRxcmZwcXVz9/D08vbxZfDzDwgMCg4JDQtniIiMio6JjQuNigcAsvASzuB80OQAAAAASUVORK5CYII='
							placeholder='blur'
						/>
					</div>
					<div className={cn('flex flex-col items-start justify-center gap-3')}>
						<p>
							Hi there! I am a web and software developer currently in my fourth year
							at TE. Upon completion, I will be a High School Engineer. Throughout my
							studies, I have proven my skills by winning Game On in both 2021 and
							2022 at NTI. In my free time, I enjoy playing games and programming,
							which only adds to my passion for technology and development
						</p>
						<a
							className={cn(
								'group flex items-center gap-1 rounded-md bg-primary-500 p-3 text-input hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500',
							)}
							href='/Albin_Karlsson_CV.pdf'
							download="Albin Karlsson's CV"
							target='_blank'
							rel='noopener'
						>
							Download CV
							<Download
								className={cn(
									'inline h-5 text-input group-hover:text-primary-500 group-focus-visible:text-primary-500',
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
					{skillCardJson().map((item, index) => (
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
