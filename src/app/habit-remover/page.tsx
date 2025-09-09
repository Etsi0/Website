import { Client } from '@/components/habit-remover/client';
import { pageTitle } from '@/lib/util';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: pageTitle('Habit Remover'),
	description: "Are there something you want to stop doing? Then you can use this to see when you should do that thing or when you shouldn't do that thing",
};

export default function Page() {
	return (
		<section className='mx-auto w-full max-w-7xl space-y-5 px-4 py-16'>
			<div className='text-center'>
				<h1>Habit Remover</h1>
				<p className='mx-auto mb-6'>
					Are there something you want to stop doing?
					<br />
					You can use this page to see when you should or shouldn{"'"}t do that thing
				</p>
			</div>
			<Client />
		</section>
	);
}
