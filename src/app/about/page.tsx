
import type { Metadata } from "next";
import { pageTitle } from "@/lib/pageTitle";
import { About } from '@/components/Home/sections/about';
import { SilkWrapper } from "@/components/ui/silkWrapper";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
	title: pageTitle("About"),
	description: 'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default function Page() {
	return (
		<>
			<SilkWrapper>
				<About className='min-h-[min(62.5rem,100svh)]' heading='h1' />
			</SilkWrapper>
			<div className='col-full bg-linear-to-r from-primary-100 via-primary-300 to-primary-100 via-[calc(50%-20rem)] h-[2px] dark:from-primary-900 dark:via-primary-700 dark:to-primary-900'></div>
			<section id='skills' className='py-16'>
				<h2>Software <span className='text-text-800 italic'>skills</span></h2>
			</section>
			<section id='tools' className='py-16'>
				<h2>Tools I <span className='text-text-800 italic'>use</span></h2>
				<div className='grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
					{[
						'VS Code',
						'Figma',
						'Photopea',
						'Obsidian',
					].map((name) => (
						<Card key={name} className='p-4 flex items-center justify-center'>
							<h3>{name}</h3>
						</Card>
					))}
				</div>
			</section>
		</>
	)
}