'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/util';

import { DarkMode } from '@/components/Header/darkMode';
import { navLinkJson } from '@/json/header/navLinks';

import { Hamburger, PhadoniaLogo } from '@/components/SVGs';

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

	const [navOpened, setNavOpened] = useState<boolean | undefined>(undefined);
	const [currentPath, setCurrentPath] = useState('');
	function navClick(str: string) {
		setCurrentPath(str);
	}

	const Navigation = (
		<nav
			className={cn(
				'pointer-events-auto float-right h-screen min-w-72 translate-x-full overflow-hidden border-l-[1px] bg-body-100 duration-300',
				(navOpened && 'translate-x-0 transition-transform') ||
					(navOpened === false && 'transition-transform'),
			)}
			aria-label='Main Navigation'
		>
			<ul>
				{navLinkJson.map((link, i) => (
					<li key={link.path}>
						<Link
							tabIndex={
								navOpened
									? currentPath === link.path || (currentPath === '/' && i === 0)
										? -1
										: 0
									: -1
							}
							className={cn(
								`
										block p-3 text-text-700 
										aria-selected:bg-primary-500 aria-selected:text-input 
										[&:not([aria-selected='true'])]:hover:bg-primary-50 [&:not([aria-selected='true'])]:hover:text-primary-600 [&:not([aria-selected='true'])]:focus-visible:bg-primary-50 [&:not([aria-selected='true'])]:focus-visible:text-primary-600 
										dark:[&:not([aria-selected='true'])]:hover:bg-primary-900 dark:[&:not([aria-selected='true'])]:hover:text-primary-400 dark:[&:not([aria-selected='true'])]:focus-visible:bg-primary-900 dark:[&:not([aria-selected='true'])]:focus-visible:text-primary-400
									`,
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
		</nav>
	);

	return (
		<div className={cn('pointer-events-none fixed z-50 w-full')}>
			<header className={cn('pointer-events-auto bg-body-100/90 backdrop-blur-xl')}>
				<div className={cn('mx-auto flex h-16 max-w-7xl items-center justify-between p-3')}>
					{/*==================================================
						Page icon
					==================================================*/}
					<Link href='/'>
						<PhadoniaLogo
							className={cn(
								'aspect-[calc(1000/315.97)/1] h-8 text-body-100 hue-rotate-180 invert',
							)}
						/>
					</Link>
					{/*==================================================
						Hamburger icon
					==================================================*/}
					<div className={cn('flex h-full')}>
						<DarkMode />
						{/* !!! I did not make this hamburgerBtn, https://codepen.io/ainalem/pen/wvKOEMV !!! */}
						<button
							className={cn('group aspect-square h-full')}
							aria-expanded={navOpened}
							onClick={() => setNavOpened(!navOpened)}
						>
							<Hamburger className={cn('text-text-700 group-hover:text-text-300')} />
						</button>
					</div>
				</div>
			</header>
			<hr />
			{/*==================================================
				nav with all the links in it
			==================================================*/}
			{Navigation}
		</div>
	);
}
