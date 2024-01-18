import Head from 'next/head';
import Image from 'next/image';

import socialLinkJson from '@/components/socialLinkJson';
import skillCardJson from '@/components/skillCardJson';

import {
	MotionDiv,
	MotionH1,
	MotionH2,
	MotionP,
	MotionA,
	MotionUl,
} from '@/components/motionElemets';

import SkillCard from '@/components/skillCard';
import PortfolioCard from '@/components/portfolioCard';

import Download from '@/SVGs/logos/download';
import Selfie from '@/../public/img/production/selfie/selfie.png';
import DesktopDesign from '@/../public/img/desktop-design.jpg';
import MobileDesign from '@/../public/img/mobile-design.jpg';
import Tree from '@/../public/img/apple wallpaper/mac tree/Tree/RanchoNight_16_Dyn_Tree-1.webp';
import TreeDark from '@/../public/img/apple wallpaper/mac tree/Tree/RanchoNight_16_Dyn_Tree-2.webp';

export default async function App() {
	const latestProjects = skillCardJson()[0];
	function socialLinks(whenHidden: string) {
		return (
			<MotionUl
				variants={textAnimation(0.15)}
				initial='default'
				whileInView='enter'
				viewport={{ once: true, amount: 1 }}
				className={`
					${whenHidden}
					gap-3
				`}
				aria-label='Social Media Links'
			>
				{socialLinkJson().map((item, index) => (
					<li key={index}>
						<a
							className='
								group
								block
								rounded-sm
							'
							href={item.path}
							target='blank_'
							rel='noopener'
							aria-label={item.name}
						>
							<item.img
								svg='
									h-8
									text-primary-500
									group-hover:text-primary-50
									group-focus-visible:text-primary-50
								'
							/>
						</a>
					</li>
				))}
			</MotionUl>
		);
	}

	const textAnimation = (delay?: number) => ({
		default: {
			opacity: 0,
			y: 100,
		},
		enter: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 14,
				stiffness: 110,
				delay,
			},
		},
	});
	const imgAnimation = (startPos: number, delay?: number) => ({
		default: {
			opacity: 0,
			x: startPos,
		},
		enter: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 14,
				stiffness: 110,
				delay,
			},
		},
	});

	return (
		<>
			<Head>
				<title>Home - Phadonia</title>
			</Head>
			{/*==================================================
				Home
			==================================================*/}
			<section
				id='home'
				className='
					heroSection
					grid
					justify-items-center
					content-center
					gap-3
					lg:grid-cols-2
				'
			>
				<div
					className='
						grid
						gap-3
						self-center
					'
				>
					<MotionH1
						variants={textAnimation(0)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
					>
						Hi, I&apos;m Albin
					</MotionH1>
					<div>
						<MotionH2
							variants={textAnimation(0.05)}
							initial='default'
							whileInView='enter'
							viewport={{ once: true, amount: 1 }}
						>
							Full stack dev
						</MotionH2>
						<MotionP
							variants={textAnimation(0.1)}
							initial='default'
							whileInView='enter'
							viewport={{ once: true, amount: 1 }}
							className='
								group
								max-w-prose
							'
						>
							After four years of intensive full-stack development education,
							including a 10-week real-world experience at{' '}
							<a
								className='
									text-primary-500
								'
								href='https://www.farsight.se/'
								target='blank_'
								rel='noopener'
							>
								Farsight Tech Nordic AB
							</a>
							, I&apos;ve refined my skills and developed a keen interest in creating
							scalable, efficient, and user-friendly solutions. One of my proudest
							achievements is winning the Game On competition at{' '}
							<a
								className='
									text-primary-500
								'
								href='https://ntigymnasiet.se/skovde/'
								target='blank_'
								rel='noopener'
							>
								NTI Skövde
							</a>{' '}
							two years in a row. Currently, I am open to new job opportunities where
							I can apply my knowledge and contribute to impactful projects.
						</MotionP>
					</div>
					{socialLinks(`
						hidden
						lg:flex
					`)}
				</div>
				<MotionDiv
					variants={imgAnimation(100, 0)}
					initial='default'
					whileInView='enter'
					viewport={{ once: true, amount: 0.5 }}
				>
					<Image
						className='
							blob
							w-full
							max-w-prose
							aspect-square
							rounded-2xl
						'
						src={'/img/production/selfie/selfie.png'}
						alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
						width={561.167}
						height={561.167}
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBQTFRFP1BTRFVZSVpeSVdZSllbQVRYO05RNklNMkRIMEBEQVJVRFZaSlxgX25ymJ+poam0g4+XSltgNEdLMEFFRVZZS1xfUmJlhI6TZmdqYGNmaW1weoSJOUtOLz9DRFRXT11gWmhrU1dXbFVMclpRRzs1PUZHOktPMkNHR1VYUV9hW2lrbmhksn1trHdnimNVVFJQQlRYTFpcUmFjWWhqbWxrxIp6sXZnlm9hXWNkR1ldNkhMTFpdUWBjVGVoWGdqnHxvrIFycF9XRFVYM0ZKSVlcUGFkV2hsVWNnnIR5qoyAlJCPMjs9Pk5QM0RISVZYS1lbPkhLOj4/oXx4zry/aGpsICIjIycoJi4vSldZO0RGHyEiTkxOlURCsJ6iLjEyHh8guNYg1AAAAHZJREFUeJxjYGBkYmZhZWPn4GTg4ubh5eMXEBQSZhARFROXkJSSlpFlkJNXUFRSVlFVU2fQ0NTS1tHV0zcQYjA0MjYxNTO3sLRisLaxtbN3cLRxcmZwcXVz9/D08vbxZfDzDwgMCg4JDQtniIiMio6JjQuNigcAsvASzuB80OQAAAAASUVORK5CYII='
						placeholder='blur'
					/>
				</MotionDiv>
				{socialLinks(`
					flex
					lg:hidden
				`)}
			</section>
			{/*==================================================
				About
			==================================================*/}
			<section
				className='
					bg-primary-500
					py-8
					shadow-[0_0_0_100vmax_hsl(var(--primary-color-500))]
				'
				style={{ clipPath: 'inset(0 -100vmax)' }}
			></section>
			{/*==================================================
				About
			==================================================*/}
			<section
				id='about'
				className='
					py-8
				'
			>
				<div
					className='
						grid
						justify-items-center
					'
				>
					<MotionH2
						variants={textAnimation(0)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
					>
						About Me
					</MotionH2>
					<MotionP
						variants={textAnimation(0.05)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
					>
						My Introduction
					</MotionP>
				</div>
				<div
					className='
						grid
						justify-items-center
						content-center
						gap-3
						pt-3
						lg:grid-cols-2
					'
				>
					<MotionDiv
						variants={imgAnimation(-100, 0.1)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 0.5 }}
					>
						<Image
							className='
								w-full
								max-w-prose
								aspect-square
								rounded-2xl
								lg:w-4/5
							'
							src={Selfie}
							alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
							width={448.933}
							height={448.933}
							blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBQTFRFP1BTRFVZSVpeSVdZSllbQVRYO05RNklNMkRIMEBEQVJVRFZaSlxgX25ymJ+poam0g4+XSltgNEdLMEFFRVZZS1xfUmJlhI6TZmdqYGNmaW1weoSJOUtOLz9DRFRXT11gWmhrU1dXbFVMclpRRzs1PUZHOktPMkNHR1VYUV9hW2lrbmhksn1trHdnimNVVFJQQlRYTFpcUmFjWWhqbWxrxIp6sXZnlm9hXWNkR1ldNkhMTFpdUWBjVGVoWGdqnHxvrIFycF9XRFVYM0ZKSVlcUGFkV2hsVWNnnIR5qoyAlJCPMjs9Pk5QM0RISVZYS1lbPkhLOj4/oXx4zry/aGpsICIjIycoJi4vSldZO0RGHyEiTkxOlURCsJ6iLjEyHh8guNYg1AAAAHZJREFUeJxjYGBkYmZhZWPn4GTg4ubh5eMXEBQSZhARFROXkJSSlpFlkJNXUFRSVlFVU2fQ0NTS1tHV0zcQYjA0MjYxNTO3sLRisLaxtbN3cLRxcmZwcXVz9/D08vbxZfDzDwgMCg4JDQtniIiMio6JjQuNigcAsvASzuB80OQAAAAASUVORK5CYII='
							placeholder='blur'
						/>
					</MotionDiv>
					<div
						className='
							flex
							justify-center
							items-start
							flex-col
							gap-3
						'
					>
						<MotionP
							variants={textAnimation(0.1)}
							initial='default'
							whileInView='enter'
							viewport={{ once: true, amount: 1 }}
						>
							Hi there! I am a web and software developer currently in my fourth year
							at TE. Upon completion, I will be a High School Engineer. Throughout my
							studies, I have proven my skills by winning Game On in both 2021 and
							2022 at NTI. In my free time, I enjoy playing games and programming,
							which only adds to my passion for technology and development
						</MotionP>
						<MotionA
							variants={textAnimation(0.15)}
							initial='default'
							whileInView='enter'
							viewport={{ once: true, amount: 1 }}
							className='
								group
								flex
								items-center
								gap-1
								bg-primary-500
								text-input
								p-3
								rounded-md
								hover:bg-primary-50
								hover:text-primary-500
								focus-visible:bg-primary-50
								focus-visible:text-primary-500
							'
							href='/Albin_Karlsson_CV.pdf'
							download="Albin Karlsson's CV"
							target='_blank'
							rel='noopener'
						>
							Download CV
							<Download
								svg='
									inline
									text-input
									h-5
									group-hover:text-primary-500
									group-focus-visible:text-primary-500
								'
							/>
						</MotionA>
					</div>
				</div>
			</section>
			{/*==================================================
				Skills
			==================================================*/}
			<section
				id='skills'
				className='
					bg-primary-500
					py-8
					shadow-[0_0_0_100vmax_hsl(var(--primary-color-500))]
				'
				style={{ clipPath: 'inset(0 -100vmax)' }}
			>
				<div
					className='
						grid
						justify-items-center
					'
				>
					<MotionH2
						variants={textAnimation(0)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
						className='text-input'
					>
						Skills
					</MotionH2>
					<MotionP
						variants={textAnimation(0.05)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
						className='text-input'
					>
						My technical level
					</MotionP>
				</div>
				<div
					className='
						grid
						grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]
						gap-12
						pt-3
					'
				>
					{skillCardJson().map((item, index) => (
						<MotionDiv
							key={index}
							variants={textAnimation(0.1 + 0.05 * (index % 6))}
							initial='default'
							whileInView='enter'
							viewport={{ once: true, amount: 1 }}
						>
							<SkillCard
								SVG={<item.SVG svg='text-input' />}
								title={item.title}
								description={item.description}
								modalSVG={<item.SVG svg='text-primary-500 w-72' />}
							/>
						</MotionDiv>
					))}
				</div>
			</section>
			{/*==================================================
				Portfolio
			==================================================*/}
			<section
				id='portfolio'
				className='
					py-8
				'
			>
				<div
					className='
						grid
						justify-items-center
					'
				>
					<MotionH2
						variants={textAnimation(0)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
					>
						Portfolio
					</MotionH2>
					<MotionP
						variants={textAnimation(0.05)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 1 }}
					>
						Most recent work
					</MotionP>
				</div>
				<div
					className='
						grid
						grid-cols-2
						gap-12
						pt-3
					'
				>
					<MotionDiv
						variants={textAnimation(0.1)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 0.5 }}
					>
						<PortfolioCard
							bgs={[Tree, TreeDark]}
							imgs={[MobileDesign, DesktopDesign]}
							title={latestProjects.title}
						/>
					</MotionDiv>
					<MotionDiv
						variants={textAnimation(0.15)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 0.5 }}
					>
						<PortfolioCard
							bgs={[Tree, TreeDark]}
							imgs={[MobileDesign, DesktopDesign]}
							title={latestProjects.title}
						/>
					</MotionDiv>
					<MotionDiv
						variants={textAnimation(0.1)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 0.5 }}
					>
						<PortfolioCard
							bgs={[Tree, TreeDark]}
							imgs={[MobileDesign, DesktopDesign]}
							title={latestProjects.title}
						/>
					</MotionDiv>
					<MotionDiv
						variants={textAnimation(0.15)}
						initial='default'
						whileInView='enter'
						viewport={{ once: true, amount: 0.5 }}
					>
						<PortfolioCard
							bgs={[Tree, TreeDark]}
							imgs={[MobileDesign, DesktopDesign]}
							title={latestProjects.title}
						/>
					</MotionDiv>
				</div>
			</section>
		</>
	);
}
