import { connection } from 'next/server'
import { Suspense } from 'react'
import { LinkButton } from '@/components/ui/link';

function Skeleton() {
	'use client'

	return (
		<>
			<hr />
			<footer className='bg-primary-500 text-primary-50 space-y-8 p-16'>
				<ul className='grid lg:flex justify-center gap-6 max-w-max text-center mx-auto'>
					{[{
						path: '/',
						name: 'Home',
					},
					{
						path: '/habit-remover',
						name: 'Habit Remover',
					},
					{
						path: '/minecraft',
						name: 'Minecraft Mods',
					},
					{
						path: '/pomodoro',
						name: 'Pomodoro',
					},
					// {
					// 	path: '/settings/firefox',
					// 	name: 'Firefox Settings',
					// },
					{
						path: '/settings/vscode',
						name: 'VSCode Settings',
					}].map((item, i) => (
						<li key={i}><LinkButton href={item.path}>{item.name}</LinkButton></li>
					))}
				</ul>
				<div className='grid justify-items-center'>
					<p>Loading...</p>
				</div>
			</footer>
		</>
	);
}

async function Content() {
	'use server'
	await connection();
	const now = new Date();

	return (
		<>
			<hr />
			<footer className='bg-primary-500 text-primary-50 space-y-8 p-16'>
				<ul className='grid lg:flex justify-center gap-6 max-w-max text-center mx-auto'>
					{[{
						path: '/',
						name: 'Home',
					},
					{
						path: '/habit-remover',
						name: 'Habit Remover',
					},
					{
						path: '/minecraft',
						name: 'Minecraft Mods',
					},
					{
						path: '/pomodoro',
						name: 'Pomodoro',
					},
					// {
					// 	path: '/settings/firefox',
					// 	name: 'Firefox Settings',
					// },
					{
						path: '/settings/vscode',
						name: 'VSCode Settings',
					}].map((item, i) => (
						<li key={i}><LinkButton href={item.path}>{item.name}</LinkButton></li>
					))}
				</ul>
				<div className='grid justify-items-center'>
					<p>© {now.getFullYear()} Phadonia</p>
				</div>
			</footer>
		</>
	);
}

export default function Footer() {
	return (
		<Suspense fallback={<Skeleton />}>
			<Content />
		</Suspense>
	);
}
