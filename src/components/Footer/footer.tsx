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
		{ path: '/about#about', name: 'Myself' },
		{ path: '/about#about', name: 'Work' },
		{ path: '/about#tools', name: 'Stack' },
		{ path: '#contact', name: 'Contact' },
	]
};

export const revalidate = 86400
export default function Footer() {
	return (
		<>
			<footer className='[--big-text:clamp(0rem,-0.85rem+21.25vw,17rem)] [--move:calc(var(--big-text)*0.25)] [--footer-line:var(--color-body-150)] [--footer-bg:var(--color-body-white)] [--fade:var(--color-body-100)] dark:[--footer-line:var(--color-body-850)] dark:[--footer-bg:var(--color-body-900)] dark:[--fade:transparent] breakout-wrapper isolate overflow-clip bg-[linear-gradient(to_bottom,transparent,var(--fade)_calc(var(--move)+4rem),var(--footer-line)_calc(var(--move)+4rem)_calc(var(--move)+4rem+1px),var(--footer-bg)_calc(var(--move)+4rem+1px))]'>
				<div className='grid gap-8 translate-y-(--move)'>
					<Card as='section' className='grid gap-8 bg-body-50 border-body-100 p-16 dark:bg-body-850 dark:border-body-800'>
						<div className='flex gap-4 flex-wrap justify-between'>
							<div className='grid gap-4 justify-items-start content-start'>
								<LinkButton
									className='rounded-xs outline-offset-4'
									href='/'
									aria-label='Home, Phadonia'
								>
									<Phadonia className="*:fill-body-900 dark:*:fill-body-100 h-6" aria-hidden="true" />
								</LinkButton>
								<p>Every project here started with the same thought: “This should be better.” So I made it better and shared it with the world.</p>
								<nav id='contact' aria-label="Socials">
									<ul className='flex gap-3'>
										<li><LinkButton href="https://www.linkedin.com/in/albinkarlsson2003/" aria-label="LinkedIn"><Linkedin className="text-body-600 dark:text-body-400 size-6" aria-hidden="true" /></LinkButton></li>
										<li><LinkButton href="https://github.com/Etsi0" aria-label="GitHub"><GitHub className="fill-body-600 dark:fill-body-400 size-6" aria-hidden="true" /></LinkButton></li>
										<li><LinkButton href="https://discordapp.com/users/850433812089012335" aria-label="Discord"><Discord className="*:fill-body-600 dark:*:fill-body-400 size-6" aria-hidden="true" /></LinkButton></li>
									</ul>
								</nav>
							</div>
							<nav className='flex gap-x-24 gap-y-4 flex-wrap' aria-label='Sitemap'>
								{Object.entries(links).map(([groupName, groupLinks]) => (
									<div key={groupName}>
										<h3 className='text-body-800 dark:text-body-200 mb-4'>{groupName}</h3>
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
						<hr className='border-body-300 dark:border-body-700' />
						<p>© {new Date().getFullYear()} <span className="text-body-800 dark:text-body-200">Phadonia</span>. All rights reserved</p>
					</Card>
					<div aria-hidden="true" className='[text-box:trim-both_text_alphabetic] supports-[text-box:trim-both_ideographic-ink_alphabetic]:[text-box:trim-both_ideographic-ink_alphabetic] font-(family-name:--sarif) text-transparent text-(length:--big-text) text-center font-black bg-[linear-gradient(to_bottom,var(--footer-line),transparent_calc(100%-.5ex))] bg-clip-text'>
						Phadonia
					</div>
				</div>
			</footer>
		</>
	);
}
