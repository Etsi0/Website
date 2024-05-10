'use client';
import Image from 'next/image';
import { useSongJsonContext } from '@/context/songsContext';
import { useState } from 'react';
import { cn } from '@/lib/util';

export default function SongCards() {
	const [isPlaying, setIsPlaying] = useState<null | number>(null);
	const { SongJson, setSongJson } = useSongJsonContext();

	function handlePlayAudio(index) {
		const allAudio = document.querySelectorAll('audio');
		const audioElement = document.getElementById(`preview${index}`) as HTMLAudioElement;

		const onAudioEnd = () => {
			setIsPlaying(null);
			audioElement.removeEventListener('ended', onAudioEnd);
		};

		if (audioElement.paused) {
			allAudio.forEach((audio) => {
				audio.pause();
				audio.currentTime = 0;
				audio.removeEventListener('ended', onAudioEnd);
			});
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
			<div className='grid gap-6'>
				{SongJson &&
					SongJson.map((item, index) => (
						<div
							key={index}
							className='flex overflow-hidden rounded-xl bg-body-50 shadow-lg dark:bg-body-200'
						>
							<label
								htmlFor={`preview${index}`}
								className={cn(
									'relative after:absolute after:top-0 after:h-full after:w-full after:bg-[length:calc(100%_/_3)_calc(100%_/_3)] after:bg-center after:bg-no-repeat after:hover:bg-black/50 after:hover:bg-[url(/img/play.svg)]',
									isPlaying === index &&
										'after:bg-black/50 after:bg-[url(/img/pause.svg)] after:hover:bg-[url(/img/pause.svg)]',
								)}
								onClick={() => handlePlayAudio(index)}
							>
								<Image
									src={item.image.url}
									alt={`album art of ${item.track.name}`}
									width={200}
									height={200}
								/>
							</label>
							<div className='flex flex-col p-3'>
								<div className='grow'>
									<a className='text-2xl text-text-700' href={item.track.link}>
										{item.track.name}
									</a>
									<div>
										{item.artists.map((artist, i) => (
											<a key={i} className='text-text-500' href={artist.link}>
												{artist.name}
											</a>
										))}
									</div>
								</div>
								<a className='text-xl text-text-300' href={item.album.link}>
									{item.album.name}
								</a>
							</div>
							<audio id={`preview${index}`}>
								<source src={item.previewUrl} type='audio/mpeg' />
								Your browser does not support the audio element.
							</audio>
						</div>
					))}
			</div>
		</>
	);
}
