'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import navLinks from './navLinks.json';
import DarkMode from './darkMode';

import Hamburger from '@/SVGs/logos/hamburger';
import { MotionNav } from './motionElemets';

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
									text-text-700
									aria-selected:bg-primary-500
									aria-selected:text-input
									[&:not([aria-selected='true'])]:hover:bg-primary-50
									[&:not([aria-selected='true'])]:hover:text-primary-500
									[&:not([aria-selected='true'])]:focus-visible:bg-primary-50
									[&:not([aria-selected='true'])]:focus-visible:text-primary-500
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
			</MotionNav>
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
								group
								h-full
								aspect-square
							'
							aria-expanded={navOpened}
							onClick={() => setNavOpened(!navOpened)}
						>
							<Hamburger svg={'text-text-700 group-hover:text-text-300'} />
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
