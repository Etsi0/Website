import { ReactNode } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { cn } from '@/lib/util';
import { GetProjects, GetVersions, projectSchema, versionSchema } from '@/api/modrinth/main';
import { MinecraftModsJson } from '@/json/minecraft/minecraftModsJson';

type TGetMod = {
	project: (typeof MinecraftModsJson)[number] | z.infer<typeof projectSchema>[number];
	className: (typeof StrToColor)[keyof typeof StrToColor];
};

type TProject = z.infer<typeof projectSchema>[number];

const StrToColor = Object.freeze({
	green: 'bg-green-500 dark:bg-green-600',
	yellow: 'bg-yellow-500 dark:bg-yellow-600',
	red: 'bg-red-500 dark:bg-red-600',
});

async function Projects() {
	const projectIds = MinecraftModsJson.map((value) => value.Id).filter(
		(id) => typeof id === 'string'
	);
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
	return versions.sort((a, b) => {
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
		onlyFullReleases = project.game_versions
			.reverse()
			.filter((item: string) => !RegExp('[a-z]').test(item));

		const data = await Versions(project.id);
		if (!data) {
			return false;
		}

		latestVersion = data;
	}

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
	];

	return (
		<div className='flex w-72 flex-col gap-3 rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'>
			{('icon_url' in project && (
				<Image
					src={project.icon_url}
					alt={`logo for the mod called '${project.title}'`}
					width={192}
					height={192}
					className='mx-auto rounded-md bg-primary-50 dark:bg-body-300'
				/>
			)) || (
				<div className='mx-auto aspect-square w-48 rounded-md bg-primary-50 dark:bg-body-300'></div>
			)}
			<h2 className='overflow-hidden text-ellipsis text-center text-3xl'>{project.title}</h2>
			<ul className='grow'>
				{liContent
					.filter((item) => item.text)
					.map((item, index) => (
						<li key={index}>
							<h3 className='text-xl'>{item.title}</h3>
							<p className='line-clamp-3'>{item.text}</p>
						</li>
					))}
			</ul>
			<a
				href={
					'slug' in project
						? `https://modrinth.com/mod/${project.slug}/versions`
						: 'link' in project
							? `https://www.curseforge.com/minecraft/mc-mods/${project.link}`
							: ''
				}
				target='_blank'
				className='w-full rounded-md bg-primary-500 p-3 text-center text-input'
			>
				{project.title}
			</a>
			{(latestVersion && (
				<a
					href={latestVersion.files[0].url}
					target='_blank'
					className={cn(
						'w-full rounded-md bg-primary-500 p-3 text-center text-input',
						className
					)}
				>
					Fabric {latestVersion.game_versions[0]}
					{latestVersion.game_versions.length > 1 &&
						` - ${latestVersion.game_versions[latestVersion.game_versions.length - 1]}`}
				</a>
			)) || (
				<button
					disabled
					className='w-full cursor-not-allowed rounded-md bg-slate-500 p-3 text-slate-400'
				>
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

function ProjectIndex(index: number) {
	return (
		index -
		MinecraftModsJson.slice(0, index).reduce(
			(accumulator, currentValue) => accumulator + ('link' in currentValue ? 1 : 0),
			0
		)
	);
}

export default async function Page() {
	const sortedProjects = await Projects();
	if (!sortedProjects) {
		return;
	}

	return (
		<section className='grid gap-8 py-8 pt-16'>
			<div className='grid justify-items-center text-center'>
				<h1>Minecraft Mods</h1>
				<p>
					Mods listed bellow is what i recommend or use, look at the section that explains
					what the different colors means if you are confused
				</p>
			</div>
			<div className='grid gap-3 rounded-lg bg-body-50 p-6 dark:bg-body-200'>
				<DoneCategoryWrapper className={StrToColor['green']}>
					This icon indicates that i recommend these mods
				</DoneCategoryWrapper>
				<DoneCategoryWrapper className={StrToColor['yellow']}>
					This icon indicates that these mods are a dependency for another mod on this
					list
				</DoneCategoryWrapper>
				<DoneCategoryWrapper className={StrToColor['red']}>
					This icon indicates that I only recommend these mods for quick setup. (
					<a className='text-primary-500' href='https://optifine.net/downloads'>
						Optifine
					</a>
					)
				</DoneCategoryWrapper>
			</div>
			<div className='flex flex-wrap justify-center gap-5'>
				{MinecraftModsJson.map((project, index) => (
					<GetMod
						key={index}
						project={project.Id ? sortedProjects[ProjectIndex(index)] : project}
						className={StrToColor[project.Color]}
					/>
				))}
			</div>
		</section>
	);
}
