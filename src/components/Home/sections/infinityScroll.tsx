'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Icon from '@/../public/img/production/icon.png';

const array = [Icon, Icon, Icon, Icon, Icon, Icon, Icon, Icon, Icon, Icon];
const duration = 60;

let arrayLen = 0;
for (const item of array) {
	arrayLen += (item.height / item.width) * 100;
}

export function InfinityScroll() {
	const refContainer = useRef(null);
	const { contextSafe } = useGSAP({ scope: refContainer });

	const onResize = contextSafe(() => {
		array.forEach((_, index) => {
			gsap.killTweensOf(`.horizontalScroll-${index}`);
		});

		array.forEach((item, index) => {
			gsap.fromTo(
				`.horizontalScroll-${index}`,
				{
					x: Math.max(arrayLen, document.documentElement.clientWidth),
				},
				{
					ease: 'none',
					delay: (duration / 8) * (8 - index) * -1,
					duration: duration,
					repeat: -1,
					x: -item.width,
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

	return (
		<>
			<section
				className='my-12 h-[132px] bg-body-50 py-4 shadow-[0_0_0_100vmax_hsl(var(--body-color-50))] [clip-path:inset(0_-100vmax)] dark:bg-body-200 dark:shadow-[0_0_0_100vmax_hsl(var(--body-color-200))]'
				ref={refContainer}
			>
				{array.map((item, index) => (
					<Image
						alt={`Gray scale version of a companies logo`}
						blurDataURL={item.blurDataURL}
						className={`horizontalScroll-${index} absolute left-0 opacity-75 grayscale`}
						height={100}
						key={index}
						placeholder='blur'
						src={item}
						width={(item.height / item.width) * 100}
					/>
				))}
			</section>
		</>
	);
}
