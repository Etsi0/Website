'use client';
import { cn } from '@/lib/util';
import { useEffect, useRef, useState } from 'react';
import { SvgList } from './SVGs';
import { Button } from './ui/button';

type AppProps = {
	SVG: keyof typeof SvgList;
	className: string;
	title: string;
	description: string;
	modalClassName?: string;
};

export default function App({ SVG, className, title, description, modalClassName }: AppProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const dialog = dialogRef.current;

		if (!dialog || !modalClassName) {
			return;
		}

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}

		const root = document.documentElement;
		root.classList.toggle('overflow-hidden', isOpen);

		const handleEscape = () => {
			setIsOpen(false);
		};

		dialog.addEventListener('close', handleEscape);

		return () => dialog.removeEventListener('close', handleEscape);
	}, [dialogRef, isOpen, modalClassName]);

	const Component = SvgList[SVG];

	return (
		<>
			<button
				className='group grid aspect-[1/1.125] place-content-center place-items-center gap-3 rounded-lg bg-primary-500 p-3 shadow-lg duration-300 hover:bg-body-100 hover:shadow-inner focus-visible:bg-body-100 focus-visible:shadow-inner focus-visible:outline-none'
				onClick={() => setIsOpen(true)}
			>
				<Component className={cn('w-1/2', className)} />
				<h3 className='text-lg leading-5 text-input group-hover:text-primary-500 group-focus-visible:text-primary-500 dark:group-hover:text-body-300 dark:group-focus-visible:text-body-300'>
					{title}
				</h3>
			</button>
			{modalClassName && (
				<dialog ref={dialogRef} className='bg-body space-y-3 rounded-lg p-8 shadow-lg dark:shadow-[0px_5px_25px_-5px] dark:shadow-primary-500'>
					<div className='grid justify-items-center gap-x-8 gap-y-4 sm:flex'>
						<Component className={cn('', modalClassName)} />
						<div className='w-72 self-center'>
							<h3>{title}</h3>
							<p>{description}</p>
						</div>
					</div>
					<Button className='relative float-end rounded-md bg-primary-500 px-[1.5em] py-[0.75em] text-input' onClick={() => setIsOpen(false)}>
						Close
					</Button>
				</dialog>
			)}
		</>
	);
}
