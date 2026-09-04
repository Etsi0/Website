import { useEffect, useRef } from 'react';
import type { TOptions } from '@/components/pomodoro/client2';
import { LinkButton } from '@/components/ui/link';
import { Dialog } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export const SETTINGS_DIALOG_ID = 'pomodoro-settings';

export function SettingsDialog({ options, setOptions }: { options: TOptions; setOptions: (options: TOptions) => void }) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const syncOverflow = () => {
			document.documentElement.classList.toggle('overflow-hidden', dialog.open);
		};

		dialog.addEventListener('toggle', syncOverflow);
		dialog.addEventListener('close', syncOverflow);
		return () => {
			dialog.removeEventListener('toggle', syncOverflow);
			dialog.removeEventListener('close', syncOverflow);
			document.documentElement.classList.remove('overflow-hidden');
		};
	}, []);

	const handleNumberChange = (key: keyof TOptions) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, [key]: Number(event.target.value) });
	};

	const handleCheckboxChange = (key: keyof TOptions) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, [key]: event.target.checked });
	};

	return (
		<Dialog ref={dialogRef} id={SETTINGS_DIALOG_ID} className='gap-4 open:grid'>
			{(['pomodoro', 'shortBreak', 'longBreak'] as const).map((setting) => (
				<Label key={setting} className='flex items-center justify-between' type='horizontal'>
					{setting.charAt(0).toUpperCase() + setting.slice(1).replace(/([A-Z])/g, ' $1')}
					<input className='rounded-md p-2' type='number' value={options[setting]} min={1} max={720} onChange={handleNumberChange(setting)} />
				</Label>
			))}

			{(['autoStartBreaks', 'autoStartPomodoros'] as const).map((setting) => (
				<Label key={setting} className='flex items-center justify-between' type='horizontal'>
					{setting.replace(/([A-Z])/g, ' $1')}
					<input className='aspect-square h-[calc(1.25em+1rem)]' type='checkbox' checked={options[setting]} onChange={handleCheckboxChange(setting)} />
				</Label>
			))}

			<Label className='flex items-center justify-between' type='horizontal'>
				Long Break Interval
				<input className='rounded-md p-2' type='number' value={options.longBreakInterval} min={1} max={999} onChange={handleNumberChange('longBreakInterval')} />
			</Label>

			<LinkButton className='justify-self-end rounded-md bg-primary-500 px-[1.5em] py-[0.75em] text-primary-100' command='close' commandfor={SETTINGS_DIALOG_ID}>
				Close
			</LinkButton>
		</Dialog>
	);
}
