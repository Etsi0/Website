'use client';
import Image from 'next/image';
import { motion, m, Variants, LazyMotion, domAnimation } from 'framer-motion';

import socialLinkJson from '@/components/socialLinkJson';
import skillCardJson from '@/components/skillCardJson';

import SkillCard from '@/components/skillCard';

import Download from '@/SVGs/logos/download';
import Selfie from '@/../public/img/production/selfie/selfie.png';

export default async function App() {
	const latestProjects = skillCardJson()[0];
	function socialLinks(whenHidden: string) {
		return (
			<LazyMotion features={domAnimation}>
				<m.ul
					variants={heroText}
					custom={0.15}
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
										text-main
										group-hover:text-main-lighter
										group-focus-visible:text-main-lighter
									'
								/>
							</a>
						</li>
					))}
				</m.ul>
			</LazyMotion>
		);
	}

	const heroText: Variants = {
		default: {
			opacity: 0,
			y: 100,
		},
		enter: (customDelay) => ({
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 14,
				stiffness: 110,
				delay: customDelay,
			},
		}),
	};
	const heroImg: Variants = {
		default: {
			opacity: 0,
			x: 100,
		},
		enter: (customDelay) => ({
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				damping: 14,
				stiffness: 110,
				delay: customDelay,
			},
		}),
	};

	return (
		<>
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
					<LazyMotion features={domAnimation}>
						<m.h1
							variants={heroText}
							initial='default'
							whileInView='enter'
							viewport={{ once: true, amount: 1 }}
						>
							Hi, I&apos;m Albin
						</m.h1>
					</LazyMotion>
					<div>
						<LazyMotion features={domAnimation}>
							<m.h2
								variants={heroText}
								custom={0.05}
								initial='default'
								whileInView='enter'
								viewport={{ once: true, amount: 1 }}
							>
								Full stack dev
							</m.h2>
							<m.p
								variants={heroText}
								custom={0.1}
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
										text-main
									'
									href='https://www.farsight.se/'
									target='blank_'
									rel='noopener'
								>
									Farsight Tech Nordic AB
								</a>
								, I&apos;ve refined my skills and developed a keen interest in
								creating scalable, efficient, and user-friendly solutions. One of my
								proudest achievements is winning the Game On competition at{' '}
								<a
									className='
										text-main
									'
									href='https://ntigymnasiet.se/skovde/'
									target='blank_'
									rel='noopener'
								>
									NTI Skövde
								</a>{' '}
								two years in a row. Currently, I am open to new job opportunities
								where I can apply my knowledge and contribute to impactful projects.
							</m.p>
						</LazyMotion>
					</div>
					{socialLinks(`
						hidden
						lg:flex
					`)}
				</div>
				<LazyMotion features={domAnimation}>
					<m.div
						variants={heroImg}
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
							width={562}
							height={562}
							blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBQTFRFP1BTRFVZSVpeSVdZSllbQVRYO05RNklNMkRIMEBEQVJVRFZaSlxgX25ymJ+poam0g4+XSltgNEdLMEFFRVZZS1xfUmJlhI6TZmdqYGNmaW1weoSJOUtOLz9DRFRXT11gWmhrU1dXbFVMclpRRzs1PUZHOktPMkNHR1VYUV9hW2lrbmhksn1trHdnimNVVFJQQlRYTFpcUmFjWWhqbWxrxIp6sXZnlm9hXWNkR1ldNkhMTFpdUWBjVGVoWGdqnHxvrIFycF9XRFVYM0ZKSVlcUGFkV2hsVWNnnIR5qoyAlJCPMjs9Pk5QM0RISVZYS1lbPkhLOj4/oXx4zry/aGpsICIjIycoJi4vSldZO0RGHyEiTkxOlURCsJ6iLjEyHh8guNYg1AAAAHZJREFUeJxjYGBkYmZhZWPn4GTg4ubh5eMXEBQSZhARFROXkJSSlpFlkJNXUFRSVlFVU2fQ0NTS1tHV0zcQYjA0MjYxNTO3sLRisLaxtbN3cLRxcmZwcXVz9/D08vbxZfDzDwgMCg4JDQtniIiMio6JjQuNigcAsvASzuB80OQAAAAASUVORK5CYII='
							placeholder='blur'
						/>
					</m.div>
				</LazyMotion>
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
					bg-main
					py-8
					shadow-[0_0_0_100vmax_var(--main-color)]
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
					<h2>About Me</h2>
					<p>My Introduction</p>
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
						blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASBQTFRFP1BTRFVZSVpeSVdZSllbQVRYO05RNklNMkRIMEBEQVJVRFZaSlxgX25ymJ+poam0g4+XSltgNEdLMEFFRVZZS1xfUmJlhI6TZmdqYGNmaW1weoSJOUtOLz9DRFRXT11gWmhrU1dXbFVMclpRRzs1PUZHOktPMkNHR1VYUV9hW2lrbmhksn1trHdnimNVVFJQQlRYTFpcUmFjWWhqbWxrxIp6sXZnlm9hXWNkR1ldNkhMTFpdUWBjVGVoWGdqnHxvrIFycF9XRFVYM0ZKSVlcUGFkV2hsVWNnnIR5qoyAlJCPMjs9Pk5QM0RISVZYS1lbPkhLOj4/oXx4zry/aGpsICIjIycoJi4vSldZO0RGHyEiTkxOlURCsJ6iLjEyHh8guNYg1AAAAHZJREFUeJxjYGBkYmZhZWPn4GTg4ubh5eMXEBQSZhARFROXkJSSlpFlkJNXUFRSVlFVU2fQ0NTS1tHV0zcQYjA0MjYxNTO3sLRisLaxtbN3cLRxcmZwcXVz9/D08vbxZfDzDwgMCg4JDQtniIiMio6JjQuNigcAsvASzuB80OQAAAAASUVORK5CYII='
						placeholder='blur'
					/>
					<div
						className='
							flex
							justify-center
							items-start
							flex-col
							gap-3
						'
					>
						<p
							className='
								text-base
								font-medium
								text-text-lighter
								font-Poppins
								max-w-prose
							'
						>
							Hi there! I am a web and software developer currently in my fourth year
							at TE. Upon completion, I will be a High School Engineer. Throughout my
							studies, I have proven my skills by winning Game On in both 2021 and
							2022 at NTI. In my free time, I enjoy playing games and programming,
							which only adds to my passion for technology and development
						</p>
						<LazyMotion features={domAnimation}>
							<m.a
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{
									scale: 0.95,
								}}
								className='
									group
									flex
									items-center
									gap-1
									bg-main
									text-input
									p-3
									rounded-md
									hover:bg-main-lighter
									hover:text-main
									focus-visible:bg-main-lighter
									focus-visible:text-main
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
										group-hover:text-main
										group-focus-visible:text-main
									'
								/>
							</m.a>
						</LazyMotion>
					</div>
				</div>
			</section>
			{/*==================================================
				Skills
			==================================================*/}
			<section
				id='skills'
				className='
					bg-main
					py-8
					shadow-[0_0_0_100vmax_var(--main-color)]
				'
				style={{ clipPath: 'inset(0 -100vmax)' }}
			>
				<div
					className='
						grid
						justify-items-center
					'
				>
					<h2
						className='
							text-input
						'
					>
						Skills
					</h2>
					<p
						className='
							text-input
						'
					>
						My technical level
					</p>
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
						<SkillCard
							key={index}
							SVG={<item.SVG svg='text-input' />}
							title={item.title}
							description={item.description}
							modalSVG={<item.SVG svg='text-main w-72' />}
						/>
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
					<h2
						className='
							text-input
						'
					>
						Skills
					</h2>
					<p
						className='
							text-input
						'
					>
						My technical level
					</p>
				</div>
				<div
					className='
						pt-3
					'
				>
					<SkillCard
						SVG={<latestProjects.SVG svg='text-input' />}
						title={latestProjects.title}
						description={latestProjects.description}
						modalSVG={<latestProjects.SVG svg='text-main w-72' />}
					/>
				</div>
			</section>
		</>
	);
}
