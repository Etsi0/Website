import { TOptions } from '@/components/pomodoro/client2';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/util';
import { useEffect, useRef } from 'react';

export const SettingsDialog = ({ isOpen, options, setOptions, onClose }: { isOpen: boolean; options: TOptions; setOptions: (options: TOptions) => void; onClose: () => void }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}

		document.documentElement.classList.toggle('overflow-hidden', isOpen);

		const handleEscape = () => onClose();
		dialog.addEventListener('close', handleEscape);
		return () => dialog.removeEventListener('close', handleEscape);
	}, [isOpen, onClose]);

	const handleNumberChange = (key: keyof TOptions) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, [key]: Number(event.target.value) });
	};

	const handleCheckboxChange = (key: keyof TOptions) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, [key]: event.target.checked });
	};

	return (
		<Dialog ref={dialogRef} className={cn('gap-4', isOpen && 'grid')}>
			{(['pomodoro', 'shortBreak', 'longBreak'] as const).map((setting) => (
				<Label key={setting} className='flex items-center justify-between' type='horizontal'>
					{setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1')}
					<input className='rounded-md p-2' type='number' value={options[setting]} min={1} max={720} onChange={handleNumberChange(setting)} />
				</Label>
			))}

			{(['autoStartBreaks', 'autoStartPomodoros'] as const).map((setting) => (
				<Label key={setting} className='flex items-center justify-between' type='horizontal'>
					{setting.replace(/([A-Z])/g, ' $1')}
					<input className='aspect-square h-[calc(1.25em_+_1rem)]' type='checkbox' checked={options[setting]} onChange={handleCheckboxChange(setting)} />
				</Label>
			))}

			<Label className='flex items-center justify-between' type='horizontal'>
				Long Break Interval
				<input className='rounded-md p-2' type='number' value={options.longBreakInterval} min={1} max={999} onChange={handleNumberChange('longBreakInterval')} />
			</Label>

			<Button className='justify-self-end rounded-md bg-primary-500 px-[1.5em] py-[0.75em] text-input' onClick={onClose}>
				Close
			</Button>
		</Dialog>
	);
};
