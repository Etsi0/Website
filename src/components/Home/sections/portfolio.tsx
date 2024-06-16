import Link from 'next/link';

import { type EmblaOptionsType } from 'embla-carousel';

import Carousel from '@/components/ui/carousel';

export function Portfolio() {
	const OPTIONS: EmblaOptionsType = { loop: true };
	const SLIDE_COUNT = 3;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

	return (
		<>
			<section id='portfolio' className='grid justify-items-center gap-3 py-8'>
				<div className='text-center'>
					<h2>Portfolio</h2>
					<p>Most recent work</p>
				</div>
				<Carousel slides={SLIDES} options={OPTIONS} type='Dot' />
				<Link
					className='rounded-md bg-primary-500 px-5 py-3 text-lg text-input hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500'
					href='#'
				>
					See all (Coming soon)
				</Link>
			</section>
		</>
	);
}
