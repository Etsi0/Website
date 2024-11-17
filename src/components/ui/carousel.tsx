'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';

import { cn } from '@/lib/util';

import { DotButton, useDotButton } from './carouselDot';

export type TCarousel = {
	AutoplayOptions?: {
		stopOnInteraction: boolean;
	} & AutoplayOptionsType;
	options?: EmblaOptionsType;
	slides: number[];
	type: 'Dot' | 'Preview';
};

Autoplay.globalOptions = { delay: 10000 };

export default function EmblaCarousel({ AutoplayOptions, options, slides, type }: TCarousel) {
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(AutoplayOptions)]);

	function handleClick(index: number) {
		if (!emblaApi) {
			return;
		}

		emblaApi.scrollTo(index);

		const autoplay = emblaApi.plugins().autoplay;
		if (emblaApi.plugins().autoplay.options.stopOnInteraction === false) {
			autoplay.reset();
		} else {
			autoplay.stop();
		}
	}

	const { selectedIndex } = useDotButton(emblaApi);

	const className = 'mx-2 basis-[calc(100%_-_0.5rem)]'; // 2 / 4 = 0.5rem

	useEffect(() => {
		if (!isMounted) {
			setIsMounted(true);
		}
	}, [isMounted]);

	if (!isMounted) {
		return (
			<>
				<div className='aspect-[8/3] w-full animate-pulse rounded-lg bg-slate-500'></div>
			</>
		);
	}

	return (
		<>
			{/*==================================================
				Carousel
			==================================================*/}
			<div className='w-full overflow-hidden' ref={emblaRef}>
				<div className='flex'>
					{slides.map((_, index) => (
						<div
							className={cn(
								'aspect-[8/3] shrink-0 grow-0 overflow-hidden rounded-lg',
								className
							)}
							key={index}
						>
							<Image
								alt=''
								className='absolute z-[-1] aspect-[8/3] rounded-lg object-cover'
								height={453}
								src={'/img/temp.png'}
								width={1208}
							/>
							<div className='grid h-full items-end'>
								<div className='bg-gradient-to-t from-[hsl(0deg_0_75)] to-transparent p-4 pt-8 dark:from-[hsl(0deg_0_25)]'>
									<h3 className='text-text-700'>Class Collapse</h3>
									<p className='text-text-700'>
										A VSCode extension that removes distractions
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/*==================================================
				Dots
			==================================================*/}
			<div
				className={cn(
					'flex justify-center gap-3',
					type === 'Preview' && 'aspect-[19/3] w-1/2'
				)}
			>
				{slides.map(
					(item, index) =>
						(type === 'Dot' && (
							<DotButton
								key={index}
								onClick={() => handleClick(index)}
								className={cn(
									'aspect-square h-4 rounded-full bg-body-200 ring-primary-500 ring-offset-2 ring-offset-body-50 focus-visible:outline-none focus-visible:ring-2',
									index !== selectedIndex || 'bg-body-500 dark:bg-body-500'
								)}
							/>
						)) ||
						(type === 'Preview' && (
							<DotButton
								key={index}
								onClick={() => handleClick(index)}
								className={cn(
									'dark:ring-body-900 relative flex h-full basis-1/4 items-end rounded-md outline-none ring-4 ring-body-50 transition-[flex-basis] duration-500 before:absolute before:left-[-7px] before:top-[-7px] before:z-[-1] before:h-[calc(100%_+_14px)] before:w-[calc(100%_+_14px)] before:rounded-xl before:bg-gradient-to-br before:from-primary-500 before:from-50% before:to-transparent before:to-50% before:bg-[length:200%_200%] before:bg-right-bottom before:content-[""]',
									index === selectedIndex &&
										emblaApi?.plugins().autoplay.isPlaying()
										? 'basis-1/2 before:animate-[backgroundMove_10s_linear_forwards]'
										: 'basis-1/2'
								)}
							>
								{type === 'Preview' && (
									<Image
										src={`/img/apple%20wallpaper/mac%20tree/Tree/RanchoNight_16_Dyn_Tree-2.webp`}
										alt='trä'
										width={292}
										height={96}
										className='mx-auto max-h-full max-w-full rounded-md object-cover'
									/>
								)}
							</DotButton>
						))
				)}
			</div>
		</>
	);
}
