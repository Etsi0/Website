
import type { FC, SVGProps } from 'react';
import type { Metadata } from "next";
import { pageTitle } from "@/lib/pageTitle";
import { cn } from '@/lib/cn';
import Firefox from '@/svg/firefox.svg';
import Figma from '@/svg/figma.svg';
import Chrome from '@/svg/chrome.svg';
import Affinity from '@/svg/affinity.svg';
import Cursor from '@/svg/cursor.svg';
import { About } from '@/components/Home/sections/about';
import { Card } from '@/components/ui/card';
import { SilkWrapper } from "@/components/ui/silkWrapper";

type TTool = {
	name: string;
	svg: FC<SVGProps<SVGElement>>;
	className: string;
};

const tools: TTool[] = [
	{ name: 'Firefox', svg: Firefox, className: 'col-1 row-1' },
	{ name: 'Cursor', svg: Cursor, className: 'col-span-2 row-2 md:col-2 md:col-span-1 md:row-1 md:row-span-2' },
	{ name: 'Figma', svg: Figma, className: 'col-2 row-1 md:col-3' },
	{ name: 'Chrome', svg: Chrome, className: 'col-1 row-3 md:row-2' },
	{ name: 'Affinity', svg: Affinity, className: 'col-2 row-3 md:col-3 md:row-2' },
];

export const metadata: Metadata = {
	title: pageTitle("About"),
	description: 'Harnessing JavaScript to create game-changing digital experiences. Discover the innovation of a young Swedish developer.',
};

export default function Page() {
	return (
		<>
			<SilkWrapper>
				<About className='min-h-[min(62.5rem,100svh)]' heading='h1' showAboutMeLink={false} />
			</SilkWrapper>
			<div className='col-full bg-linear-to-r from-primary-100 via-primary-300 to-primary-100 via-[calc(50%-20rem)] h-[2px] dark:from-primary-900 dark:via-primary-700 dark:to-primary-900'></div>
			<section id='tools' className='grid gap-8 py-16'>
				<h2 className='mx-auto'>Tools I <span className='text-text-800 italic'>use</span></h2>
				<div className='grid grid-cols-2 grid-rows-3 gap-4 aspect-2/3 md:grid-cols-[1fr_2fr_1fr] md:grid-rows-2 md:aspect-[2.39/1]'>
					{tools.map(({ name, svg: Icon, className }) => (
						<Card
							key={name}
							className={cn('@container-size grid place-items-center', className)}
							aria-label={name}
						>
							<Icon className='size-[50cqmin] fill-current' />
						</Card>
					))}
				</div>
			</section>
		</>
	)
}