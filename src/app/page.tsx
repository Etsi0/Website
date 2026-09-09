import type { Metadata } from 'next';

import { SilkWrapper } from '@/components/ui/silkWrapper';
import { GridWrapper } from '@/components/ui/gridWrapper';
import { About } from '@/components/Home/sections/about';
import { Portfolio } from '@/components/Home/sections/portfolio';
import { LinkButton } from '@/components/ui/link';
import { Marquee } from '@/components/ui/marquee';

export const metadata: Metadata = {
	title: 'Phadonia',
	description: 'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

const Farsight = '/img/production/companies/Farsight.webp';
const MaxPA = '/img/production/companies/MaxPA.svg';
const HCLTech = '/img/production/companies/HCLTech.svg';

export default function Page() {
	return (
		<>
			<SilkWrapper>
				<section id="home" className="grid place-content-center place-items-center min-h-[min(62.5rem,100svh)] text-center gap-[calc(1rem*sqrt(5.75*1)/1.5)] border-primary-500">
					<h1 className='text-[clamp(0rem,0rem+9.2vw,5.75rem)]'>
						Building my own <span className='text-body-800 dark:text-body-200 italic'>
							solutions,
						</span> one <span className='text-black dark:text-white'>
							program
						</span> after another
					</h1>
					<p>Every project here started with the same thought: “This should be better.” So I made it better and shared it with the world.</p>
					<LinkButton
						href="#portfolio"
						className='
							[--btn-bg:var(--color-body-50)] [--btn-border:var(--color-body-100)] dark:[--btn-bg:var(--color-body-950)] dark:[--btn-border:var(--color-body-900)]
							animate-[animatedButtonBorder_15s_linear_infinite] font-mono text-custom-lg uppercase [background:linear-gradient(var(--btn-bg),var(--btn-bg))_padding-box,conic-gradient(from_var(--turn),var(--btn-border)_0deg_5deg,var(--color-primary-500)_5deg_38.33deg,var(--btn-border)_38.33deg_43.33deg)_border-box] w-[30ch] px-[1.5em] py-[0.75em] border border-transparent rounded-full
							hover:text-body-600 dark:hover:text-body-400
							focus-visible:text-body-600 dark:focus-visible:text-body-400
							active:text-body-500
						'
						isHoverable={false}
					>
						My solutions
					</LinkButton>
				</section>
			</SilkWrapper>
			<div className='col-full bg-linear-to-r from-primary-100 via-primary-300 to-primary-100 via-[calc(50%-20rem)] h-[2px] dark:from-primary-900 dark:via-primary-700 dark:to-primary-900'></div>
			<GridWrapper>
				<About />
				<Marquee
					className={['h-[100px]', 'size-[100px] brightness-1000 invert dark:invert-0']}
					id='experience'
					label="Companies I've worked with"
					gap='3.125rem'
					size={100}
					images={[
						{ src: MaxPA, alt: 'MaxPA' },
						{ src: Farsight, alt: 'Farsight' },
						{ src: HCLTech, alt: 'HCLTech' },
					]}
					shadowCopies={2}
				/>
			</GridWrapper>
			<Portfolio />
		</>
	);
}
