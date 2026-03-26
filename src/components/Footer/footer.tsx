import { Card } from '@/components/ui/card';
import { LinkButton } from '@/components/ui/link';
import Phadonia from '@/svg/phadonia.svg';
import Linkedin from '@/svg/linkedIn.svg';
import GitHub from '@/svg/gitHub.svg';
import Discord from '@/svg/discord.svg';

const links = {
	Settings: [
		{ path: '/settings/vscode', name: 'VSCode' },
		{ path: '/settings/firefox', name: 'Firefox' },
		{ path: '/settings/obsidian', name: 'Obsidian' },
	],
	About: [
		{ path: '/about#hero', name: 'Myself' },
		{ path: '/about#skills', name: 'Skills' },
		{ path: '/about#tools', name: 'Tools' },
	]
};

export const revalidate = 86400
export default function Footer() {
	return (
		<>
			<footer className='[--big-text:clamp(0rem,-0.85rem+21.25vw,17rem)] [--move:calc(var(--big-text)*0.4)] breakout-wrapper isolate overflow-clip bg-[linear-gradient(to_bottom,transparent_calc(var(--move)+4rem),var(--color-body-200)_calc(var(--move)+4rem)_calc(var(--move)+4rem+1px),var(--color-body-100)_calc(var(--move)+4rem+1px))]'>
				<div className='grid gap-8 translate-y-(--move)'>
					<Card as='section' className='grid gap-8 bg-body-200 border-body-300 p-16'>
						<div className='flex gap-4 flex-wrap justify-between'>
							<div className='grid gap-4'>
								<Phadonia className="*:fill-text-900 h-6"/>
								<p>Every project here started with the same thought: “This should be better.” So I made it better and shared it with the world.</p>
								<nav>
									<ul className='flex gap-3'>
										<li><LinkButton href="#" aria-label="Linkedin"><Linkedin className="text-text-600 size-6" /></LinkButton></li>
										<li><LinkButton href="#" aria-label="Github"><GitHub className="fill-text-600 size-6" /></LinkButton></li>
										<li><LinkButton href="#" aria-label="Discord"><Discord className="*:fill-text-600 size-6" /></LinkButton></li>
									</ul>
								</nav>
							</div>
							<nav className='flex gap-x-24 gap-y-4 flex-wrap'>
								{Object.entries(links).map(([groupName, groupLinks]) => (
									<div key={groupName}>
										<h3 className='text-text-800 mb-4'>{groupName}</h3>
										<ul className='grid gap-3'>
											{groupLinks.map((item, i) => (
												<li key={i}>
													<LinkButton href={item.path}>{item.name}</LinkButton>
												</li>
											))}
										</ul>
									</div>
								))}
							</nav>
						</div>
						<hr className='border-body-300' />
						<p>© {new Date().getFullYear()} <span className="text-text-800">Phadonia</span>. All rights reserved</p>
					</Card>
					<h2 className='font-(family-name:--sarif) text-transparent text-(length:--big-text) text-center font-black bg-[linear-gradient(to_bottom,var(--color-body-200),transparent_calc(100%*0.67))] bg-clip-text'>
						Phadonia
					</h2>
				</div>
			</footer>
		</>
	);
}
