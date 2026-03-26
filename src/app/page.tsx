import type { Metadata } from 'next';

import { SilkWrapper } from '@/components/ui/silkWrapper';
import { GridWrapper } from '@/components/ui/gridWrapper';
import { About } from '@/components/Home/sections/about';
import { InfinityScrollWrapper } from '@/components/Home/sections/infinityScrollWrapper';
import { Portfolio } from '@/components/Home/sections/portfolio';
import { LinkButton } from '@/components/ui/link';

export const metadata: Metadata = {
	title: 'Phadonia',
	description: 'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default function Page() {
	return (
		<>
			<SilkWrapper>
				<section id="home" className="grid place-content-center place-items-center min-h-[min(62.5rem,100svh)] text-center gap-[calc(1rem*sqrt(5.75*1)/1.5)] border-primary-500">
					<h1 className='text-[clamp(0rem,0rem+9.2vw,5.75rem)]'>
						Building my own
						{' '}
						<span className='text-text-800 italic'>solutions,</span>
						{' '}
						one
						{' '}
						<span className='text-black dark:text-white'>program</span>
						{' '}
						after another
					</h1>
					<p>Every project here started with the same thought: “This should be better.” So I made it better and shared it with the world.</p>
					<LinkButton
						className='
							animate-[animatedButtonBorder_15s_linear_infinite] font-(family-name:--mono) text-custom-lg uppercase [background:linear-gradient(var(--color-body-50),var(--color-body-50))_padding-box,conic-gradient(from_var(--turn),var(--color-body-100)_0deg_5deg,var(--color-primary-500)_5deg_38.33deg,var(--color-body-100)_38.33deg_43.33deg)_border-box] w-[30ch] px-[1.5em] py-[0.75em] border border-transparent rounded-full
							hover:text-text-600
							focus-visible:text-text-600
							active:text-text-500
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
				<InfinityScrollWrapper />
			</GridWrapper>
			<Portfolio />
		</>
	);
}
