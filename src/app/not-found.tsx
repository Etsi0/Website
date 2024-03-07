import Link from 'next/link';

import { Person } from '@/components/SVGs';
import { cn } from '@/lib/util';

export default function App() {
	return (
		<>
			<section className={cn('flex grow flex-col items-center justify-center text-center')}>
				<div className={cn('relative')}>
					<Person className='absolute left-1/2 h-full translate-x-[-50%] text-primary-700' />
					<h1 className={cn('text-[clamp(1rem,50vw,16rem)] text-primary-500')}>404</h1>
				</div>
				<p className={cn('max-w-prose p-4')}>
					Lost your way? No worries, we&apos;ve all been there. Just like our
					coffee-loving friend here. Let&apos;s guide you home.
				</p>
				<Link
					className={cn(
						'inline-block rounded-md bg-primary-500 p-4 text-input transition-colors hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500',
					)}
					href='/'
				>
					Home Page
				</Link>
			</section>
		</>
	);
}
