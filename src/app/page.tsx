import type { Metadata } from 'next';

import { Hero } from '@/components/Home/sections/hero';
import { About } from '@/components/Home/sections/about';
import { Skills } from '@/components/Home/sections/skills';
import { Portfolio } from '@/components/Home/sections/portfolio';

export const metadata: Metadata = {
	title: 'Phadonia',
	description:
		'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default async function App() {
	return (
		<>
			<Hero />
			<About />
			<Skills />
			<Portfolio />
		</>
	);
}
