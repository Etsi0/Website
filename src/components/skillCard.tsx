'use client';
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
				className='
					flex
					justify-center
					items-center
					flex-col
					gap-3
					bg-primary-600
					w-full
					aspect-[1/1.125]
					p-3
					rounded-lg
					shadow-lg

					hover:bg-primary-400
					hover:shadow-md
					focus-visible:bg-primary-400
					focus-visible:shadow-md
				'
				onClick={OpenDialog}
			>
				<div
					className='
						w-1/2
					'
				>
					{SVG}
				</div>
				<h3
					className='
						text-lg
						leading-5
						text-input
						text-center
					'
				>
					{title}
				</h3>
			</button>
			{modalSVG && (
				<dialog
					ref={dialogRef}
					className='
						bg-body
						p-8
						rounded-lg
						shadow-lg
						dark:shadow-[0px_5px_25px_-5px]
						dark:shadow-primary-500
					'
				>
					<div
						className='
						grid
						justify-items-center
						sm:flex
						gap-3
					'
					>
						{modalSVG}
						<div
							className='
								grid
								self-center
								gap-6
								sm:w-72
							'
						>
							<div>
								<h3>{title}</h3>
								{description}
							</div>
							<button
								className='
									justify-items-center
									sm:justify-self-end
									bg-primary-500
									text-input
									py-3
									px-9
									rounded-md
									hover:bg-primary-50
									hover:text-primary-500
									focus-visible:bg-primary-50
									focus-visible:text-primary-500
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
