'use client';
import { cn } from '@/lib/util';
import { useRef, useState } from 'react';

interface AppProps {
	SVG: JSX.Element;
	title: string;
	description: JSX.Element;
	modalSVG?: JSX.Element;
}

export default function App(props: AppProps) {
	const { SVG, title, description, modalSVG } = props;

	const dialogRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	function OpenDialog() {
		if (modalSVG) {
			isOpen ? dialogRef.current.close() : dialogRef.current.showModal();
			setIsOpen(!isOpen);
		}
	}

	return (
		<>
			<button
				className={cn(
					`flex aspect-[1/1.125] w-full flex-col items-center justify-center gap-3 rounded-lg bg-primary-600 p-3 shadow-lg hover:bg-primary-400 hover:shadow-inner focus-visible:bg-primary-400 focus-visible:shadow-md dark:bg-primary-400 dark:hover:bg-primary-600`,
				)}
				onClick={OpenDialog}
			>
				<div
					className='
						w-1/2
					'
				>
					{SVG}
				</div>
				<h3 className={cn(`text-center text-lg leading-5 text-input`)}>{title}</h3>
			</button>
			{modalSVG && (
				<dialog
					ref={dialogRef}
					className={cn(
						`rounded-lg bg-body p-8 shadow-lg dark:shadow-[0px_5px_25px_-5px] dark:shadow-primary-500`,
					)}
				>
					<div
						className='
						grid
						justify-items-center
						gap-3
						sm:flex
					'
					>
						{modalSVG}
						<div
							className='
								grid
								gap-6
								self-center
								sm:w-72
							'
						>
							<div
								className='
									grid
									gap-3
								'
							>
								<h3>{title}</h3>
								{description}
							</div>
							<button
								className='
									justify-items-center
									rounded-md
									bg-primary-500
									px-9
									py-3
									text-input
									hover:bg-primary-50
									hover:text-primary-500
									focus-visible:bg-primary-50
									focus-visible:text-primary-500
									sm:justify-self-end
								'
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
