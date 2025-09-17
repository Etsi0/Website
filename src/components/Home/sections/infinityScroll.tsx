'use client';
import { useEffect, useRef, useState } from 'react';
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
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const refContainer = useRef<HTMLDivElement>(null);
	const { contextSafe } = useGSAP({ scope: refContainer });
	const totalWidth = Position(images.length);
	const finalDuration: number = 1280/pxPerSec; /* 15px per sec if content section is at max width */

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
				className='col-full breakout-wrapper my-12  py-4 bg-body-100'
				id='experience'
			>
				<div
					className={cn('relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_25px,_black_calc(100%-25px),transparent_100%)]', className[0])}
					ref={refContainer}
				>
					{images.map((item, index) => {
						const { height, width } = GetSize(item.height, item.width);
						return (
							<div
								className={cn(`horizontalScroll-${index} absolute left-0 grid place-items-center opacity-75 grayscale`, className[1])}
								key={index}
								style={{left: isMounted ? '' : FallbackPosition(index)}}
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
