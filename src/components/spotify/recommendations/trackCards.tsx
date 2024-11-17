'use client';
import { useState } from 'react';
import { useSongJsonContext } from '@/context/songsContext';
import { TrackCard } from './trackCard';

export default function SongCards() {
	const [isPlaying, setIsPlaying] = useState<null | number>(null);
	const { songJson } = useSongJsonContext();

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
						<TrackCard
							key={index}
							data={item}
							isPlaying={isPlaying === index}
							onClick={() => handlePlayAudio(index)}
						/>
					))}
			</div>
		</>
	);
}
