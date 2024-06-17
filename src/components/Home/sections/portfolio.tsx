import Link from 'next/link';

import Carousel, { type TCarousel } from '@/components/ui/carousel';

const CItems: TCarousel = {
	AutoplayOptions: { stopOnInteraction: false },
	options: { loop: true },
	slides: Array.from(Array(3).keys()),
	type: 'Dot',
};

export function Portfolio() {
	return (
		<>
			<section id='portfolio' className='grid justify-items-center gap-3 py-8'>
				<div className='text-center'>
					<h2>Portfolio</h2>
					<p>Most recent work</p>
				</div>
				<Carousel
					AutoplayOptions={CItems.AutoplayOptions}
					options={CItems.options}
					slides={CItems.slides}
					type={CItems.type}
				/>
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
