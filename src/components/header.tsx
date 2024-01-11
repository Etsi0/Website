'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import navLinks from './navLinks.json';
import DarkMode from './darkMode';

export default function App() {
	const [isMounted, setMounted] = useState(false);
	useEffect(() => {
		if (isMounted) {
			setCurrentPath(pathname + window.location.hash);
		} else {
			setMounted(true);
		}
	}, [isMounted]);
	{
		/*==================================================
			Gets the page you are on
		==================================================*/
	}
	const pathname = usePathname();
	const [currentPath, setCurrentPath] = useState('');
	function navClick(str: string) {
		setCurrentPath(str);
	}

	{
		/*==================================================
			Changes the state of the hamburger icon
		==================================================*/
	}
	const [navOpened, setNavOpened] = useState(false);
	const [NavTransform, setNavTransform] = useState('100%');
	function hamburgerBtnClick() {
		setNavTransform(navOpened ? `100%` : `0`);
		setNavOpened(!navOpened);
	}

	{
		/*==================================================
			Styling for my hamburgerBtn
		==================================================*/
	}
	const hamburgerPathStyle = `
		stroke-text-darker
		transition-all
		duration-500
	`;

	{
		/*==================================================
			Navbar that pops up when you press on the hamburgerBtn
		==================================================*/
	}
	function navigation() {
		return (
			<nav
				style={{ transform: `translateX(${NavTransform})` }}
				className='
					overflow-hidden
					bg-body
					min-w-72
					h-screen
					float-right
					border-l-[1px]
					pointer-events-auto
				'
				aria-label='Main Navigation'
			>
				<ul>
					{navLinks.map((link, i) => (
						<li key={link.path}>
							<Link
								tabIndex={navOpened ? 0 : -1}
								className={`
									block
									p-3
									text-text-darker
									aria-selected:bg-main
									aria-selected:text-input
									[&:not([aria-selected='true'])]:hover:bg-main-lighter
									[&:not([aria-selected='true'])]:hover:text-main-darker
									[&:not([aria-selected='true'])]:focus-visible:bg-main-lighter
									[&:not([aria-selected='true'])]:focus-visible:text-main-darker
								`}
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
	}

	return (
		<div
			className='
				fixed
				w-full
				z-50
				pointer-events-none
			'
		>
			<header
				className='
					pointer-events-auto
					bg-body
				'
			>
				<div
					className='
						flex
						justify-between
						max-w-7xl
						h-16
						p-3
						mx-auto
					'
				>
					{/*==================================================
						Page icon
					==================================================*/}
					<Link
						className='
							h-full
						'
						href='/'
					>
						<Image
							className='
								h-full
							'
							src={'/img/unedited SVGs/phadoniaLogoRightPalette.svg'}
							alt='Logo'
							width={40}
							height={40}
							blurDataURL='data:...'
							placeholder='blur'
						/>
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
								h-full
								aspect-square
							'
							aria-expanded={navOpened}
							onClick={hamburgerBtnClick}
						>
							<svg
								className='
									hamburger
									scale-125
									pointer-events-none
								'
								viewBox='0 0 100 100'
								fill='none'
							>
								<path
									className={`
										${hamburgerPathStyle}
										path1
									`}
									stroke='#5757e0'
									strokeWidth='6.4px'
									d='M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058'
								/>
								<path
									className={`
										${hamburgerPathStyle}
										path2
									`}
									stroke='#5757e0'
									strokeWidth='6.4px'
									d='M 20,50 H 80'
								/>
								<path
									className={`
										${hamburgerPathStyle}
										path3
									`}
									stroke='#5757e0'
									strokeWidth='6.4px'
									d='M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942'
								/>
							</svg>
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
