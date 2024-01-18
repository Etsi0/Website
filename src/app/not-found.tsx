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
							text-primary-700
							h-full
							left-1/2
							translate-x-[-50%]
						'
					/>
					<h1
						className='
							text-primary-500
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
						bg-primary-500
						text-input
						p-4
						rounded-md
						transition-colors
						hover:bg-primary-50
						hover:text-primary-500
						focus-visible:bg-primary-50
						focus-visible:text-primary-500
						focus-visible:outline
						focus-visible:outline-2
						focus-visible:outline-primary-500
					'
					href='/'
				>
					Home Page
				</Link>
			</section>
		</>
	);
}
