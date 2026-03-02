'use client';
import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/util';
import Image, { type StaticImageData } from 'next/image';
import gsap from 'gsap';

/**
 *
 * @param className - An array with classes. index 0 is for the parent and index 1 is for all the images
 * @param pxPerSec - How many px it will move per second. for example, 15
 * @param gap - How much space it should be in between images. for example, 50px
 * @param images - All the images you want to display in the horisontal scroller
 * @param size - The size you want the images to be. for example, 100px x 100px
 * @returns
 */
export function InfinityScroll({
	className,
	pxPerSec,
	gap,
	images,
	size,
}: {
	className: string[];
	pxPerSec: number;
	gap: number;
	images: StaticImageData[];
	size: number;
}) {
	const emptySubscribe = useCallback(() => () => {}, []);
	const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
	const refContainer = useRef<HTMLSelectElement>(null);
	const imagesRef = useRef(images);
	const { contextSafe } = useGSAP({ scope: refContainer });
	useEffect(() => {
		imagesRef.current = images;
	}, [images]);
	const totalWidth = Position(images.length);
	const finalDuration: number = 1280/pxPerSec; /* 15px per sec if content section is at max width */

	/*==================================================
		Helpers
	==================================================*/
	function Position(index: number): number {
		return (size + gap) * index;
	}

	/*==================================================
		Animation
	==================================================*/
	function Segment(index: number): string {
		return `((max(${totalWidth}px, 100%) * ${Position(index)}) / ${totalWidth})`;
	}

	function FallbackPosition(index: number): string {
		return `calc(${Segment(index)} + ${Segment(1)} / ${images.length})`;
	}

	/*==================================================
		GSAP
	==================================================*/
	useEffect(() => {
		function runResize() {
			const currentImages = imagesRef.current;
			function PositionLocal(index: number): number {
				return (size + gap) * index;
			}

			function AnimationDelay(index: number): number {
				return ((finalDuration * PositionLocal(currentImages.length - 1 - index)) / totalWidth) * -1;
			}

			currentImages.forEach((_, index) => {
				gsap.killTweensOf(`.horizontalScroll-${index}`);
			});

			currentImages.forEach((_, index) => {
				gsap.fromTo(
					`.horizontalScroll-${index}`,
					{
						x: Math.max(totalWidth, refContainer.current?.clientWidth || 0),
					},
					{
						ease: 'none',
						delay: AnimationDelay(index),
						duration: finalDuration,
						repeat: -1,
						x: -size,
					}
				);
			});
		}

		const safeOnResize = contextSafe(runResize);
		safeOnResize();

		const handleResize = () => safeOnResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [contextSafe, totalWidth, finalDuration, size, gap]);

	/*==================================================
		XML
	==================================================*/
	return (
		<section
			id='experience'
			className={cn('overflow-clip relative my-16 mask-[linear-gradient(to_right,transparent_0,black_1.5rem,black_calc(100%-1.5rem),transparent_100%)]', className[0])}
			ref={refContainer}
		>
			{images.map((item, index) => (
				<Image
					key={index}
					className={cn(`horizontalScroll-${index} object-contain absolute left-0 opacity-75 grayscale`, className[1])}
					style={{left: isMounted ? '' : FallbackPosition(index)}}
					src={item}
					alt="Gray scale version of a company logo"
					height={size}
					width={size}
				/>
			))}
		</section>
	);
}
