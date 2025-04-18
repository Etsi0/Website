'use client';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/util';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import Link from 'next/link';

import PhadoniaLogo from '@/svg/phadonia.svg';
import { DarkMode } from '@/components/Header/darkMode';
import { navLinkJson } from '@/json/header/navLinks';
import { Button } from '@/components/ui/button';
import { A } from '@/components/ui/link';
import { Hamburger } from '@/components/Hamburger';

gsap.registerPlugin(CustomEase);
CustomEase.create('custom', '0.4, 0, 0.2, 1');

export default function App() {
	const [isMounted, setMounted] = useState<boolean>(false);
	const [isNavOpen, setIsNavOpen] = useState<boolean | undefined>(undefined);
	const [currentPath, setCurrentPath] = useState<string>('');
	const pathname = usePathname();

	const gsapContainer = useRef<HTMLDivElement>(null);
	const navContainer = useRef<HTMLDivElement>(null);
	const { contextSafe } = useGSAP({ scope: gsapContainer });

	useEffect(() => {
		if (isMounted) {
			setCurrentPath(pathname + window.location.hash);
		} else {
			setMounted(true);
		}
	}, [isMounted, pathname]);

	const navAnimation = contextSafe(() => {
		// if isNavOpen true it's about to open, and it it's false it's about to close
		const navWidth = navContainer.current?.clientWidth;
		const [start, end] = isNavOpen ? [navWidth, 0] : [0, navWidth];

		gsap.fromTo(
			'.HeaderMainNav',
			{
				x: start,
			},
			{
				ease: 'custom',
				duration: 0.3,
				x: end,
			}
		);
	});

	useEffect(() => {
		if (isNavOpen !== undefined) {
			navAnimation();
		}

		if (!isNavOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (event.button !== 0) return;

			const target = event.target as Node;
			const nav = navContainer.current;
			const hamburger = document.querySelector('.hamburger-button');

			if (nav && !nav.contains(target) && !hamburger?.contains(target)) {
				setIsNavOpen(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsNavOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isNavOpen, navAnimation]);

	function Navigation() {
		function navClick(str: string) {
			setCurrentPath(str);
			setIsNavOpen(false);
		}

		return (
			<nav aria-label='Main Navigation' className='HeaderMainNav pointer-events-auto float-right h-screen min-w-72 translate-x-full overflow-hidden border-l bg-body-100' ref={navContainer}>
				<ul>
					{navLinkJson.map((link, i) => (
						<li key={link.path}>
							<Link
								tabIndex={isNavOpen ? (currentPath === link.path || (currentPath === '/' && i === 0) ? -1 : 0) : -1}
								className={cn(
									'block p-3 text-text-700',
									((currentPath === link.path || (currentPath === '/' && i === 0)) && 'bg-primary-500 text-input') ||
										'hover:bg-primary-50 hover:text-primary-600 focus-visible:bg-primary-50 focus-visible:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-400 dark:focus-visible:bg-primary-900 dark:focus-visible:text-primary-400'
								)}
								href={link.path}
								onClick={() => navClick(link.path)}
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		);
	}

	return (
		<>
			<header className='pointer-events-none fixed z-50 w-full' ref={gsapContainer}>
				<div className='bg-body-100/90 pointer-events-auto backdrop-blur-xl'>
					<div className='mx-auto flex h-16 max-w-7xl items-center justify-between p-3'>
						{/*==================================================
							Page icon
						==================================================*/}
						<A href='/' aria-label='Phadonia'>
							<PhadoniaLogo className='h-8 *:fill-[hsl(from_var(--color-body-100)_h_s_calc(105_-_l))]' />
						</A>
						{/*==================================================
							Hamburger icon
						==================================================*/}
						<div className='flex h-full gap-[4px]'>
							<DarkMode />
							{/* !!! I did not make this hamburgerBtn, https://codepen.io/ainalem/pen/wvKOEMV !!! */}
							<Button
								className='hamburger-button aspect-square h-full rounded-md'
								focusable={false}
								aria-label='Hamburger menu'
								aria-expanded={isNavOpen}
								onClick={() => setIsNavOpen((current) => !current)}
							>
								<Hamburger className='text-text-700' />
							</Button>
						</div>
					</div>
				</div>
				<hr />
				{/*==================================================
					nav with all the links in it
				==================================================*/}
				<Navigation />
			</header>
		</>
	);
}
