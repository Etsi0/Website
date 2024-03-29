'use client';
import { cn } from '@/lib/util';
import { useRef, useState } from 'react';
import { SvgList } from './SVGs';

interface AppProps {
	SVG: string;
	className: any;
	title: string;
	description: JSX.Element;
	modalClassName?: any;
}

export default function App(props: AppProps) {
	const { SVG, className, title, description, modalClassName } = props;

	const dialogRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	function OpenDialog() {
		if (modalClassName) {
			isOpen ? dialogRef.current.close() : dialogRef.current.showModal();
			setIsOpen(!isOpen);
		}
	}
	const Component = SvgList[SVG];
	return (
		<>
			<button
				className={cn(
					'group flex aspect-[1/1.125] w-full flex-col items-center justify-center gap-3 rounded-lg bg-primary-500 p-3 shadow-lg duration-300 hover:bg-body-50 hover:shadow-inner focus-visible:bg-body-50 focus-visible:shadow-inner focus-visible:outline-none dark:hover:bg-body-900 dark:focus-visible:bg-body-900',
				)}
				onClick={OpenDialog}
			>
				<div className={cn('w-1/2')}>
					<Component className={cn('', className)} />
				</div>
				<h3
					className={cn(
						'text-center text-lg leading-5 text-input group-hover:text-primary-500 group-focus-visible:text-primary-500 dark:group-hover:text-body-300 dark:group-focus-visible:text-body-300',
					)}
				>
					{title}
				</h3>
			</button>
			{modalClassName && (
				<dialog
					ref={dialogRef}
					className={cn(
						'rounded-lg bg-body p-8 shadow-lg dark:shadow-[0px_5px_25px_-5px] dark:shadow-primary-500',
					)}
				>
					<div className={cn('grid justify-items-center gap-3 sm:flex')}>
						<Component className={cn('', modalClassName)} />
						<div className={cn('grid gap-6 self-center sm:w-72')}>
							<div className={cn('grid gap-3')}>
								<h3>{title}</h3>
								{description}
							</div>
							<button
								className={cn(
									'justify-items-center rounded-md bg-primary-500 px-9 py-3 text-input hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500 sm:justify-self-end',
								)}
								onClick={OpenDialog}
							>
								Close
							</button>
						</div>
					</div>
				</dialog>
			)}
		</>
	);
}
