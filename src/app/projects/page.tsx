import type { Metadata } from 'next';
import { pageTitle } from '@/lib/pageTitle';
import { projects } from '@/json/projects';
import { ProjectCard, ProjectCardFilters } from '@/components/ui/projectCard';

export const metadata: Metadata = {
	title: pageTitle('Projects'),
	description: 'Every project I have built and shared with the world, from browser extensions and VSCode extensions to games, tools and this very website.',
};

export default function Page() {
	return (
		<>
			<ProjectCardFilters />
			<section id='projects' className='grid gap-8 py-16 pt-(--header-offset)'>
				<div className='grid justify-items-center gap-3 text-center'>
					<h1>All my <span className='italic text-body-850 dark:text-body-150'>projects</span></h1>
					<p>Every one of these started with the same thought: “This should be better.” Here is everything I have built and shared, big and small.</p>
				</div>
				<div className='[--max-width:21.24rem] grid gap-5 grid-cols-[minmax(0,var(--max-width))] justify-center w-full md:grid-cols-[repeat(2,minmax(0,var(--max-width)))] lg:grid-cols-[repeat(3,minmax(0,var(--max-width)))]'>
					{projects.map((project) => (
						<ProjectCard key={project.title} {...project} />
					))}
				</div>
			</section>
		</>
	);
}
