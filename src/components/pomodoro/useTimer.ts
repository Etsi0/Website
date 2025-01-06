import { useCallback, useEffect, useRef, useState } from 'react';
import { TOptions, STATES } from '@/components/pomodoro/client2';

export const useTimer = (initialState: (typeof STATES)[number], options: TOptions) => {
	const isMounted = useRef(false);
	const [state, setState] = useState<(typeof STATES)[number]>(initialState);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(options[state] * 60);
	const [index, setIndex] = useState<number>(1);

	useEffect(() => {
		isMounted.current = true;
	}, []);

	useEffect(() => {
		if (!isMounted.current) {
			return;
		}

		setTimeLeft(options[state] * 60);
	}, [state, options]);

	useEffect(() => {
		if (!isMounted.current) {
			return;
		}

		const worker = new Worker(new URL('../../workers/timer.ts', import.meta.url));

		worker.addEventListener('message', (e: MessageEvent) => {
			const { type, remainingTime } = e.data;

			if (type === 'TICK') {
				setTimeLeft(remainingTime);
			} else if (type === 'COMPLETE') {
				setIsRunning(false);
				handleStateTransition();
			}
		});

		if (isRunning) {
			worker.postMessage({
				type: 'START',
				duration: timeLeft,
			});
		}

		return () => {
			worker.postMessage({ type: 'STOP' });
			worker.terminate();
		};
	}, [isRunning, timeLeft]);

	const handleStateTransition = useCallback(
		(overwriteState?: (typeof STATES)[number]) => {
			if (overwriteState) {
				if (overwriteState === 'pomodoro') {
					setIndex((prev) => prev + 1);
				}
				setState(overwriteState);
				return;
			}

			switch (state) {
				case 'pomodoro':
					setState(index % options.longBreakInterval === 0 ? 'longBreak' : 'shortBreak');
					break;
				case 'shortBreak':
				case 'longBreak':
					setIndex((prev) => prev + 1);
					setState('pomodoro');
					break;
			}
		},
		[state, index, options.longBreakInterval]
	);

	return {
		state,
		setState,
		isRunning,
		setIsRunning,
		timeLeft,
		index,
		handleStateTransition,
	};
};
