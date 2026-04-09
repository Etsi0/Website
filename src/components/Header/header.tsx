'use client';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import PhadoniaLogo from '@/svg/phadonia.svg';
import { DarkMode } from '@/components/Header/darkMode';
import { LinkButton } from '@/components/ui/link';

const link: Record<string, string> = {
	About: '/about',
	Settings: '/settings/vscode',
	'Minecraft Mods': '/minecraft',
	Pomodoro: '/pomodoro',
};

/* max(logo, themeSwitcher) * 2 + nav + gap * 2 = calc(1rem * (max(75.95, 24) * 2 + 358.567) / 16 + 2rem * 2) ≈ 36rem */
const wrapperClass = '@[36rem]:grid-cols-[1fr_auto_1fr] @[36rem]:gap-0';
const hamburgerClass = '@[36rem]:hidden';
const navWrapper = '@[36rem]:contents';
const navClass = '@[36rem]:flex';

export function Header() {
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
	const headerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const header = headerRef.current;
		if (!header) return;
		const handler = () => setIsNavOpen(header.matches(':popover-open'));
		header.addEventListener('toggle', handler);
		return () => header.removeEventListener('toggle', handler);
	}, []);

	return (
		<header ref={headerRef} id="header" className='breakout-wrapper [--header-height:1.5rem] bg-transparent w-full top-7.5 z-50 [&:popover-open_>_div]:grid-rows-[1fr]' popover="">
			<div
				className='col-sm @container overflow-clip relative grid grid-rows-[0fr] px-[calc(var(--header-height)*1.5)] py-[calc(var(--header-height)*0.75)] corner-shape-6 transition-[grid-template-rows] duration-300 h-fit'
			>
				<div className='absolute bg-body-50/25 w-screen h-[200%] left-1/2 top-0 border border-body-50/25 -translate-x-1/2 -translate-y-1/4 backdrop-blur-xl -z-10'></div>
				<div className={cn('grid items-center gap-8 min-h-(--header-height)', wrapperClass)}>
					<div className='flex items-center justify-between'>
						<LinkButton
							className='rounded-xs outline-offset-4'
							href='/'
							aria-label='Phadonia'
						>
							<PhadoniaLogo className='h-(--header-height) *:fill-text-900' />
						</LinkButton>
						{/* !!! I did not make this hamburgerBtn, https://codepen.io/ainalem/pen/wvKOEMV !!! */}
						<LinkButton
							className={cn('hamburger-button rounded-sm', hamburgerClass)}
							aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={isNavOpen}
							onClick={() => setIsNavOpen((prev) => !prev)}
							command="toggle-popover"
							commandfor="header"
						>
							<svg
								className='size-(--header-height) scale-150 text-text-900 *:transition-[stroke-dashoffset,stroke-dasharray] *:duration-500'
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
					<div className={cn('flex justify-between items-end', navWrapper)}>
						<nav aria-label='Main navigation'>
							<ul className={cn('grid gap-x-6 gap-y-4', navClass)}>
								{Object.entries(link).map(([label, path]) => (
									<li key={label}>
										<LinkButton className='text-text-800 rounded-xs outline-offset-4' href={path}>
											{label}
										</LinkButton>
									</li>
								))}
							</ul>
						</nav>
						<div className='justify-self-end [&_svg]:size-(--header-height)'>
							<DarkMode />
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
