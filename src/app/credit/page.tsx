import SkillCard from '@/components/skillCard';

import creditJson from '@/components/creditJson';

export default function App() {
	return (
		<>
			<section
				className='
					grid
					justify-items-center
				'
			>
				<div
					className='
						py-16
						text-center
					'
				>
					<h1>Credit</h1>
					<p>
						All credit goes to the fantastic artists that created all of these
						incredible icons and illustrations.
					</p>
				</div>
				<div
					className='
						grid
						grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]
						gap-12
						w-full
						pt-3
					'
				>
					{creditJson().map((item, index) => (
						<SkillCard
							SVG={<item.SVG svg='text-input' />}
							title={item.title}
							description={item.description}
							modalSVG={<item.SVG svg='text-main w-72' />}
						/>
					))}
				</div>
			</section>
		</>
	);
}
