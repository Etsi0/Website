'use client';
import { cn } from '@/lib/util';
import { useEffect, useRef, useState } from 'react';

type TTypeText = {
	textArray: string[];
	delay: number;
	speed: number;
};

export function TypingText({ textArray, delay, speed }: TTypeText) {
	const [className, setClassName] = useState<string>('');
	const [index, setIndex] = useState<number>(0);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	/*==================================================
		Animation
	==================================================*/
	useEffect(() => {
		const currentWord = textArray[index % textArray.length];
		let charIndex = 0;

		const Add = () => {
			if (charIndex < currentWord.length) {
				setClassName('[animation-play-state:paused] [animation-iteration-count:0]');
				setText(currentWord.slice(0, ++charIndex));
				timeoutRef.current = setTimeout(Add, speed);
			} else {
				setClassName('');
				timeoutRef.current = setTimeout(Del, charIndex * delay);
			}
		};
		const Del = () => {
			if (charIndex > 0) {
				setClassName('[animation-play-state:paused] [animation-iteration-count:0]');
				setText((currentText) => currentText.slice(0, -1));
				charIndex--;
				timeoutRef.current = setTimeout(Del, speed);
			} else {
				setClassName('');
				setIndex((current) => current + 1);
			}
		};

		Add();

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [index, delay, speed, textArray]);

	/*==================================================
		IsMounted
	==================================================*/
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return textArray[0];
	}

	/*==================================================
		XML
	==================================================*/
	return (
		<>
			{text}
			<span
				className={cn('animate-[cursorBlink_1.5s_steps(1)_infinite_alternate]', className)}
			>
				|
			</span>
		</>
	);
}
