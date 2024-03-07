import { cn } from '@/lib/util';
import { ReactNode } from 'react';
import { MinecraftModsJson } from '@/components/Minecraft/minecraftModsJson';

type IDoneCategoryWrapper = {
	className: string;
	children: ReactNode;
};
type IGetMod = {
	project: any;
	className: (typeof StrToColor)[keyof typeof StrToColor];
};

const Revalidate = 3600 as const;
const StrToColor = {
	green: 'bg-green-500 dark:bg-green-600',
	yellow: 'bg-yellow-500 dark:bg-yellow-600',
	red: 'bg-red-500 dark:bg-red-600',
} as const;

function DoneCategoryWrapper({ className, children }: IDoneCategoryWrapper) {
	return (
		<div className={cn(`flex items-start gap-2`)}>
			<div className={cn(`size-6 shrink-0 rounded-md bg-primary-500`, className)}></div>
			{children}
		</div>
	);
}
async function getFromAPI(href: string) {
	const response = await fetch(href, {
		method: 'GET',
		next: { revalidate: Revalidate },
	});
	return await response.json();
}
async function GetMod({ project, className }: IGetMod) {
	let onlyFullReleases;
	let latestVersion;
	if (project.game_versions) {
		onlyFullReleases = project.game_versions
			.reverse()
			.filter((item) => /[a-z]/.exec(item) === null);

		const version = await getFromAPI(
			`http://localhost:3000/api/modrinth/getVersion?query=${encodeURIComponent(project.id)}&versions=${encodeURIComponent(onlyFullReleases[0])}`,
		);
		latestVersion = version[0];
	}

	return (
		<div
			className={cn(
				`flex w-72 flex-col gap-3 rounded-lg bg-primary-50 p-4 shadow-lg dark:bg-[hsl(240_12_20)]`,
			)}
		>
			{project.icon_url && (
				<img
					src={project.icon_url}
					alt={`logo for the mod called '${project.title}'`}
					className={cn(
						`mx-auto w-48 rounded-md bg-primary-100 dark:bg-[hsl(240_12_25)]`,
					)}
				/>
			)}
			<h2 className={cn(`overflow-hidden text-ellipsis text-center text-3xl`)}>
				{project.title}
			</h2>
			<ul className={cn(`grow`)}>
				{project.categories && project.categories.length !== 0 && (
					<li>
						<h3 className={cn(`text-xl`)}>Categories:</h3>
						<p className={cn(`flex flex-wrap gap-1`)}>
							{project.categories.join(', ')}
						</p>
					</li>
				)}
				{onlyFullReleases && onlyFullReleases.length !== 0 && (
					<li>
						<h3 className={cn(`text-xl`)}>Versions:</h3>
						<p className={cn(`line-clamp-3`)}>{onlyFullReleases.join(', ')}</p>
					</li>
				)}
				{project.loaders && project.loaders.length !== 0 && (
					<li>
						<h3 className={cn(`text-xl`)}>Loaders:</h3>
						<p className={cn(`flex flex-wrap gap-1`)}>{project.loaders.join(', ')}</p>
					</li>
				)}
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
					className={cn(`w-full rounded-md bg-slate-500 p-3 text-slate-400`)}
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
		`http://localhost:3000/api/modrinth/getProject?query=${encodeURIComponent(JSON.stringify(projectId))}`,
	);

	return (
		<section className={cn(`grid gap-8 py-8 pt-16`)}>
			<div className={cn(`grid justify-items-center text-center`)}>
				<h1>Minecraft Mods</h1>
				<p>
					Mods listed bellow is what i recommend or use, look at the section that explains
					what the different colors of icons means if you are confused
				</p>
			</div>
			<div className={cn(`grid gap-3 rounded-lg bg-primary-300 p-6 text-primary-900`)}>
				<DoneCategoryWrapper className={StrToColor['green']}>
					<p className={cn(`max-w-none`)}>
						This icon indicates that i recommend these mods
					</p>
				</DoneCategoryWrapper>
				<DoneCategoryWrapper className={StrToColor['yellow']}>
					<p className={cn(`max-w-none`)}>
						This icon indicates that these mods are a dependency for other mods
					</p>
				</DoneCategoryWrapper>
				<DoneCategoryWrapper className={StrToColor['red']}>
					<p className={cn(`max-w-none`)}>
						This icon indicates that I only recommend these mods for quick setup.
					</p>
				</DoneCategoryWrapper>
			</div>
			<div className={cn(`flex flex-wrap justify-center gap-5`)}>
				{MinecraftModsJson.map(
					(project, index) =>
						(project.Id && (
							<GetMod
								key={index}
								project={projects[ProjectIndex(index)]}
								className={StrToColor[project.Color]}
							/>
						)) || (
							<GetMod
								key={index}
								project={project}
								className={StrToColor[project.Color]}
							/>
						),
				)}
			</div>
		</section>
	);
}
