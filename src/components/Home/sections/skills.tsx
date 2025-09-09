import { SkillCards } from '@/components/skillCard';

export function Skills() {
	return (
		<>
			<section
				id='skills'
				className='bg-body-50 py-8 shadow-[0_0_0_100vmax_oklch(var(--body-color-50))] [clip-path:inset(0_-100vmax)] dark:bg-body-200 dark:shadow-[0_0_0_100vmax_oklch(var(--body-color-200))]'
			>
				<div className='grid justify-items-center'>
					<h2>Skills</h2>
					<p>My technical level</p>
				</div>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-12 pt-3'>
					<SkillCards />
				</div>
			</section>
		</>
	);
}
