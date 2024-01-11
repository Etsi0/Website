'use client';
import { useRef, useState } from 'react';

interface AppProps {
	SVG: React.ElementType<any, any>;
	title: string;
	description: string;
	modalSVG?: React.ElementType<any, any>;
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
					bg-main-darker
					aspect-[1/1.125]
					p-3
					rounded-lg
					shadow-lg

					hover:brightness-90
					hover:shadow-md
					focus-visible:brightness-90
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
					dark:shadow-main
				'
				>
					<div
						className='
						flex
					'
					>
						{modalSVG}
						<div
							className='
							grid
							self-center
							gap-3
						'
						>
							<h3>{title}</h3>
							<p>{description}</p>
							<button
								className='
								justify-self-end
								bg-main
								text-input
								py-3
								px-9
								rounded-md
								hover:bg-main-lighter
								hover:text-main
								focus-visible:bg-main-lighter
								focus-visible:text-main
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
