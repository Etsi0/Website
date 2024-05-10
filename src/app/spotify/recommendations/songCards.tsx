'use client';
import Image from 'next/image';
import { useSongJsonContext } from '@/context/songsContext';

export default function SongCards() {
	const { SongJson, setSongJson } = useSongJsonContext();

	function handlePlayAudio(index) {
		const allAudio = document.querySelectorAll('audio');
		allAudio.forEach((audio) => {
			audio.pause();
			audio.currentTime = 0;
		});
		const audioElement = document.getElementById(`preview${index}`) as HTMLAudioElement;
		if (audioElement.paused) {
			audioElement.play();
		} else {
			audioElement.pause();
			audioElement.currentTime = 0;
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
								className='relative after:absolute after:top-0 after:h-full after:w-full after:bg-center after:bg-no-repeat after:hover:bg-black/50 after:hover:bg-[url(/img/play.svg)]'
								onClick={() => handlePlayAudio(index)}
							>
								<Image
									src={item.image.url}
									alt={`album art of ${item.track.name}`}
									width={item.image.width}
									height={item.image.height}
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
