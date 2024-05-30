'use client';
import React, { useCallback } from 'react';
import Image from 'next/image';

import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { DotButton, useDotButton } from './carouselDot';

import { cn } from '@/lib/util';

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
	type: 'Dot' | 'Preview';
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options, type } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options); // options, [Autoplay({ delay: 10000 })]

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop =
			autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

		resetOrStop();
	}, []);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick
	);

	const className = 'mx-2 basis-[calc(100%_-_0.5rem)]'; // 2 / 4 = 0.5rem
	return (
		<>
			<div className='w-full overflow-hidden' ref={emblaRef}>
				<div className='flex'>
					{slides.map((item, index) => (
						<div
							key={index}
							className={cn(
								'aspect-[8/3] shrink-0 grow-0 overflow-hidden rounded-lg',
								className
							)}
						>
							<Image
								className='absolute z-[-1] aspect-[8/3] rounded-lg object-cover'
								src={'/img/temp.png'}
								alt=''
								width={1208}
								height={453}
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

			<div
				className={cn(
					'flex justify-center gap-3',
					type === 'Dot' ? 'h-4' : type === 'Preview' ? 'aspect-[19/3] w-1/2' : ''
				)}
			>
				{slides.map(
					(item, index) =>
						(type === 'Dot' && (
							<DotButton
								key={index}
								onClick={() => onDotButtonClick(index)}
								className={cn(
									'dark:bg-body-700 dark:ring-offset-body-900 aspect-square h-full rounded-full bg-body-200 ring-primary-500 ring-offset-2 ring-offset-body-50 focus-visible:outline-none focus-visible:ring-2',
									index !== selectedIndex || 'bg-body-500 dark:bg-body-500'
								)}
							/>
						)) ||
						(type === 'Preview' && (
							<DotButton
								key={index}
								onClick={() => onDotButtonClick(index)}
								className={cn(
									'dark:ring-body-900 relative flex h-full items-end rounded-md outline-none ring-4 ring-body-50 transition-[flex-basis] duration-500 before:absolute before:left-[-7px] before:top-[-7px] before:z-[-1] before:h-[calc(100%_+_14px)] before:w-[calc(100%_+_14px)] before:rounded-xl before:bg-gradient-to-br before:from-primary-500 before:from-50% before:to-transparent before:to-50% before:bg-[length:200%_200%] before:bg-right-bottom before:content-[""]',
									index === selectedIndex
										? emblaApi?.plugins()?.autoplay.isPlaying()
											? 'basis-1/2 before:animate-[backgroundMove_10s_linear_forwards]'
											: 'basis-1/2'
										: 'basis-1/4'
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
};

export default EmblaCarousel;
