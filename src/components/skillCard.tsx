'use client';
import { FC, SVGProps, useEffect, useRef, useState } from 'react';
import { SkillCardJson } from '@/json/home/skillCard';
import { TDialogState, TSkillCard, TSkillCardDialog } from '@/types/home/skills';
import { Dialog } from '@/components/ui/dialog';
import { LinkButton } from '@/components/ui/link';

export function SkillCards() {
	const [dialogState, setDialogState] = useState<TDialogState>({
		isOpen: false,
		title: '',
		description: '',
		SVG: null,
	});

	const handleOpenDialog = (title: string, description: string, SVG: FC<SVGProps<SVGElement>>) => {
		setDialogState({
			isOpen: true,
			title,
			description,
			SVG,
		});
	};

	const handleCloseDialog = () => {
		setDialogState((prev) => ({ ...prev, isOpen: false }));
	};

	return (
		<>
			{SkillCardJson.map((item, index) => (
				<SkillCard key={index} SVG={item.SVG} title={item.title} description={item.description} onOpen={handleOpenDialog} />
			))}
			{dialogState.SVG && <SkillCardDialog isOpen={dialogState.isOpen} onClose={handleCloseDialog} title={dialogState.title} description={dialogState.description} SVG={dialogState.SVG} />}
		</>
	);
}

export function SkillCard({ SVG, title, description, onOpen }: TSkillCard) {
	return (
		<>
			<button
				className='group grid aspect-[1/1.125] place-content-center place-items-center gap-3 rounded-lg bg-primary-500 p-3 shadow-lg duration-300 transition-colors *:transition-colors *:*:transition-colors hover:bg-body-50 hover:shadow-inner focus-visible:bg-body-100 focus-visible:shadow-inner focus-visible:outline-hidden'
				onClick={() => onOpen(title, description, SVG)}
			>
				<SVG className='aspect-square w-1/2 *:fill-primary-100! *:group-hover:fill-primary-500! *:group-focus-visible:fill-primary-500! dark:*:group-hover:fill-body-300! dark:*:group-focus-visible:fill-body-300!' />
				<h3 className='text-lg leading-5 text-primary-100 group-hover:text-primary-500 group-focus-visible:text-primary-500 dark:group-hover:text-body-300 dark:group-focus-visible:text-body-300'>
					{title}
				</h3>
			</button>
		</>
	);
}

export function SkillCardDialog({ SVG, title, description, isOpen, onClose }: TSkillCardDialog) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
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
			onClose();
		};

		dialog.addEventListener('close', handleEscape);
		return () => dialog.removeEventListener('close', handleEscape);
	}, [isOpen, onClose]);

	return (
		<Dialog ref={dialogRef}>
			<div className='grid justify-items-center gap-x-8 gap-y-4 sm:flex'>
				<SVG className='aspect-square w-72 *:fill-primary-500!' />
				<div className='w-72 self-center'>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
			</div>
			<LinkButton className='float-end rounded-md bg-primary-500 px-[1.5em] py-[0.75em] text-primary-100' onClick={() => onClose()}>
				Close
			</LinkButton>
		</Dialog>
	);
}