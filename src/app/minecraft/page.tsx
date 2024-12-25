import { ReactNode } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { GetDependencies, GetProjects, GetVersions } from '@/api/modrinth/main';
// import FilterContext from '@/context/minecraft/filterContext';
import { versionSchema } from '@/schema/minecraft/main';
import { TProject } from '@/types/minecraft/main';
import { cn, createCounter } from '@/lib/util';
import { MinecraftModsJson } from '@/json/minecraft/minecraftModsJson';
// import { Filter } from '@/components/minecraft/filter';

const StrToColor = Object.freeze({
	green: 'bg-green-500 dark:bg-green-600',
	yellow: 'bg-yellow-500 dark:bg-yellow-600',
	red: 'bg-red-500 dark:bg-red-600',
});

type TGetMod = {
	project: (typeof MinecraftModsJson)[number] | TProject;
	className: (typeof StrToColor)[keyof typeof StrToColor];
};

async function Projects() {
	const projectIds = MinecraftModsJson.flatMap((value) => ('id' in value ? [value.id] : []));
	if (projectIds.length === 0) {
		return false;
	}

	const data = await GetProjects(projectIds);
	if (!data) {
		return false;
	}

	const projectMap = data.reduce(
		(accumulator, currentValue) => {
			accumulator[currentValue.id] = currentValue;
			return accumulator;
		},
		{} as Record<string, TProject>
	);
	return projectIds.map((id) => projectMap[id]);
}

async function Versions(id: string) {
	const data = await GetVersions(id);
	if (!data) {
		return false;
	}

	const sortedVersion = data.sort((a, b) => {
		const aMax = getHighestVersion(a.game_versions);
		const bMax = getHighestVersion(b.game_versions);
		if (aMax > bMax) return -1;
		if (aMax < bMax) return 1;
		return 0;
	});

	return sortedVersion[0];
}

function getHighestVersion(versions: string[]) {
	const validVersions = versions.filter((version) => /^[0-9.]+$/.test(version));

	return validVersions.sort((a, b) => {
		const aParts = parseVersion(a);
		const bParts = parseVersion(b);
		for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
			const aValue = aParts[i] || 0;
			const bValue = bParts[i] || 0;
			if (aValue > bValue) return -1;
			if (aValue < bValue) return 1;
		}
		return 0;
	})[0];
}

function parseVersion(version: string): number[] {
	return version.split('.').map((x) => parseInt(x, 10));
}

async function GetMod({ project, className }: TGetMod) {
	let onlyFullReleases: string[] = [];
	let latestVersion: z.infer<typeof versionSchema>[number] | undefined;
	if ('game_versions' in project) {
		onlyFullReleases = project.game_versions.reverse().filter((version: string) => /^[0-9.]+$/.test(version));

		const data = await Versions(project.id);
		if (!data) {
			return false;
		}

		latestVersion = data;
	}

	const dependencies = 'id' in project ? await GetDependencies(project.id) : false;

	const liContent = [
		{
			title: 'Categories:',
			text: 'categories' in project ? project.categories?.join(', ') : '',
		},
		{
			title: 'Versions:',
			text: onlyFullReleases.join(', '),
		},
		{
			title: 'Updated:',
			text: latestVersion?.date_published.slice(0, 10),
		},
		{
			title: 'Loaders:',
			text: 'loaders' in project ? project.loaders?.join(', ') : '',
		},
		{
			title: 'Dependencies:',
			list: dependencies
				? dependencies.projects.flatMap((item) => (
						<li>
							<a className='text-primary-500' href={`#${item.id}`}>
								{item.title}
							</a>
						</li>
					))
				: false,
		},
	];

	return (
		<div id={'id' in project ? project.id : project.title} className='flex w-72 flex-col gap-3 rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'>
			{('icon_url' in project && (
				<Image src={project.icon_url} alt={`logo for the mod called '${project.title}'`} width={192} height={192} className='mx-auto rounded-md bg-primary-50 dark:bg-body-300' />
			)) || <div className='mx-auto aspect-square w-48 rounded-md bg-primary-50 dark:bg-body-300'></div>}
			<h2 className='overflow-hidden text-ellipsis text-center text-3xl'>{project.title}</h2>
			<ul className='grow'>
				{liContent
					.filter((item) => item.text || item.list)
					.map((item, index) => (
						<li key={index}>
							<h3 className='text-xl'>{item.title}</h3>
							<p className='line-clamp-3'>{item.text}</p>
							<ul>{item.list}</ul>
						</li>
					))}
			</ul>
			<a
				href={'slug' in project ? `https://modrinth.com/mod/${project.slug}/versions` : 'link' in project ? `https://www.curseforge.com/minecraft/mc-mods/${project.link}` : ''}
				target='_blank'
				className='w-full rounded-md bg-primary-500 p-3 text-center text-input'
			>
				{project.title}
			</a>
			{(latestVersion && (
				<a href={latestVersion.files[0].url} target='_blank' className={cn('w-full rounded-md bg-primary-500 p-3 text-center text-input', className)}>
					Fabric {latestVersion.game_versions[0]}
					{latestVersion.game_versions.length > 1 && ` - ${latestVersion.game_versions[latestVersion.game_versions.length - 1]}`}
				</a>
			)) || (
				<button disabled className='w-full cursor-not-allowed rounded-md bg-slate-500 p-3 text-slate-400'>
					NaN
				</button>
			)}
		</div>
	);
}

function DoneCategoryWrapper({ className, children }: { className: string; children: ReactNode }) {
	return (
		<div className='flex gap-2'>
			<div className={cn('size-6 shrink-0 rounded-md bg-primary-500', className)}></div>
			<p className='max-w-none'>{children}</p>
		</div>
	);
}

export default async function Page() {
	const sortedProjects = await Projects();
	if (!sortedProjects) {
		return;
	}

	const counter = createCounter();

	return (
		<section className='grid gap-8 py-8 pt-16'>
			<div className='grid justify-items-center text-center'>
				<h1>Minecraft Mods</h1>
				<p>Mods listed bellow is what i recommend or use, look at the section that explains what the different colors means if you are confused</p>
			</div>
			<div className='grid gap-3 rounded-lg bg-body-50 p-6 dark:bg-body-200'>
				<DoneCategoryWrapper className={StrToColor['green']}>This icon indicates that i recommend these mods</DoneCategoryWrapper>
				<DoneCategoryWrapper className={StrToColor['yellow']}>This icon indicates that these mods are a dependency for another mod on this list</DoneCategoryWrapper>
				<DoneCategoryWrapper className={StrToColor['red']}>
					This icon indicates that I only recommend these mods for quick setup. (
					<a className='text-primary-500' href='https://optifine.net/downloads'>
						Optifine
					</a>
					)
				</DoneCategoryWrapper>
			</div>
			<div className='relative flex flex-wrap justify-center gap-5'>
				{/* <FilterContext projects={sortedProjects}>
					<Filter /> */}
				{MinecraftModsJson.map((project, index) => (
					<GetMod key={index} project={'id' in project ? sortedProjects[counter()] : project} className={StrToColor[project.color]} />
				))}
				{/* </FilterContext> */}
			</div>
		</section>
	);
}
