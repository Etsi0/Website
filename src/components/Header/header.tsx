'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import PhadoniaLogo from '@/svg/phadonia.svg';
import { DarkMode } from '@/components/Header/darkMode';
import { Navigation } from '@/components/Header/navbar';
import { LinkButton } from '@/components/ui/link';

export default function App() {
	const [isNavOpen, setIsNavOpen] = useState<boolean | undefined>(undefined);
	const [currentPath, setCurrentPath] = useState<string>('');
	const headerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	useEffect(() => {
		if (window.location.hash) {
			setCurrentPath(pathname + window.location.hash);
			console.log(pathname + window.location.hash);
		}
	}, [pathname]);

	return (
		<div className='breakout-wrapper text-[1.5rem] fixed w-full left-1/2 -translate-x-1/2 translate-y-1/2 z-50'>
			<header className='grid grid-cols-[1fr_auto_1fr] items-end bg-body-50/25 max-w-7xl px-[1.5em] py-[0.75em] border border-body-50/25 rounded-[1em] backdrop-blur-xl' ref={headerRef}>
				{/*==================================================
					Page icon
				==================================================*/}
				<LinkButton href='/' aria-label='Phadonia'>
					<PhadoniaLogo className='h-[1em] *:fill-text-900' />
				</LinkButton>
				{/*==================================================
					Hamburger icon
				==================================================*/}
				<div></div>
				<div className='justify-self-end flex h-full gap-1'>
					<DarkMode />
					{/* !!! I did not make this hamburgerBtn, https://codepen.io/ainalem/pen/wvKOEMV !!! */}
					<LinkButton
						className='hamburger-button cursor-pointer grid place-items-center h-full aspect-square *:col-1 *:row-1'
						aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={isNavOpen}
						onClick={() => setIsNavOpen((current) => !current)}
					>
						<svg
							className='text-text-900 h-[150%] pointer-events-none *:transition-[stroke-dashoffset,stroke-dasharray] *:duration-500'
							viewBox='0 0 100 100'
							xmlns='http://www.w3.org/2000/svg'
							stroke='currentColor'
							strokeWidth={6.4}
							fill='none'
						>
							<path
								className='path1'
								d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
							/>
							<path className='path2' d='M 20,50 H 80' />
							<path
								className='path3'
								d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
							/>
						</svg>
					</LinkButton>
				</div>
				{/*==================================================
					nav with all the links in it
				==================================================*/}
				{/* <Navigation
					setIsNavOpen={setIsNavOpen}
					isNavOpen={isNavOpen}
					setCurrentPath={setCurrentPath}
					currentPath={currentPath}
					ref={headerRef}
				/> */}
			</header>
		</div>
	);
}
