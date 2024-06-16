'use client';
import { Fragment, useState } from 'react';
import Image from 'next/image';

import { useSongJsonContext } from '@/context/songsContext';
import { cn } from '@/lib/util';

export default function SongCards() {
	const [isPlaying, setIsPlaying] = useState<null | number>(null);
	const { songJson, setSongJson } = useSongJsonContext();

	function handlePlayAudio(index: number) {
		const allAudio = document.querySelectorAll('audio');
		const audioElement = allAudio[index];

		/*==================================================
			If song ends
		==================================================*/
		const onAudioEnd = () => {
			setIsPlaying(null);
			audioElement.removeEventListener('ended', onAudioEnd);
		};

		/*==================================================
			Play & Pause
		==================================================*/
		if (audioElement.paused) {
			if (isPlaying !== null) {
				allAudio.forEach((audio) => {
					audio.pause();
					audio.currentTime = 0;
					audio.removeEventListener('ended', onAudioEnd);
				});
			}
			audioElement.play();
			setIsPlaying(index);
			audioElement.addEventListener('ended', onAudioEnd);
		} else {
			audioElement.pause();
			audioElement.currentTime = 0;
			setIsPlaying(null);
		}
	}

	return (
		<>
			<div className='mb-16 flex flex-wrap items-start justify-center gap-5'>
				{songJson &&
					songJson.map((item, index) => (
						<div
							key={index}
							className='flex w-72 flex-col gap-3 self-stretch rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'
						>
							<label
								htmlFor={`preview${index}`}
								className={cn(
									'relative mx-auto overflow-hidden rounded-md after:absolute after:top-0 after:h-full after:w-full after:bg-[length:calc(100%_/_3)_calc(100%_/_3)] after:bg-center after:bg-no-repeat',
									(isPlaying === index &&
										'cursor-pointer after:bg-black/50 after:bg-[url(/img/pause.svg)]') ||
										(item.previewUrl &&
											'cursor-pointer after:hover:bg-black/50 after:hover:bg-[url(/img/play.svg)]')
								)}
								onClick={() => {
									if (item.previewUrl) handlePlayAudio(index);
								}}
							>
								<Image
									src={item.image.url}
									alt={`album art of ${item.track.name}`}
									width={192}
									height={192}
								/>
							</label>
							{item.previewUrl && (
								<audio id={`preview${index}`}>
									<source src={item.previewUrl} type='audio/mpeg' />
									Your browser does not support the audio element.
								</audio>
							)}
							<div className='flex grow flex-col'>
								<h2 className='line-clamp-1 text-center text-3xl text-text-700'>
									<a href={item.track.link}>{item.track.name}</a>
								</h2>
								<div className='line-clamp-1 grow'>
									{item.artists.map((artist, i) => (
										<Fragment key={i}>
											<a className='text-text-500' href={artist.link}>
												{artist.name}
											</a>
											{i < item.artists.length - 1 && ', '}
										</Fragment>
									))}
								</div>
								<a
									className='mt-16 line-clamp-1 text-xl text-text-300'
									href={item.album.link}
								>
									{item.album.name}
								</a>
							</div>
						</div>
					))}
			</div>
		</>
	);
}
