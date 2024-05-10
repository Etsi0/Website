import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/util';
import { MinecraftModsJson } from '@/json/minecraft/minecraftModsJson';

type IDoneCategoryWrapper = {
	className: string;
	children: ReactNode;
};
type IGetMod = {
	project: any;
	className: (typeof StrToColor)[keyof typeof StrToColor];
};

const StrToColor = {
	green: 'bg-green-500 dark:bg-green-600',
	yellow: 'bg-yellow-500 dark:bg-yellow-600',
	red: 'bg-red-500 dark:bg-red-600',
} as const;

function DoneCategoryWrapper({ className, children }: IDoneCategoryWrapper) {
	return (
		<div className={cn('flex items-start gap-2')}>
			<div className={cn('size-6 shrink-0 rounded-md bg-primary-500', className)}></div>
			<p className={cn('max-w-none')}>{children}</p>
		</div>
	);
}
async function getFromAPI(href: string) {
	const response = await fetch(`https://api.modrinth.com/v2/${href}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
	});
	return await response.json();
}
async function GetMod({ project, className }: IGetMod) {
	let onlyFullReleases: string[];
	let latestVersion: any;
	if (project.game_versions) {
		onlyFullReleases = project.game_versions
			.reverse()
			.filter((item: string) => !/[a-z]/.test(item));

		try {
			const version = await getFromAPI(
				`project/${encodeURIComponent(project.id)}/version?loaders=["fabric"]&featured=true`,
			);
			latestVersion = version[0];
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
			text: onlyFullReleases?.join(', '),
		},
		{
			title: 'Updated:',
			text: latestVersion?.date_published.slice(0, 10),
		},
		{
			title: 'Loaders:',
			text: project.loaders?.join(', '),
		},
	];

	return (
		<div
			className={cn(
				`flex w-72 flex-col gap-3 rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200`,
			)}
		>
			{(project.icon_url && (
				<Image
					src={project.icon_url}
					alt={`logo for the mod called '${project.title}'`}
					width={192}
					height={192}
					className={cn(`mx-auto rounded-md bg-primary-50 dark:bg-body-300`)}
				/>
			)) || (
				<div
					className={cn(
						'mx-auto aspect-square w-48 rounded-md bg-primary-50 dark:bg-body-300',
					)}
				></div>
			)}
			<h2 className={cn('overflow-hidden text-ellipsis text-center text-3xl')}>
				{project.title}
			</h2>
			<ul className={cn('grow')}>
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
					className={cn(`w-full rounded-md bg-primary-500 p-3 text-center text-input`)}
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
						className,
					)}
				>
					Fabric {latestVersion.game_versions[0]}
					{latestVersion.game_versions.length > 1 &&
						` - ${latestVersion.game_versions[latestVersion.game_versions.length - 1]}`}
				</a>
			)) || (
				<button
					disabled
					className={cn(
						`w-full cursor-not-allowed rounded-md bg-slate-500 p-3 text-slate-400`,
					)}
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
	const projects = await getFromAPI(
		`projects?ids=${encodeURIComponent(JSON.stringify(projectId))}`,
	);

	const projectMap = projects.reduce((accumulator, project) => {
		accumulator[project.id] = project;
		return accumulator;
	}, {});
	const sortedProjects = projectId.map((id: string) => projectMap[id]);

	return (
		<section className={cn(`grid gap-8 py-8 pt-16`)}>
			<div className={cn(`grid justify-items-center text-center`)}>
				<h1>Minecraft Mods</h1>
				<p>
					Mods listed bellow is what i recommend or use, look at the section that explains
					what the different colors means if you are confused
				</p>
			</div>
			<div className={cn(`grid gap-3 rounded-lg bg-body-50 p-6 dark:bg-body-200`)}>
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
			<div className={cn(`flex flex-wrap justify-center gap-5`)}>
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
