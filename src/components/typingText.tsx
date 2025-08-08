'use client';
import { cn } from '@/lib/util';
import { useEffect, useRef, useCallback, useReducer, JSX } from 'react';

export type TypewriterProps = {
	onLoopDone?: () => void // Callback Function that is triggered when loops are completed. available if loop is > `0`
	onType?: (count: number) => void // Callback Function that is triggered while typing with `typed` words count passed
	onDelete?: () => void // Callback Function that is triggered while deleting
	onDelay?: () => void // Callback Function that is triggered on typing delay
	words: string[] // Array of strings holding the words
	loop?: number // Control how many times to run. `0 | false` to run infinitely
	typeSpeed?: number // Character typing speed in Milliseconds
	deleteSpeed?: number // Character deleting speed in Milliseconds
	delaySpeed?: number // Delay time between the words in Milliseconds
}

export type TypewriterHelper = {
	isType: boolean // `true` if currently typing
	isDelay: boolean // `true` if on delay
	isDelete: boolean // `true` if currently deleting
	isDone: boolean // `true` if all loops are done
}

export const useTypewriter = ({words, loop = 1, typeSpeed = 100, deleteSpeed = typeSpeed, delaySpeed = 500, onLoopDone, onType, onDelete, onDelay}: TypewriterProps): [string, TypewriterHelper] => {
	const [{ speed, text, count }, dispatch] = useReducer(reducer, {
		speed: typeSpeed,
		text: '',
		count: 0
	});

	// Refs
	const loops = useRef(0);
	const isDone = useRef(false);
	const isDelete = useRef(false);
	const isType = useRef(false);
	const isDelay = useRef(false);

	const handleTyping = useCallback(() => {
		const index = count % words.length;
		const fullWord = words[index];

		if (!isDelete.current) {
			dispatch({ type: 'TYPE', payload: fullWord, speed: typeSpeed });
			isType.current = true;

			if (text === fullWord) {
				dispatch({ type: 'DELAY', payload: delaySpeed });
				isType.current = false;
				isDelay.current = true;

				setTimeout(() => {
					isDelay.current = false;
					isDelete.current = true;
				}, speed);

				if (loop > 0) {
					loops.current += 1;
					if (loops.current / words.length === loop) {
						isDelay.current = false;
						isDone.current = true;
					}
				}
			}
		} else {
			dispatch({ type: 'DELETE', payload: fullWord, speed: deleteSpeed })
			if (text === '') {
				isDelete.current = false;
				dispatch({ type: 'COUNT' });
			}
		}

		if (isType.current && onType) {
			onType(loops.current);
		}

		if (isDelete.current && onDelete) {
			onDelete();
		}

		if (isDelay.current && onDelay) {
			onDelay();
		}
	}, [count, delaySpeed, speed, loop, words, text, onType, onDelete, onDelay]);

	useEffect(() => {
		const typing = setTimeout(handleTyping, speed);

		if (isDone.current) {
			clearTimeout(typing);
		}

		return () => clearTimeout(typing);
	}, [handleTyping, speed]);

	useEffect(() => {
		if (!onLoopDone) {
			return;
		}

		if (isDone.current) {
			onLoopDone();
		}
	}, [onLoopDone]);

	return [text, {
		isType: isType.current,
		isDelay: isDelay.current,
		isDelete: isDelete.current,
		isDone: isDone.current
	}];
}

export type State = {
	speed: number
	text: string
	count: number
}

export type Action = (
	{ type: 'DELAY'; payload: number } |
	{ type: 'TYPE'; payload: string; speed: number } |
	{ type: 'DELETE'; payload: string; speed: number } |
	{ type: 'COUNT' }
)

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'TYPE':
			return {
				...state,
				speed: action.speed,
				text: action.payload?.substring(0, state.text.length + 1)
			}
		case 'DELAY':
			return {
				...state,
				speed: action.payload
			}
		case 'DELETE':
			return {
				...state,
				speed: action.speed,
				text: action.payload?.substring(0, state.text.length - 1)
			}
		case 'COUNT':
			return {
				...state,
				count: state.count + 1
			}
		default:
			return state
	}
}

type ComponentProps = {
	showCursor?: boolean
} & TypewriterProps

/**
 * A Simple React Component for adding a nice Typewriter effect to your project.
 */
export const Typewriter = ({words = [], loop = 1, typeSpeed = 80, deleteSpeed = typeSpeed, delaySpeed = 1500, showCursor = false, onLoopDone, onType, onDelay, onDelete }: ComponentProps): JSX.Element => {
	const [text, {isDelay}] = useTypewriter({
		words,
		loop,
		typeSpeed,
		deleteSpeed,
		delaySpeed,
		onLoopDone,
		onType,
		onDelay,
		onDelete
	})

	return (
		<>
			<span>{text}</span>
			{showCursor && (
				<span className={cn('animate-[cursorBlink_1.5s_steps(1)_infinite_alternate]', !isDelay && '[animation-play-state:paused] [animation-iteration-count:0]')}>|</span>
			)}
		</>
	)
}