'use client';
import { cn } from '@/lib/util';
import { useEffect, useRef, useState, memo, useCallback } from 'react';

type TTypeText = {
	textArray: string[];
	delay: number;
	speed: number;
};

function TypingTextComponent({ textArray, delay, speed }: TTypeText) {
	const [className, setClassName] = useState<string>('');
	const [index, setIndex] = useState<number>(0);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const charIndexRef = useRef<number>(0);
	const currentWordRef = useRef<string>('');

	/*==================================================
		Animation Callbacks
	==================================================*/
	const Del = useCallback(() => {
		if (charIndexRef.current > 0) {
			setClassName('[animation-play-state:paused] [animation-iteration-count:0]');
			setText((currentText) => currentText.slice(0, -1));
			charIndexRef.current--;
			timeoutRef.current = setTimeout(Del, speed);
		} else {
			setClassName('');
			setIndex((current) => current + 1);
		}
	}, [speed]);

	const Add = useCallback(() => {
		if (charIndexRef.current < currentWordRef.current.length) {
			setClassName('[animation-play-state:paused] [animation-iteration-count:0]');
			setText(currentWordRef.current.slice(0, ++charIndexRef.current));
			timeoutRef.current = setTimeout(Add, speed);
		} else {
			setClassName('');
			timeoutRef.current = setTimeout(Del, charIndexRef.current * delay);
		}
	}, [delay, speed, Del]);

	/*==================================================
		Animation
	==================================================*/
	useEffect(() => {
		currentWordRef.current = textArray[index % textArray.length];
		charIndexRef.current = 0;

		// Clear any existing timeout to prevent memory leaks
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		Add();

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [index, textArray, Add]);

	/*==================================================
		IsMounted
	==================================================*/
	useEffect(() => {
		setIsMounted(true);

		return () => {
			// Clean up on unmount
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
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
			<span className={cn('animate-[cursorBlink_1.5s_steps(1)_infinite_alternate]', className)}>|</span>
		</>
	);
}

// Custom comparison function for React.memo
const areEqual = (prevProps: TTypeText, nextProps: TTypeText) => {
	return (
		prevProps.delay === nextProps.delay &&
		prevProps.speed === nextProps.speed &&
		prevProps.textArray.length === nextProps.textArray.length &&
		prevProps.textArray.every((text, i) => text === nextProps.textArray[i])
	);
};

export const TypingText = memo(TypingTextComponent, areEqual);
