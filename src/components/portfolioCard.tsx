'use client';
import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { MotionDiv } from './motionElemets';

interface AppProps {
	bgs: StaticImageData[];
	imgs: StaticImageData[];
	title: string;
}

export default function App(props: AppProps) {
	const { bgs, imgs, title } = props;

	const constraintsRef = useRef(null);

	const [bg, setBg] = useState<StaticImageData>();
	useEffect(() => {
		const updateBackground = () => {
			const isDark = document.documentElement.classList.contains('dark');
			setBg(isDark ? bgs[1] : bgs[0]);
		};

		updateBackground();

		const observer = new MutationObserver(updateBackground);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => observer.disconnect();
	}, [bgs]);
	return (
		<>
			<div>
				<div
					className='
						overflow-hidden
						relative
						flex
						justify-center
						items-center
						w-full
						aspect-video
						rounded-lg
					'
					ref={constraintsRef}
				>
					{bg && (
						<Image
							className='
								h-full
								aspect-video
								pointer-events-none
							'
							src={bg}
							alt={`Background image of a tree`}
							width={584}
							height={328.5}
						/>
					)}
					{imgs.map((img, index) => (
						<MotionDiv
							key={index}
							className={`
								absolute
								h-2/3
								cursor-grab
							`}
							style={{ aspectRatio: `${img.width}/${img.height}` }}
							drag
							dragConstraints={constraintsRef}
						>
							<Image
								className={`
									pointer-events-none
									h-full
									rounded-lg
								`}
								src={img}
								alt={`Image ${index}`}
								width={584}
								height={328.5}
							/>
						</MotionDiv>
					))}
					<Link
						className='
							self-end
							absolute
							bg-primary-500
							m-2
							px-5
							py-3
							text-lg
							leading-5
							text-input
							text-center
							rounded-md
							hover:bg-primary-50
							hover:text-primary-500
						'
						href='/'
					>
						{title}
					</Link>
				</div>
			</div>
		</>
	);
}
