import { connection } from 'next/server'
import { Suspense } from 'react'
import { LinkButton } from '@/components/ui/link';

const links = [
	{ path: '/', name: 'Home' },
	{ path: '/habit-remover', name: 'Habit Remover' },
	{ path: '/minecraft', name: 'Minecraft Mods' },
	{ path: '/pomodoro', name: 'Pomodoro' },
	{ path: '/settings/vscode', name: 'VSCode Settings' },
]

async function DynamicCopyright() {
	'use server'
	await connection();
	return (
		<p>© {new Date().getFullYear()} Phadonia</p>
	);
}

export default function Footer() {
	return (
		<>
			<hr />
			<footer className='bg-primary-500 text-primary-50 space-y-8 p-16'>
				<ul className='grid lg:flex justify-center gap-6 max-w-max text-center mx-auto'>
					{links.map((item, i) => (
						<li key={i}>
							<LinkButton href={item.path}>{item.name}</LinkButton>
						</li>
					))}
				</ul>
				<div className='grid justify-items-center'>
					<Suspense fallback={<p>Loading...</p>}>
						<DynamicCopyright />
					</Suspense>
				</div>
			</footer>
		</>
	);
}
