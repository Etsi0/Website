import type { Metadata } from 'next';

import { About } from '@/components/Home/sections/about';
import { Hero } from '@/components/Home/sections/hero';
import { InfinityScroll } from '@/components/Home/sections/infinityScroll';
import { Portfolio } from '@/components/Home/sections/portfolio';
import { Skills } from '@/components/Home/sections/skills';

import Farsight from '@/../public/img/production/companies/Farsight.webp';
import HCLTech from '@/../public/img/production/companies/HCLTech.svg';
import Icon from '@/../public/img/production/icon.png';
import MaxPA from '@/../public/img/production/companies/MaxPA.svg';

export const metadata: Metadata = {
	title: 'Phadonia',
	description:
		'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default function App() {
	return (
		<>
			<Hero />
			<InfinityScroll
				className={[
					'h-[100px]',
					'size-[100px] [&:not(:nth-child(4n_+_2))]:brightness-[1000] [&:not(:nth-child(4n_+_2))]:invert dark:[&:not(:nth-child(4n_+_2))]:invert-0',
				]}
				duration={75}
				gap={50}
				images={[
					MaxPA,
					Icon,
					Farsight,
					HCLTech,
					MaxPA,
					Icon,
					Farsight,
					HCLTech,
					MaxPA,
					Icon,
					Farsight,
					HCLTech,
				]}
				size={100}
			/>
			<About />
			<Skills />
			<Portfolio />
		</>
	);
}
