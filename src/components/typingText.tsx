'use client';
import { cn } from '@/lib/util';
import { useEffect, useRef, useCallback, useReducer, useState, JSX } from 'react';

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

	// Refs for internal tracking
	const loops = useRef(0);
	
	// State for return values (to avoid accessing refs during render)
	const [isDone, setIsDone] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [isType, setIsType] = useState(false);
	const [isDelay, setIsDelay] = useState(false);

	const handleTyping = useCallback(() => {
		const index = count % words.length;
		const fullWord = words[index];

		if (!isDelete) {
			dispatch({ type: 'TYPE', payload: fullWord, speed: typeSpeed });
			setIsType(true);

			if (text === fullWord) {
				dispatch({ type: 'DELAY', payload: delaySpeed });
				setIsType(false);
				setIsDelay(true);

				setTimeout(() => {
					setIsDelay(false);
					setIsDelete(true);
				}, speed);

				if (loop > 0) {
					loops.current += 1;
					if (loops.current / words.length === loop) {
						setIsDelay(false);
						setIsDone(true);
					}
				}
			}
		} else {
			dispatch({ type: 'DELETE', payload: fullWord, speed: deleteSpeed })
			if (text === '') {
				setIsDelete(false);
				dispatch({ type: 'COUNT' });
			}
		}

		if (isType && onType) {
			onType(loops.current);
		}

		if (isDelete && onDelete) {
			onDelete();
		}

		if (isDelay && onDelay) {
			onDelay();
		}
	}, [count, typeSpeed, deleteSpeed, delaySpeed, speed, loop, words, text, isDelete, isType, isDelay, onType, onDelete, onDelay]);

	useEffect(() => {
		const typing = setTimeout(handleTyping, speed);

		if (isDone) {
			clearTimeout(typing);
		}

		return () => clearTimeout(typing);
	}, [handleTyping, speed, isDone]);

	useEffect(() => {
		if (!onLoopDone) {
			return;
		}

		if (isDone) {
			onLoopDone();
		}
	}, [onLoopDone, isDone]);

	return [text, {
		isType,
		isDelay,
		isDelete,
		isDone
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
			<span className='font-(family-name:--mono)'>{text}</span>
			{showCursor && (
				<span className={cn('font-(family-name:--mono) animate-[cursorBlink_1.5s_steps(1)_infinite_alternate]', !isDelay && '[animation-play-state:paused] [animation-iteration-count:0]')}>|</span>
			)}
		</>
	)
}