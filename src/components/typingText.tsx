'use client';
import { cn } from '@/lib/util';
import { useEffect, useState } from 'react';

export default function TypingText({
	textArray,
	delay,
	speed,
}: {
	textArray: string[];
	delay?: number;
	speed?: number;
}) {
	const [text, setText] = useState<string>('');
	const [index, setIndex] = useState<number>(0);
	const [className, setClassName] = useState<string>('');

	useEffect(() => {
		const currentWord = textArray[index % textArray.length];
		let charIndex = 0;

		const Add = () => {
			if (charIndex < currentWord.length) {
				setClassName('[animation-play-state:paused] [animation-iteration-count:0]');
				setText(currentWord.slice(0, ++charIndex));
				setTimeout(Add, speed || 100);
			} else {
				setClassName('');
				setTimeout(Del, delay || 1000);
			}
		};
		const Del = () => {
			if (charIndex > 0) {
				setClassName('[animation-play-state:paused] [animation-iteration-count:0]');
				setText((currentText) => currentText.slice(0, -1));
				charIndex--;
				setTimeout(Del, speed || 100);
			} else {
				setClassName('');
				setIndex(index + 1);
			}
		};

		Add();
	}, [index]);

	return (
		<>
			{text}
			<span
				className={cn(`animate-[cursorBlink_1.5s_steps(1)_infinite_alternate]`, className)}
			>
				|
			</span>
		</>
	);
}
