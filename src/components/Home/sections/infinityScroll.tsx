'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Icon from '@/../public/img/production/icon.png';

/*==================================================
	Image
==================================================*/
const imageHeight = 100;
function GetWidth(height: number, width: number): number {
	return (height / width) * imageHeight;
}

/*==================================================
	Array
==================================================*/
const array = [Icon, Icon, Icon, Icon, Icon, Icon, Icon, Icon, Icon, Icon];
const arrayWidth = array.reduce((accumulator, currentValue) => {
	accumulator += GetWidth(currentValue.height, currentValue.width);
	return accumulator;
}, 0);

/*==================================================
	Animation
==================================================*/
const duration = array.length * 10;
const AnimationDelay = (index: number) =>
	(duration / array.length) * (array.length - (index + 1)) * -1;
const ifJsIsDisabled = (index: number) =>
	`calc((max(${arrayWidth}px, 100%) / ${array.length}) * ${index})`;

/*==================================================
	Main
==================================================*/
export function InfinityScroll() {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const refContainer = useRef<HTMLElement>(null);
	const { contextSafe } = useGSAP({ scope: refContainer });

	const onResize = contextSafe(() => {
		array.forEach((_, index) => {
			gsap.killTweensOf(`.horizontalScroll-${index}`);
		});

		array.forEach((item, index) => {
			gsap.fromTo(
				`.horizontalScroll-${index}`,
				{
					x: Math.max(arrayWidth, refContainer.current?.clientWidth || 0),
				},
				{
					ease: 'none',
					delay: AnimationDelay(index),
					duration: duration,
					repeat: -1,
					x: -GetWidth(item.height, item.width),
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
					{array.map((item, index) => (
						<Image
							alt={`Gray scale version of a companies logo`}
							blurDataURL={item.blurDataURL}
							className={`horizontalScroll-${index} absolute left-0 opacity-75 grayscale`}
							height={imageHeight}
							key={index}
							placeholder='blur'
							src={item}
							style={{
								left: !isMounted ? ifJsIsDisabled(index) : '',
							}}
							width={GetWidth(item.height, item.width)}
						/>
					))}
				</div>
			</section>
		</>
	);
}
