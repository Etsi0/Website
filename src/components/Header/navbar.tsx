'use client'
import { LinkButton } from "@/components/ui/link";
import { navLinks } from "@/json/navLinks";
import { cn } from "@/lib/util";
import { useGSAP } from "@gsap/react";
import { CustomEase } from 'gsap/CustomEase';
import { RefObject, SetStateAction, useCallback, useEffect, useRef } from "react";
import gsap from 'gsap';

gsap.registerPlugin(CustomEase);
CustomEase.create('custom', '0.4, 0, 0.2, 1');

type TNavigation = {
	ref: RefObject<HTMLDivElement | null>;
	setCurrentPath: (value: SetStateAction<string>) => void;
	currentPath: string;
	setIsNavOpen: (value: SetStateAction<boolean | undefined>) => void;
	isNavOpen: boolean | undefined;
}

export function Navigation({ref, setCurrentPath, currentPath, setIsNavOpen, isNavOpen}: TNavigation) {
	const navContainer = useRef<HTMLDivElement>(null);
	const { contextSafe } = useGSAP({ scope: ref });

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
	}, [setIsNavOpen, isNavOpen, navAnimation]);

	function navClick(str: string) {
		setCurrentPath(str);
		setIsNavOpen(false);
	}

	const isActive = useCallback((path: string) => {
		return currentPath === path || (
			['', '/'].includes(currentPath) && path === '/#home'
		);
	}, [currentPath]);

	return (
		<nav aria-label='Main Navigation' className='HeaderMainNav pointer-events-auto float-right h-screen min-w-72 translate-x-full overflow-hidden border-l bg-body-100' ref={navContainer}>
			<ul>
				{navLinks.internal.map((link) => (
					<li key={link.path}>
						<LinkButton
							tabIndex={
								isNavOpen
									? isActive(link.path)
										? -1
										: 0
									: -1
							}
							className={cn(
								'block p-3 text-text-900',
								isActive(link.path) && 'bg-primary-500 text-primary-50',
								!isActive(link.path) && 'hover:bg-primary-50 hover:text-primary-600 focus-visible:bg-primary-50 focus-visible:text-primary-600 dark:hover:bg-primary-800 dark:hover:text-primary-400 dark:focus-visible:bg-primary-800 dark:focus-visible:text-primary-400'
							)}
							href={link.path}
							onClick={() => navClick(link.path)}
							isButton
						>
							{link.name}
						</LinkButton>
					</li>
				))}
			</ul>
		</nav>
	);
}