'use client';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/util';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

import { PhadoniaLogo } from '@/components/SVGs';
import { DarkMode } from '@/components/Header/darkMode';
import { navLinkJson } from '@/json/header/navLinks';
import { A } from '@/components/ui/link';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function App() {
	const [isMounted, setMounted] = useState<boolean>(false);
	const [isNavOpen, setIsNavOpen] = useState<boolean | undefined>(undefined);
	const [currentPath, setCurrentPath] = useState<string>('');
	const pathname = usePathname();

	const gsapContainer = useRef<HTMLDivElement>(null);
	const navContainer = useRef<HTMLDivElement>(null);
	const { contextSafe } = useGSAP({ scope: gsapContainer });

	useEffect(() => {
		gsap.registerPlugin(CustomEase);
		CustomEase.create('custom', '0.4, 0, 0.2, 1');
	}, []);

	useEffect(() => {
		if (!isMounted) {
			setMounted(true);
		}
		setCurrentPath(pathname + window.location.hash);
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
	}, [isNavOpen, navAnimation]);

	useEffect(() => {
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
	}, [isNavOpen]);

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

	const hamburgerPathStyle = 'transition-[stroke-dashoffset,_stroke-dasharray] duration-500';

	return (
		<>
			<header className='pointer-events-none fixed z-50 w-full' ref={gsapContainer}>
				<div className='pointer-events-auto bg-body-100/90 backdrop-blur-xl'>
					<div className='mx-auto flex h-16 max-w-7xl items-center justify-between p-3'>
						{/*==================================================
							Page icon
						==================================================*/}
						<A href='/' aria-label='Phadonia'>
							<PhadoniaLogo className='h-8 text-[hsl(from_hsl(var(--body-color-100))_h_s_calc(100_-_l))]' />
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
								<svg className={cn('scale-125 text-text-700')} fill='none' stroke='currentColor' strokeWidth={6.4} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
									<path
										className={cn('path1', hamburgerPathStyle)}
										d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
									/>
									<path className={cn('path2', hamburgerPathStyle)} d='M 20,50 H 80' />
									<path
										className={cn('path3', hamburgerPathStyle)}
										d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
									/>
								</svg>
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
