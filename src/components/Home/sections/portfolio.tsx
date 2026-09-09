import ArrowOutward from '@/svg/materialDesignIcons/rounded/arrow_outward.svg';
import { highlightedProjects } from '@/json/projects';
import { LinkButton } from '@/components/ui/link';
import { ProjectCard, ProjectCardFilters } from '@/components/ui/projectCard';

export function Portfolio() {
	return (
		<>
			<ProjectCardFilters />
			<section id='portfolio' className='grid gap-8 py-16 mx-auto'>
				<div className='flex justify-between items-center'>
					<h2>Highlighted <span className='italic text-body-850 dark:text-body-150'>Projects</span></h2>
					<LinkButton
						href='/projects'
						className='text-body-850 dark:text-body-150 text-custom-lg rounded-xs tracking-wider'
						isButton
					>
						View All <ArrowOutward className="inline-block fill-current" aria-hidden="true" />
					</LinkButton>
				</div>
				<div className='[--max-width:21.24rem] grid gap-5 grid-cols-[minmax(0,var(--max-width))] justify-center w-full lg:grid-cols-[repeat(3,minmax(0,var(--max-width)))]'>
					{highlightedProjects.map((project) => (
						<ProjectCard key={project.title} {...project} />
					))}
				</div>
			</section>
		</>
	);
}
