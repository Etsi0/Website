import type { Metadata } from 'next';

import { About } from '@/components/Home/sections/about';
import { Hero } from '@/components/Home/sections/hero';
import { InfinityScrollWrapper } from '@/components/Home/sections/infinityScrollWrapper';
import { Portfolio } from '@/components/Home/sections/portfolio';
import { Skills } from '@/components/Home/sections/skills';

export const metadata: Metadata = {
	title: 'Phadonia',
	description: 'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default function App() {
	return (
		<>
			<Hero />
			<InfinityScrollWrapper />
			<About />
			<Skills />
			<Portfolio />
		</>
	);
}
