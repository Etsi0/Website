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
			<HeroWrapper className="text-center gap-[calc(1rem*sqrt((5.75*16)*(1*16))/16/1.5)]">
				<h1 className='text-[5.75rem]'>Building my own <span className='text-text-800'>solutions,</span><br />one <span className='text-black dark:text-white'>program</span> after another</h1>
				<p>Every project here started with the same thought: “This should be better.” So I made it better and shared it with the world.</p>
				<LinkButton>asd</LinkButton>
			</HeroWrapper>
			<Hero />
			<InfinityScrollWrapper />
			<About />
			<Skills />
			<Portfolio />
		</>
	);
}
