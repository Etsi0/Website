'use client';

import type { ReactNode } from 'react';
import { LinkButton } from '@/components/ui/link';
import { Tabs } from '@/components/ui/tab';

function noteClass() {
	return 'text-text-600 text-sm pl-4 border-l-2 border-primary-400 my-4 spacing-y-3';
}

type TTphHubProps = {
	gitCommands: ReactNode;
};

export function TphHub({ gitCommands }: TTphHubProps) {
	return (
		<section className='pt-(--header-offset) space-y-8 [&_a]:text-primary-600 dark:[&_a]:text-primary-400'>
			<div className='text-center space-y-3'>
				<h1>TPH learning resources</h1>
				<p className='mx-auto'>Curated links for the Discord server — pick a track below.</p>
			</div>
			<Tabs
				name="test"
				items={[
					{
						title: "Design",
						content: (
							<>
								<div className='space-y-2'>
									<h2>Design tools</h2>
									<p>Use these for UI work, icons, and vector assets. Export or hand off assets for the web when you move into front end.</p>
									<ul className='list-disc pl-4 space-y-2'>
										<li>
											<LinkButton href='https://www.figma.com/'>Figma</LinkButton>
										</li>
										<li>
											<LinkButton href='https://penpot.app/'>Penpot</LinkButton>
										</li>
										<li>
											<LinkButton href='https://www.affinity.studio/'>Affinity</LinkButton>
										</li>
										<li>
											<LinkButton href='https://inkscape.org/'>Inkscape</LinkButton>
										</li>
									</ul>
								</div>
								<div className='space-y-2'>
									<h2>SVG</h2>
									<ul className='list-disc pl-4 space-y-2'>
										<li>
											<LinkButton href='https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/'>
												Friendly introduction to SVG (Josh Comeau)
											</LinkButton>
										</li>
										<li>
											<LinkButton href='https://svgomg.net/'>SVGOMG — optimizer</LinkButton>
										</li>
									</ul>
								</div>
							</>
						)
					},
					{
						title: "Front end",
						content: (
							<>
								<h2 className='text-center'>🚨 Do not use AI if you actually want to learn how to code 🚨</h2>

								<div>
									<h2 className='text-text-900 text-lg font-semibold'>Docs</h2>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>
											<LinkButton href='https://developer.mozilla.org/en-US/'>MDN</LinkButton> (Mozilla) {'<-'} personal favorit
										</li>
										<li>
											<LinkButton href='https://web.dev/learn/'>web.dev</LinkButton> (Google)
										</li>
									</ul>
									<div className={noteClass()}>
										<p>Avoid W3Schools — some information there is outdated.</p>
										<p>
											Bonus: add
											{' '}
											<code className='text-xs bg-body-100 px-1 rounded-sm'>
												-site:w3schools.com
											</code>
											{' '}
											to searches to filter W3Schools out (may not work on every search engine). Or use a custom
											search URL — replace
											{' '}
											<code className='text-xs bg-body-100 px-1 rounded-sm'>
												%s
											</code>
											{' '}
											with your query in the browser&apos;s keyword search settings:
										</p>
										<ul className='list-disc pl-5 space-y-1'>
											<li><LinkButton href='https://www.google.com/search?udm=14&q=%s%20-site:w3schools.com'>https://www.google.com/search?udm=14&q=%s%20-site:w3schools.com</LinkButton> (example template)</li>
											<li><LinkButton href='https://search.brave.com/search?q=%s%20-w3schools'>https://search.brave.com/search?q=%s%20-w3schools</LinkButton> (different operator example)</li>
											<li><LinkButton href='https://search.phadonia.com/?q=%s%20-site:w3schools.com'>https://search.phadonia.com/?q=%s%20-site:w3schools.com</LinkButton> (personal default)</li>
										</ul>
										<p>
											<span className='font-medium text-text-800'>How do I add a custom search engine?</span>{' '}
											Search it up — your browser&apos;s docs explain keyword URLs.
										</p>
									</div>
								</div>

								<div>
									<h2 className='text-text-900 text-lg font-semibold'>Courses / roadmaps</h2>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li><LinkButton href='https://www.youtube.com/watch?v=1L2YiWdaUDM&list=PL4-IK0AVhVjOJs_UjdQeyEZ_cmEV3uJvx'>YouTube course (playlist)</LinkButton></li>
										<li><LinkButton href='https://www.theodinproject.com/'>The Odin Project</LinkButton></li>
										<li><LinkButton href='https://www.freecodecamp.org/'>freeCodeCamp</LinkButton></li>
										<li><LinkButton href='https://roadmap.sh/'>roadmap.sh</LinkButton></li>
										<li><LinkButton href='https://pll.harvard.edu/course/cs50-introduction-computer-science'>CS50x</LinkButton> (not web-specific)</li>
									</ul>
									<p className={noteClass()}>
										Don{"'"}t follow the instructor blindly, ask yourself why they did what they did. If you
										don{"'"}t understand what they did, read
										{' '}
										<LinkButton href='https://developer.mozilla.org/en-US/'>MDN</LinkButton> or
										{' '}
										<LinkButton href='https://web.dev/learn/'>web.dev</LinkButton>; if you are still stuck, ask your question on
										{' '}
										<LinkButton href='https://discord.gg/programming'>TPH</LinkButton>.
									</p>
								</div>

								<div>
									<h2 className='text-text-900 text-lg font-semibold'>Resources</h2>

									<h3 className='text-text-900 font-medium mt-4 mb-2'>CSS</h3>
									<ul className='list-disc pl-5 space-y-3'>
										<li>
											<strong className='text-text-800'>Selectors</strong>
											<ul className='list-disc pl-5 mt-1 space-y-1'>
												<li>
													Game:{' '}
													<LinkButton href='https://flukeout.github.io/'>CSS Diner</LinkButton>
												</li>
												<li>
													Article:{' '}
													<LinkButton href='https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors'>
														MDN — CSS selectors
													</LinkButton>
												</li>
											</ul>
										</li>
										<li>
											<strong className='text-text-800'>Units</strong>
											<ul className='list-disc pl-5 mt-1 space-y-1'>
												<li>
													Diagram: <LinkButton href='https://whatunit.com/'>whatunit.com</LinkButton>
												</li>
												<li>
													Article:{' '}
													<LinkButton href='https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units'>
														MDN — values and units
													</LinkButton>
												</li>
											</ul>
										</li>
										<li>
											<strong className='text-text-800'>
												<code className='text-sm bg-body-200 px-1 rounded-sm'>
													clamp()
												</code>
											</strong>
											<ul className='list-disc pl-5 mt-1 space-y-1'>
												<li>
													Calculator:{' '}
													<LinkButton href='https://utopia.fyi/clamp/calculator/'>Utopia clamp calculator</LinkButton>
												</li>
											</ul>
										</li>
										<li>
											<strong className='text-text-800'>
												<code className='text-sm bg-body-200 px-1 rounded-sm'>
													display: grid
												</code>
											</strong>
											<ul className='list-disc pl-5 mt-1 space-y-1'>
												<li>
													Game:{' '}
													<LinkButton href='http://cssgridgarden.com/'>Grid Garden</LinkButton>
												</li>
												<li>
													Article:{' '}
													<LinkButton href='https://www.joshwcomeau.com/css/interactive-guide-to-grid/'>
														Interactive guide to grid
													</LinkButton>
												</li>
											</ul>
										</li>
										<li>
											<strong className='text-text-800'>
												<code className='text-sm bg-body-200 px-1 rounded-sm'>
													display: flex
												</code>
											</strong>
											<ul className='list-disc pl-5 mt-1 space-y-1'>
												<li>
													Game:{' '}
													<LinkButton href='https://flexboxfroggy.com/'>Flexbox Froggy</LinkButton>
												</li>
												<li>
													Article:{' '}
													<LinkButton href='https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/'>
														Interactive guide to flexbox
													</LinkButton>
												</li>
											</ul>
										</li>
									</ul>
									<div className={noteClass()}>
										<p className='font-medium text-text-800'>When to use grid vs flex — videos</p>
										<ul className='list-disc pl-5 space-y-1'>
											<li>
												<LinkButton href='https://www.youtube.com/watch?v=aKFB5Bjk6KM'>YouTube (1)</LinkButton>
											</li>
											<li>
												<LinkButton href='https://www.youtube.com/watch?v=vO-1eseQ-kc'>YouTube (2)</LinkButton>
											</li>
											<li>
												<LinkButton href='https://www.youtube.com/watch?v=3elGSZSWTbM'>YouTube (3)</LinkButton>
											</li>
										</ul>
									</div>
								</div>

								<div>
									<h2 className='text-text-900 text-lg font-semibold'>Tools</h2>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>
											axe DevTools
											<ul className='list-disc pl-5 space-y-2 mt-2'>
												<li>
													<LinkButton href='https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd'>
														Chrome
													</LinkButton>
												</li>
												<li>
													<LinkButton href='https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/'>
														Firefox
													</LinkButton>
												</li>
											</ul>
										</li>
										<li>
											<LinkButton href='/settings/vscode'>VS Code extensions &amp; settings</LinkButton>
										</li>
									</ul>
									<p className={noteClass()}>
										<strong>DO NOT</strong> install any extension before knowing what it does.
									</p>
								</div>

								<div>
									<h2 className='text-text-900 text-lg font-semibold'>Challenges</h2>
									<p className='mt-2'>
									Challenges are meant to test your skills, so try solving them on your own before asking for help. You can find more info <LinkButton href='https://discord.com/channels/244230771232079873/353544874034855936/1300432565471285312'>here</LinkButton>.
									</p>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>
											<LinkButton href='https://cssbattle.dev/'>CSSBattle</LinkButton>
										</li>
										<li>
											<LinkButton href='https://www.frontendmentor.io/'>Frontend Mentor</LinkButton>
										</li>
									</ul>
								</div>

								<div>
									<h2 className='text-text-900 text-lg font-semibold'>CSS reset</h2>
									<ul className='list-disc pl-5 space-y-2 mt-2'>
										<li>
											<LinkButton href='https://www.joshwcomeau.com/css/custom-css-reset/#four-add-accessible-line-height-5'>
												Josh Comeau — custom CSS reset
											</LinkButton>
										</li>
										<li>
											<LinkButton href='https://github.com/tailwindlabs/tailwindcss/blob/next/packages/tailwindcss/preflight.css'>
												Tailwind preflight (reference)
											</LinkButton>
										</li>
									</ul>
									<div className={noteClass()}>
										<p className='font-medium text-text-800'>
											Before using Tailwind or other CSS/JS frameworks, you should be able to check these off:
										</p>
										<ol className='list-decimal pl-5 mt-2 space-y-2'>
											<li>
												You don{"'"}t suffer from{' '}
												<LinkButton href='https://en.wiktionary.org/wiki/divitis'>divitis</LinkButton>.
											</li>
											<li>
												You know{' '}
												<code className='text-sm bg-body-100 px-1 rounded-sm'>display: flex</code> and{' '}
												<code className='text-sm bg-body-100 px-1 rounded-sm'>display: grid</code>.
											</li>
											<li>
												You can build responsive layouts (preferably mobile first) (
												<LinkButton href='https://discord.com/channels/244230771232079873/244242279865384963/1240390358538522695'>
													Discord message
												</LinkButton>
												).
											</li>
											<li>
												You can build accessible sites that follow W3C guidance (
												<LinkButton href='https://www.w3.org/WAI/standards-guidelines/'>
													W3C Accessibility Standards
												</LinkButton>
												).
											</li>
											<li>You can ship sites that look consistent across browsers (<LinkButton href='https://caniuse.com/'>Can I use…</LinkButton>).</li>
											<li>You can explain how your HTML and CSS work to a six-year-old.</li>
										</ol>
										<p className='mt-3'>
											<strong className='text-text-800'>Do not</strong> reach for frameworks until you can check all of these boxes.
										</p>
									</div>
								</div>
							</>
						)
					},
					{
						title: "Backend",
						content: (
							<>
								<h2 className='text-text-900 text-lg font-semibold'>Backend</h2>
								<p>
									No curated list here yet. When you add server-side topics (languages, HTTP APIs, databases,
									auth), this tab is the place for them.
								</p>
							</>
						)
					},
					{
						title: "Dev ops",
						content: (
							<>
								<div>
									<h2 className='text-text-900 text-lg font-semibold'>Git</h2>
									<p className='mt-2'>
										Recommended: learn Git with the official docs at{' '}
										<LinkButton href='https://git-scm.com/'>git-scm.com</LinkButton>.
									</p>
									<p className='mt-4 font-medium text-text-800'>Frequently used commands</p>
									{gitCommands}
								</div>
								<h2 className='text-text-900 text-lg font-semibold'>More DevOps</h2>
								<p>
									CI/CD, hosting, and observability links can go here when you have them.
								</p>
							</>
						)
					},
				]}
				width={8}
				startIndex={1}
			/>
		</section>
	);
}
