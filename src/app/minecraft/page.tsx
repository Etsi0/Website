import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/util';
import { GetFromAPI } from '@/api/modrinth/main';
import { MinecraftModsJson } from '@/json/minecraft/minecraftModsJson';
import { z } from 'zod';

type TDoneCategoryWrapper = {
	className: string;
	children: ReactNode;
};
type TGetMod = {
	project: any;
	className: (typeof StrToColor)[keyof typeof StrToColor];
};

const StrToColor = Object.freeze({
	green: 'bg-green-500 dark:bg-green-600',
	yellow: 'bg-yellow-500 dark:bg-yellow-600',
	red: 'bg-red-500 dark:bg-red-600',
});

const projectSchema = z.array(
	z.object({
		categories: z.array(z.string()),
		game_versions: z.array(z.string()),
		icon_url: z.string(),
		id: z.string(),
		loaders: z.array(z.string()),
		slug: z.string(),
		title: z.string(),
	})
);
type TProject = z.infer<typeof projectSchema>[number];

const versionSchema = z.array(
	z.object({
		date_published: z.string(),
		files: z.array(
			z.object({
				url: z.string(),
			})
		),
		game_versions: z.array(z.string()),
	})
);

function DoneCategoryWrapper({ className, children }: TDoneCategoryWrapper) {
	return (
		<div className='flex gap-2'>
			<div className={cn('size-6 shrink-0 rounded-md bg-primary-500', className)}></div>
			<p className='max-w-none'>{children}</p>
		</div>
	);
}

// Helper function to find the highest version in an array
function getHighestVersion(versions: string[]) {
	return versions.sort((a, b) => {
		const aParts = a.split('.').map((x) => parseInt(x, 10));
		const bParts = b.split('.').map((x) => parseInt(x, 10));
		for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
			const aValue = aParts[i] || 0;
			const bValue = bParts[i] || 0;
			if (aValue > bValue) return -1;
			if (aValue < bValue) return 1;
		}
		return 0;
	})[0];
}

async function GetMod({ project, className }: TGetMod) {
	let onlyFullReleases: string[] = [];
	let latestVersion: z.infer<typeof versionSchema>[number] = {
		date_published: '',
		files: [
			{
				url: '',
			},
		],
		game_versions: [''],
	};
	if (project.game_versions) {
		onlyFullReleases = project.game_versions
			.reverse()
			.filter((item: string) => !/[a-z]/.test(item));

		try {
			const version: unknown = await GetFromAPI(
				`project/${encodeURIComponent(project.id)}/version?loaders=["fabric"]&featured=true`
			);
			const parsedVersion = versionSchema.safeParse(version);
			if (!parsedVersion.success) {
				return false;
			}
			const { data } = parsedVersion;

			// Sort the data array
			const sortedVersion = data.sort((a, b) => {
				const aMax = getHighestVersion(a.game_versions);
				const bMax = getHighestVersion(b.game_versions);
				if (aMax > bMax) return -1;
				if (aMax < bMax) return 1;
				return 0;
			});

			latestVersion = sortedVersion[0];
		} catch (error) {
			console.error('Error fetching version data:', error);
		}
	}
	const liContent = [
		{
			title: 'Categories:',
			text: project.categories?.join(', '),
		},
		{
			title: 'Versions:',
			text: onlyFullReleases.join(', '),
		},
		{
			title: 'Updated:',
			text: latestVersion.date_published.slice(0, 10),
		},
		{
			title: 'Loaders:',
			text: project.loaders?.join(', '),
		},
	];

	return (
		<div className='flex w-72 flex-col gap-3 rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'>
			{(project.icon_url && (
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
			{(project.slug || project.link) && (
				<a
					href={
						project.slug
							? `https://modrinth.com/mod/${project.slug}/versions`
							: project.link
								? `https://www.curseforge.com/minecraft/mc-mods/${project.link}`
								: ''
					}
					target='_blank'
					className='w-full rounded-md bg-primary-500 p-3 text-center text-input'
				>
					{project.title}
				</a>
			)}
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
function ProjectIndex(index: number) {
	return index - MinecraftModsJson.slice(0, index).filter((value) => 'link' in value).length;
}
export default async function Page() {
	const projectId = MinecraftModsJson.filter((value) => 'Id' in value).map((value) => value.Id);
	const projects: unknown = await GetFromAPI(
		`projects?ids=${encodeURIComponent(JSON.stringify(projectId))}`
	);
	const parsedProjects = projectSchema.safeParse(projects);
	if (!parsedProjects.success) {
		return false;
	}
	const { data } = parsedProjects;

	const projectMap = data.reduce((accumulator: Record<string, TProject>, project: TProject) => {
		accumulator[project.id] = project;
		return accumulator;
	}, {});
	const sortedProjects = projectId
		.filter((id): id is string => id !== undefined)
		.map((id: string) => projectMap[id]);

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
