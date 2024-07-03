'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Icon from '@/../public/img/production/icon.png';
import Farsight from '@/../public/img/production/companies/Farsight.webp';
import HCLTech from '@/../public/img/production/companies/HCLTech.svg';

/*==================================================
	Image
==================================================*/
const imageWidth = 100;
function GetHeight(height: number, width: number): number {
	return (height / width) * imageWidth;
}

/*==================================================
Array
==================================================*/
const images = [Icon, Farsight, HCLTech, Icon, Farsight, HCLTech, Icon, Farsight, HCLTech];
const gap = 50;
function Position(index: number): number {
	return (imageWidth + gap) * index;
}
const totalWidth = Position(images.length);

/*==================================================
	Animation
==================================================*/
const duration = 90;
function AnimationDelay(index: number): number {
	return ((duration * Position(images.length - 1 - index)) / totalWidth) * -1;
}
function Segment(index: number): string {
	return `((max(${totalWidth}px, 100%) * ${Position(index)}) / ${totalWidth})`;
}
function FallbackPosition(index: number): string {
	return `calc(${Segment(index)} + ${Segment(1)} / ${images.length})`;
}

/*==================================================
	Main
==================================================*/
export function InfinityScroll() {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const refContainer = useRef<HTMLElement>(null);
	const { contextSafe } = useGSAP({ scope: refContainer });

	const onResize = contextSafe(() => {
		images.forEach((_, index) => {
			gsap.killTweensOf(`.horizontalScroll-${index}`);
		});

		images.forEach((item, index) => {
			gsap.fromTo(
				`.horizontalScroll-${index}`,
				{
					x: Math.max(totalWidth, refContainer.current?.clientWidth || 0),
				},
				{
					ease: 'none',
					delay: AnimationDelay(index),
					duration: duration,
					repeat: -1,
					x: -imageWidth,
				}
			);
		});
	});

	useEffect(() => {
		onResize();

		window.addEventListener('resize', () => onResize());

		return () => {
			window.removeEventListener('resize', () => onResize());
		};
	}, [onResize]);

	useEffect(() => {
		setIsMounted(true);
	}, [setIsMounted]);

	return (
		<>
			<section
				className='my-12 bg-body-50 py-4 shadow-[0_0_0_100vmax_hsl(var(--body-color-50))] [clip-path:inset(0_-100vmax)] dark:bg-body-200 dark:shadow-[0_0_0_100vmax_hsl(var(--body-color-200))]'
				id='experience'
				ref={refContainer}
			>
				<div className='relative h-[100px] overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_25px,_black_calc(100%-25px),transparent_100%)]'>
					{images.map((item, index) => (
						<Image
							alt={`Gray scale version of a companies logo`}
							className={`horizontalScroll-${index} absolute left-0 opacity-75 grayscale [&:not(:nth-child(3n_+_1))]:brightness-[1000]`}
							height={GetHeight(item.height, item.width)}
							key={index}
							src={item}
							style={{
								left: !isMounted ? FallbackPosition(index) : '',
								top: `${(100 - GetHeight(item.height, item.width)) / 2}px`,
							}}
							width={imageWidth}
						/>
					))}
				</div>
			</section>
		</>
	);
}
