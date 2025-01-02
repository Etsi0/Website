import Link from 'next/link';

import { Person } from '@/components/SVGs';
import { A } from '@/components/ui/link';

export default function App() {
	return (
		<>
			<section className='flex grow flex-col items-center justify-center py-16 text-center'>
				<div className='relative'>
					<Person className='absolute left-1/2 h-full translate-x-[-50%] text-primary-700' />
					<h1 className='text-[clamp(1rem,50vw,16rem)] text-primary-500'>404</h1>
				</div>
				<p className='max-w-prose p-4'>Lost your way? No worries, we&apos;ve all been there. Just like our coffee-loving friend here. Let&apos;s guide you home.</p>
				<A href='/' className='rounded-md bg-primary-500 px-[1.5em] py-[0.75em] text-input'>
					Home Page
				</A>
			</section>
		</>
	);
}
