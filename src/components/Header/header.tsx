'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import PhadoniaLogo from '@/svg/phadonia.svg';
import { DarkMode } from '@/components/Header/darkMode';
import { Navigation } from '@/components/Header/navbar';
import { LinkButton } from '@/components/ui/link';
import { Hamburger } from '@/components/Hamburger';

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
		<>
			<header className='pointer-events-none fixed z-50 w-full' ref={headerRef}>
				<div className='pointer-events-auto bg-body-100/90 backdrop-blur-xl'>
					<div className='mx-auto flex h-16 max-w-7xl items-center justify-between p-3'>
						{/*==================================================
							Page icon
						==================================================*/}
						<LinkButton href='/' aria-label='Phadonia'>
							<PhadoniaLogo className='h-8 *:fill-[oklch(from_var(--color-body-100)_calc(1.05_-_l)_c_h)]' />
						</LinkButton>
						{/*==================================================
							Hamburger icon
						==================================================*/}
						<div className='flex h-full gap-[4px]'>
							<DarkMode />
							{/* !!! I did not make this hamburgerBtn, https://codepen.io/ainalem/pen/wvKOEMV !!! */}
							<LinkButton
								className='hamburger-button aspect-square h-full rounded-md'
								aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
								aria-expanded={isNavOpen}
								onClick={() => setIsNavOpen((current) => !current)}
							>
								<Hamburger className='text-text-900' />
							</LinkButton>
						</div>
					</div>
				</div>
				<hr />
				{/*==================================================
					nav with all the links in it
				==================================================*/}
				<Navigation
					setIsNavOpen={setIsNavOpen}
					isNavOpen={isNavOpen}
					setCurrentPath={setCurrentPath}
					currentPath={currentPath}
					ref={headerRef}
				/>
			</header>
		</>
	);
}
