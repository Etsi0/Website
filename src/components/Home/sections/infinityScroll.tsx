'use client';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/util';
import Image, { type StaticImageData } from 'next/image';
import gsap from 'gsap';

/**
 *
 * @param className - An array with classes. index 0 is for the parent and index 1 is for all the images
 * @param duration - How much time it should take for an item to get from one end of the container to the other one in seconds. for example, 75
 * @param gap - How much space it should be in between images. for example, 50px
 * @param images - All the images you want to display in the horisontal scroller
 * @param size - The size you want the images to be. for example, 100px x 100px
 * @returns
 */
export function InfinityScroll({
	className,
	duration,
	gap,
	images,
	size,
}: {
	className: string[];
	duration: number;
	gap: number;
	images: (any | StaticImageData)[];
	size: number;
}) {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const refContainer = useRef<HTMLElement>(null);
	const { contextSafe } = useGSAP({ scope: refContainer });

	/*==================================================
		Helpers
	==================================================*/
	function GetSize(height: number, width: number): { height: number; width: number } {
		const finalHeight = (height / width) * size;
		if (finalHeight <= size) {
			return { height: finalHeight, width: size };
		} else {
			return { height: size, width: (width / height) * size };
		}
	}

	function Position(index: number): number {
		return (size + gap) * index;
	}

	const totalWidth = Position(images.length);
	const durationPerPx = (refContainer.current?.clientWidth || duration) / duration;
	const finalDuration = Math.max(duration, totalWidth / durationPerPx);

	/*==================================================
		Animation
	==================================================*/
	function AnimationDelay(index: number): number {
		return ((finalDuration * Position(images.length - 1 - index)) / totalWidth) * -1;
	}

	function Segment(index: number): string {
		return `((max(${totalWidth}px, 100%) * ${Position(index)}) / ${totalWidth})`;
	}

	function FallbackPosition(index: number): string {
		return `calc(${Segment(index)} + ${Segment(1)} / ${images.length})`;
	}

	/*==================================================
		GSAP
	==================================================*/
	const onResize = contextSafe(() => {
		images.forEach((_, index) => {
			gsap.killTweensOf(`.horizontalScroll-${index}`);
		});

		images.forEach((_, index) => {
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
	});

	useEffect(() => {
		onResize();

		window.addEventListener('resize', () => onResize());

		return () => {
			window.removeEventListener('resize', () => onResize());
		};
	}, [onResize]);

	/*==================================================
		Mount
	==================================================*/
	useEffect(() => {
		setIsMounted(true);
	}, []);

	/*==================================================
		XML
	==================================================*/
	return (
		<>
			<section
				className='my-12 bg-body-50 py-4 shadow-[0_0_0_100vmax_hsl(var(--body-color-50))] [clip-path:inset(0_-100vmax)] dark:bg-body-200 dark:shadow-[0_0_0_100vmax_hsl(var(--body-color-200))]'
				id='experience'
				ref={refContainer}
			>
				<div
					className={cn(
						'relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_25px,_black_calc(100%-25px),transparent_100%)]',
						className[0]
					)}
				>
					{images.map((item, index) => {
						const { height, width } = GetSize(item.height, item.width);
						return (
							<div
								className={cn(
									`horizontalScroll-${index} absolute left-0 grid place-items-center opacity-75 grayscale`,
									className[1]
								)}
								key={index}
								style={{
									left: !isMounted ? FallbackPosition(index) : '',
								}}
							>
								<Image
									alt={`Gray scale version of a company logo`}
									height={height}
									src={item}
									width={width}
								/>
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
}
