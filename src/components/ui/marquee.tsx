import type { CSSProperties } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { cn } from '@/lib/cn';

type MarqueeProps = {
	id?: string;
	className: string[];
	label: string;
	size: number;
	gap: `${number}rem`;
	images: { alt: string; src: StaticImageData | string; }[];
	shadowCopies?: number;
};

const SPEED: number = 10;
export function Marquee({
	id,
	className,
	label,
	size,
	gap = `${size / 16 / 2}rem`,
	images,
	shadowCopies = 0,
}: MarqueeProps) {
	const STYLE = `
		@keyframes marquee {
			from { translate: calc((100% + ${gap}) * (var(--total) + 1 - var(--index))); }
			to   { translate: calc((100% + ${gap}) * var(--index) * -1); }
		}
	`;
	const track = Array.from({ length: shadowCopies + 1 }, () => images).flat();

	return (
		<section
			id={id}
			aria-label={label}
			className={cn('marquee overflow-clip flex my-16 mask-[linear-gradient(to_right,transparent_0,black_1.5rem,black_calc(100%-1.5rem),transparent_100%)]', className[0])}
			style={{ gap }}
		>
			<style>{STYLE}</style>
			{track.map((item, index) => {
				const src = typeof item.src === 'string' ? item.src : item.src.src;
				const isDuplicate = track.findIndex((img) => (typeof img.src === 'string' ? img.src : img.src.src) === src) !== index;

				return (
					<Image
						key={index}
						className={cn('object-contain opacity-75 grayscale [--total:sibling-count()] [--index:sibling-index()]', className[1])}
						style={{
							'--total': track.length,
							'--index': index + 1,
							animationName: 'marquee',
							animationDuration: `${SPEED * track.length}s`,
							animationDelay: `calc(-1 * ${SPEED}s * (var(--total) - var(--index)))`,
							animationTimingFunction: 'linear',
							animationIterationCount: 'infinite',
						} as CSSProperties}
						src={item.src}
						alt={isDuplicate ? '' : item.alt}
						aria-hidden={isDuplicate || undefined}
						height={size}
						width={size}
					/>
				);
			})}
		</section>
	);
}