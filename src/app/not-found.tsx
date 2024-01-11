import Link from 'next/link';

import Person from '@/SVGs/Person';

export default function App() {
	return (
		<>
			<section
				className='
					flex
					justify-center
					items-center
					flex-col
					grow
					text-center
				'
			>
				<div className='relative'>
					<Person
						svg='
							absolute
							color-main-darker
							h-full
							left-1/2
							translate-x-[-50%]
						'
					/>
					<h1
						className='
						text-main-lighter
						text-[clamp(1rem,50vw,16rem)]
					'
					>
						404
					</h1>
				</div>
				<p
					className='
						max-w-prose
						p-4
					'
				>
					Lost your way? No worries, we&apos;ve all been there. Just like our
					coffee-loving friend here. Let&apos;s guide you home.
				</p>
				<Link
					className='
						inline-block
						bg-main
						text-input
						p-4
						rounded-md
						transition-colors
						hover:bg-main-lighter
						hover:text-main
						focus-visible:bg-main-lighter
						focus-visible:text-main
						focus-visible:outline
						focus-visible:outline-2
						focus-visible:outline-main
					'
					href='/'
				>
					Home Page
				</Link>
			</section>
		</>
	);
}
