import SkillCard from '@/components/skillCard';

import creditJson from '@/components/creditJson';
import { cn } from '@/lib/util';

export default function App() {
	return (
		<>
			<section className={cn('grid justify-items-center pb-16')}>
				<div className={cn('py-16 text-center')}>
					<h1>Credit</h1>
					<p>
						All credit goes to the fantastic artists that created all of these
						incredible icons and illustrations.
					</p>
				</div>
				<div
					className={cn(
						'grid w-full grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-12 pt-3',
					)}
				>
					{creditJson().map((item, index) => (
						<SkillCard
							key={index}
							SVG={item.SVG}
							className='aspect-square text-input'
							title={item.title}
							description={item.description}
							modalClassName='aspect-square w-72 text-primary-500'
						/>
					))}
				</div>
			</section>
		</>
	);
}
