import type { CSSProperties } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/cn';

const SPEED: number = 10;
export function Marquee({
	className,
	size,
	gap = `${size / 16 / 2}rem`,
	images,
}: {
	className: string[];
	gap: `${number}rem`;
	images: (StaticImageData | string)[];
	size: number;
}) {
	const STYLE = `
		@keyframes marquee {
			from { translate: calc((100% + ${gap}) * (var(--total) + 1 - var(--index))); }
			to   { translate: calc((100% + ${gap}) * var(--index) * -1); }
		}
	`;

	return (
		<section
			id='experience'
			className={cn('overflow-clip flex my-16 mask-[linear-gradient(to_right,transparent_0,black_1.5rem,black_calc(100%-1.5rem),transparent_100%)]', className[0])}
			style={{ gap }}
		>
			<style>{STYLE}</style>
			{images.map((item, index) => {
				const src = typeof item === 'string' ? item : item.src;
				const isDuplicate = images.findIndex((img) => (typeof img === 'string' ? img : img.src) === src) !== index;

				return (
					<Image
						key={index}
						className={cn('object-contain opacity-75 grayscale [--total:sibling-count()] [--index:sibling-index()]', className[1])}
						style={{
							'--total': images.length,
							'--index': index + 1,
							animationName: 'marquee',
							animationDuration: `${SPEED * images.length}s`,
							animationDelay: `calc(-1 * ${SPEED}s * (var(--total) - var(--index)))`,
							animationTimingFunction: 'linear',
							animationIterationCount: 'infinite',
						} as CSSProperties}
						src={item}
						alt="Gray scale version of a company logo"
						aria-hidden={isDuplicate || undefined}
						height={size}
						width={size}
					/>
				);
			})}
		</section>
	);
}