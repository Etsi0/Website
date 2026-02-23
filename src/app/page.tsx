import type { Metadata } from 'next';

import { About } from '@/components/Home/sections/about';
import { Hero } from '@/components/Home/sections/hero';
import { InfinityScrollWrapper } from '@/components/Home/sections/infinityScrollWrapper';
import { Portfolio } from '@/components/Home/sections/portfolio';
import { Skills } from '@/components/Home/sections/skills';
import { HeroWrapper } from '@/components/ui/heroWrapper';
import { LinkButton } from '@/components/ui/link';

export const metadata: Metadata = {
	title: 'Phadonia',
	description: 'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default function App() {
	return (
		<>
			<HeroWrapper className="text-center gap-[calc(1rem*sqrt(5.75*1)/1.5)] border-primary-500">
				<h1 className='text-[5.75rem]'>Building my own <span className='text-text-800 italic'>solutions,</span> one <span className='text-black dark:text-white'>program</span> after another</h1>
				<p>Every project here started with the same thought: “This should be better.” So I made it better and shared it with the world.</p>
				<LinkButton className='font-(family-name:--mono) text-custom-lg uppercase bg-body-50 w-[32.5ch] px-[1.5em] py-[0.75em] border border-body-100 rounded-full'>My solutions</LinkButton>
			</HeroWrapper>
			<div className='col-full bg-linear-to-r from-primary-100 via-primary-300 to-primary-100 via-[calc(50%-20rem)] h-[2px] dark:from-primary-900 dark:via-primary-700 dark:to-primary-900'></div>
			<Hero />
			<InfinityScrollWrapper />
			<About />
			<Skills />
			<Portfolio />
		</>
	);
}
