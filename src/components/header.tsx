'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import navLinks from './navLinks.json';
import DarkMode from './darkMode';

import { Hamburger, PhadoniaLogo } from '@/components/SVGs';
import { MotionNav } from './motionElemets';
import { cn } from '@/lib/util';

export default function App() {
	const [isMounted, setMounted] = useState(false);
	const pathname = usePathname();
	useEffect(() => {
		if (isMounted) {
			setCurrentPath(pathname + window.location.hash);
		} else {
			setMounted(true);
		}
	}, [isMounted, pathname]);

	const [navOpened, setNavOpened] = useState(false);
	const [currentPath, setCurrentPath] = useState('');
	function navClick(str: string) {
		setCurrentPath(str);
	}

	function navigation() {
		return (
			<MotionNav
				initial={{
					x: '100%',
				}}
				variants={{
					open: {
						x: 0,
						transition: {
							ease: 'easeInOut',
							duration: 0.25,
						},
					},
					close: {
						x: '100%',
						transition: {
							ease: 'easeInOut',
							duration: 0.25,
						},
					},
				}}
				animate={navOpened ? 'open' : 'close'}
				className='
					pointer-events-auto
					float-right
					h-screen
					min-w-72
					overflow-hidden
					border-l-[1px]
					bg-body
				'
				aria-label='Main Navigation'
			>
				<ul>
					{navLinks.map((link, i) => (
						<li key={link.path}>
							<Link
								tabIndex={
									navOpened
										? currentPath === link.path ||
											(currentPath === '/' && i === 0)
											? -1
											: 0
										: -1
								}
								className={cn(
									`block p-3 text-text-700 
									aria-selected:bg-primary-500 aria-selected:text-input 
									[&:not([aria-selected='true'])]:hover:bg-primary-50 [&:not([aria-selected='true'])]:hover:text-primary-600 [&:not([aria-selected='true'])]:focus-visible:bg-primary-50 [&:not([aria-selected='true'])]:focus-visible:text-primary-600 
									dark:[&:not([aria-selected='true'])]:hover:bg-primary-900 dark:[&:not([aria-selected='true'])]:hover:text-primary-400 dark:[&:not([aria-selected='true'])]:focus-visible:bg-primary-900 dark:[&:not([aria-selected='true'])]:focus-visible:text-primary-400`,
								)}
								href={link.path}
								onClick={() => navClick(link.path)}
								aria-selected={
									currentPath === link.path || (currentPath === '/' && i === 0)
								}
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</MotionNav>
		);
	}

	return (
		<div
			className='
				pointer-events-none
				fixed
				z-50
				w-full
			'
		>
			<header
				className='
					bg-body/90
					pointer-events-auto
					backdrop-blur-xl
				'
			>
				<div
					className='
						mx-auto
						flex
						h-16
						max-w-7xl
						items-center
						justify-between
						p-3
					'
				>
					{/*==================================================
						Page icon
					==================================================*/}
					<Link href='/'>
						<PhadoniaLogo className='aspect-[calc(1000/315.97)/1] h-8 text-body hue-rotate-180 invert' />
					</Link>
					{/*==================================================
						Hamburger icon
					==================================================*/}
					<div
						className='
							flex
							h-full
						'
					>
						<DarkMode />
						{/* !!! I did not make this hamburgerBtn, https://codepen.io/ainalem/pen/wvKOEMV !!! */}
						<button
							className='
								group
								aspect-square
								h-full
							'
							aria-expanded={navOpened}
							onClick={() => setNavOpened(!navOpened)}
						>
							<Hamburger className={'text-text-700 group-hover:text-text-300'} />
						</button>
					</div>
				</div>
				<hr />
			</header>
			{/*==================================================
				nav with all the links in it
			==================================================*/}
			{navigation()}
		</div>
	);
}
