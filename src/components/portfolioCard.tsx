'use client';
import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MotionButton, MotionDiv } from './motionElemets';

const variants = {
	enter: (direction: number) => {
		return {
			x: direction == 0 ? 0 : direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			x: direction == 0 ? 0 : direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

const swipeConfidenceThreshold = 10000 as const;
function swipePower(offset: number, velocity: number) {
	return Math.abs(offset) * velocity;
}

function wrap(min: number, max: number, value: number) {
	const rangeSize = max - min;
	return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

interface AppProps {
	bgs: StaticImageData[];
	imgs: StaticImageData[];
	title: string;
}
export default function App(props: AppProps) {
	const { bgs, imgs, title } = props;

	const [[page, direction], setPage] = useState([0, 0]);
	useEffect(() => {
		autoSwipe();
	}, [page]);

	const autoSwipeInterval = useRef(null);
	function autoSwipe() {
		if (autoSwipeInterval.current) {
			clearInterval(autoSwipeInterval.current);
		}
		autoSwipeInterval.current = setInterval(() => paginate(1), 10000); // 10 sec
	}

	const imageIndex = wrap(0, imgs.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	return (
		<>
			<div
				className='
					overflow-hidden
					grid
					gap-3
					w-full
				'
			>
				<MotionDiv
					key={page}
					className='
						overflow-hidden
						bg-primary-50
						w-full
						aspect-[8/3]
						rounded-lg
						cursor-grab
					'
					custom={direction}
					variants={variants}
					initial='enter'
					animate='center'
					exit='exit'
					transition={{
						x: { type: 'spring', stiffness: 300, damping: 30 },
						opacity: { duration: 0.15 },
					}}
					drag='x'
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}
				>
					<Image
						className={`
						pointer-events-none
						w-full
						h-full
						object-cover
					`}
						src={imgs[imageIndex]}
						alt={`Image`}
					/>
				</MotionDiv>
				<div
					className='
						flex
						justify-center
						gap-5
						w-full
					'
				>
					{imgs.map((img, index) => {
						return (
							<MotionButton
								key={index}
								className='
									relative
									basis-72
									aspect-[3/1]
									m-2
									outline-4
									outline
									outline-body
									rounded-lg
									transition-[flex-basis]
									duration-500
									aria-selected:basis-96

									before:absolute
									before:content
									before:bg-gradient-to-br
									before:from-primary-700
									before:from-50%
									before:to-50%
									before:bg-[length:200%_200%]
									before:bg-right-bottom
									before:aria-selected:animate-[backgroundMove_10s_linear_forwards]
									before:h-[calc(100%+(4px*2)+6px)]
									before:w-[calc(100%+(4px*2)+6px)]
									before:left-1/2
									before:top-1/2
									before:rounded-2xl
									before:translate-x-[-50%]
									before:translate-y-[-50%]
									before:z-[-1]
								'
								onClick={() => {
									autoSwipe();
									paginate(imageIndex == index ? 0 : imageIndex < index ? 1 : -1);
								}}
								aria-selected={imageIndex == index}
							>
								<Image
									className='
										w-full
										h-full
										object-cover
									'
									src={img}
									alt={`Image ${index}`}
								/>
							</MotionButton>
						);
					})}
				</div>
			</div>
		</>
	);
}
