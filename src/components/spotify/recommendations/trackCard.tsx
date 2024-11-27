'use client';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/util';
import { TSongs } from '@/types/spotify/recommendations/main';

export function TrackCard({
	data,
	isPlaying,
	onClick,
}: {
	data: TSongs[number];
	isPlaying: boolean;
	onClick: () => void;
}) {
	const [duration, setDuration] = useState<number>(0);
	const [transform, setTransform] = useState<number>(0);

	return (
		<>
			<div className='flex w-72 flex-col gap-3 self-stretch rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'>
				{(data.previewUrl && (
					<>
						<button
							className={cn(
								'relative mx-auto overflow-hidden rounded-md after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[length:calc(100%_/_3)_calc(100%_/_3)] after:bg-center after:bg-no-repeat',
								(isPlaying || data.previewUrl) && 'cursor-pointer',
								isPlaying && 'after:bg-black/50 after:bg-[url(/img/pause.svg)]',
								!isPlaying && data.previewUrl && 'after:hover:bg-black/50 after:hover:bg-[url(/img/play.svg)]'
							)}
							onClick={() => {
								if (data.previewUrl) {
									onClick();
								}
							}}
						>
							<Image alt={`album art of ${data.track.name}`} className='mx-auto aspect-square rounded-md' height={192} src={data.image.url} width={192} />
						</button>
						<audio>
							<source src={data.previewUrl} type='audio/mpeg' />
							Your browser does not support the audio element.
						</audio>
					</>
				)) || <Image alt={`album art of ${data.track.name}`} className='aspect-square' height={192} src={data.image.url} width={192} />}

				<div className='flex grow flex-col'>
					<h2 className='overflow-hidden text-center text-3xl text-text-700'>
						<a
							className='block whitespace-nowrap transition-transform ease-linear'
							href={data.track.link}
							onMouseOver={(event) => {
								const target = event.target as HTMLAnchorElement;
								const diff = target.scrollWidth - target.clientWidth;
								if (0 === diff) {
									return;
								}

								setTransform(diff);

								const calculatedDuration = diff * 10 * 1.666;
								setDuration(calculatedDuration);

								setTimeout(() => {
									setTransform(0);
								}, calculatedDuration + 3333);
							}}
							style={{
								transform: `translateX(-${transform}px)`,
								transitionDuration: `${duration}ms`,
							}}
						>
							{data.track.name}
						</a>
					</h2>
					<p className='grow'>
						{data.artists.map((artist, index) => (
							<Fragment key={index}>
								<a className='text-text-500' href={artist.link}>
									{artist.name}
								</a>
								{index < data.artists.length - 1 && ', '}
							</Fragment>
						))}
					</p>
					<a className='mt-16 text-xl text-text-300' href={data.album.link}>
						{data.album.name}
					</a>
				</div>
			</div>
		</>
	);
}
