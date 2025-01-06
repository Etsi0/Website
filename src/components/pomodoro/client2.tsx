'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NoScript } from '@/components/ui/noScript';
import SkipNext from '@/svg/materialDesignIcons/skip_next.svg';
import Settings from '@/svg/materialDesignIcons/settings.svg';
import { cn } from '@/lib/util';
import { useTimer } from '@/components/pomodoro/useTimer';
import { SettingsDialog } from '@/components/pomodoro/settingsDialog';

export type TOptions = {
	pomodoro: number;
	shortBreak: number;
	longBreak: number;
	autoStartBreaks: boolean;
	autoStartPomodoros: boolean;
	longBreakInterval: number;
};

export const STATES = ['pomodoro', 'shortBreak', 'longBreak'] as const;

export const DEFAULT_OPTIONS: TOptions = {
	pomodoro: 25,
	shortBreak: 5,
	longBreak: 20,
	autoStartBreaks: false,
	autoStartPomodoros: false,
	longBreakInterval: 4,
} as const;

export default function Client() {
	const [isMounted, setIsMounted] = useState(false);
	const [options, setOptions] = useState<TOptions>(DEFAULT_OPTIONS);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const { state, setState, isRunning, setIsRunning, timeLeft, index, handleStateTransition } = useTimer('pomodoro', options);

	const minutes = Math.floor(timeLeft / 60)
		.toString()
		.padStart(2, '0');
	const seconds = (timeLeft % 60).toString().padStart(2, '0');

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		document.title = `${minutes}:${seconds} - Pomodoro | Phadonia`;
	}, [minutes, seconds]);

	return (
		<>
			<section className='grid h-[calc(100svh_-_4rem)] place-items-center'>
				<NoScript />
				<div className={cn('gap-4', isMounted ? 'grid' : 'hidden')}>
					<div className='mx-auto'>{index}</div>
					<div className='flex items-center justify-center gap-4'>
						{STATES.map((item) => (
							<Button
								key={item}
								className='rounded-md bg-primary-50 px-6 py-1 text-primary-500 dark:bg-body-300 dark:text-text-500'
								{...(state === item ? { disabled: true } : { onClick: () => handleStateTransition(item) })}
							>
								{item.replace(/([A-Z])/g, ' $1').replace(/(^\w)/g, (c) => c.toUpperCase())}
							</Button>
						))}
					</div>
					<h1 className='text-center text-9xl'>
						{minutes}:{seconds}
					</h1>
					<div className='mt-4 flex items-center justify-center gap-8'>
						<Button onClick={() => setIsSettingsOpen(true)}>
							<Settings className='size-[calc(1.25em_+_1rem)] fill-text-500' />
						</Button>

						<Button className='grow rounded-md bg-primary-500 px-[1.5em] py-[0.75em] text-input' onClick={() => setIsRunning(!isRunning)}>
							{isRunning ? 'Pause' : 'Start'}
						</Button>

						<Button onClick={() => handleStateTransition()}>
							<SkipNext className='size-[calc(1.25em_+_1rem)] fill-text-500' />
						</Button>
					</div>
				</div>
			</section>

			<SettingsDialog isOpen={isSettingsOpen} options={options} setOptions={setOptions} onClose={() => setIsSettingsOpen(false)} />
		</>
	);
}
