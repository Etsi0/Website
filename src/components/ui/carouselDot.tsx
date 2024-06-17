'use client';
import React, { ButtonHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

type UseDotButtonType = {
	selectedIndex: number;
	scrollSnaps: number[];
	onDotButtonClick: (index: number) => void;
};

export function useDotButton(emblaApi?: EmblaCarouselType): { selectedIndex: number } {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect);
		emblaApi.on('select', onSelect);
	}, [emblaApi, onSelect]);

	return { selectedIndex };
}

export function DotButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button type='button' {...props}>
			{children}
		</button>
	);
}
