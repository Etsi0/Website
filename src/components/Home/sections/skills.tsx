import SkillCard from '@/components/skillCard';
import { SkillCardJson } from '@/json/home/skillCard';

export function Skills() {
	return (
		<>
			<section
				id='skills'
				className='bg-body-50 py-8 shadow-[0_0_0_100vmax_hsl(var(--body-color-50))] [clip-path:inset(0_-100vmax)] dark:bg-body-200 dark:shadow-[0_0_0_100vmax_hsl(var(--body-color-200))]'
			>
				<div className='grid justify-items-center'>
					<h2>Skills</h2>
					<p>My technical level</p>
				</div>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] gap-12 pt-3'>
					{SkillCardJson.map((item, index) => (
						<SkillCard
							key={index}
							CardSVG={
								<item.SVG className='aspect-square w-1/2 *:!fill-input group-hover:*:!fill-primary-500 group-focus-visible:*:!fill-primary-500 dark:group-hover:*:!fill-body-300 dark:group-focus-visible:*:!fill-body-300' />
							}
							DialogSVG={<item.SVG className='aspect-square w-72 *:!fill-primary-500' />}
							title={item.title}
							description={item.description}
						/>
					))}
				</div>
			</section>
		</>
	);
}
