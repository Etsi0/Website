export default function Footer() {
	return (
		<>
			<footer
				className='
					bg-primary-500
				'
			>
				<hr />
				<div
					className='
						grid
						justify-items-center
						py-16
					'
				>
					<p
						className='
							text-white
						'
					>
						Phadonia | 2022 - {new Date().getFullYear()}
					</p>
				</div>
			</footer>
		</>
	);
}
