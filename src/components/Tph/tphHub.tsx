import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { DesignToolCompareCell, DesignToolCompareLegend } from '@/components/Tph/tphDesignToolCompareCell';
import { InlineCode } from '@/components/ui/inlineCode';
import { LinkButton } from '@/components/ui/link';
import { Tabs } from '@/components/ui/tab';
import Error from '@/svg/materialDesignIcons/rounded/error.svg';
import Warning from '@/svg/materialDesignIcons/rounded/warning.svg';
import Ok from '@/svg/materialDesignIcons/rounded/check_circle.svg';
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@/components/ui/table';

type TTphHubProps = {
	gitCommands: ReactNode;
};

type TVariant = 'error' | 'warning' | 'ok' | 'info';
const NOTE_VARIANT: Record<TVariant, { icon?: typeof Error, classes: string }> = {
	error: {
		icon: Error,
		classes: 'bg-[linear-gradient(to_bottom,transparent_.5rem,var(--color-error-500)_.5rem_100%)] fill-error-500',
	},
	warning: {
		icon: Warning,
		classes: 'bg-[linear-gradient(to_bottom,transparent_.5rem,var(--color-warning-500)_.5rem_100%)] fill-warning-500',
	},
	ok: {
		icon: Ok,
		classes: 'bg-[linear-gradient(to_bottom,transparent_.5rem,var(--color-ok-500)_.5rem_100%)] fill-ok-500',
	},
	info: {
		icon: undefined,
		classes: 'bg-primary-500',
	},
};

function Note({ variant, children }: { variant: TVariant, children: ReactNode }) {
	const Svg = NOTE_VARIANT[variant].icon;
	const color = NOTE_VARIANT[variant].classes;

	return (
		<article className='grid grid-cols-[auto_1fr] gap-2'>
				<div className='flex flex-col items-center w-5'>
					{Svg && <Svg className={cn('size-5', color, 'bg-none')} />}
					<div className={cn('grow w-[2px]', color)}></div>
				</div>
				<div className='self-center'>
					{children}
				</div>
		</article>
	)
}

export function TphHub({ gitCommands }: TTphHubProps) {
	return (
		<section className='pt-(--header-offset) space-y-8 [&_a]:text-primary-600 dark:[&_a]:text-primary-400'>
			<div className='text-center space-y-3'>
				<h1>TPH learning resources</h1>
				<p className='text-center text-custom-xl mx-auto'>🚨 Do not use AI if you actually want to learn 🚨</p>
			</div>
			<Tabs
				name="tabs"
				items={[
					{
						title: "Design",
						content: (
							<div className='space-y-8'>
								<div className='space-y-2'>
									<h2 id="Design tools">Design tools</h2>
									<p>Use one of these tools if you want to make UI, icons or vector assets</p>
									<Table className='w-full'>
										<caption className='sr-only'>Comparison of design tools: Figma, Penpot, Affinity, and Inkscape</caption>
										<Thead>
											<Tr>
												<Th scope='col'></Th>
												<Th className='text-center' scope='col'><LinkButton href='https://www.figma.com/'>Figma</LinkButton></Th>
												<Th className='text-center' scope='col'><LinkButton href='https://penpot.app/'>Penpot</LinkButton></Th>
												<Th className='text-center' scope='col'><LinkButton href='https://www.affinity.studio/'>Affinity</LinkButton></Th>
												<Th className='text-center' scope='col'><LinkButton href='https://inkscape.org/'>Inkscape</LinkButton></Th>
											</Tr>
										</Thead>
										<Tbody>
											<Tr>
												<Th scope="row">Good for web design <DesignToolCompareLegend variant='quality' /></Th>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='bad' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='bad' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Good for SVGs (vectors) <DesignToolCompareLegend variant='quality' /></Th>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Easy developer handoff <DesignToolCompareLegend variant='quality' /></Th>
												<Td className='text-center'><DesignToolCompareCell rating='good' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='neutral' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='bad' /></Td>
												<Td className='text-center'><DesignToolCompareCell rating='bad' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Real-time collaboration <DesignToolCompareLegend variant='quality' /></Th>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='neutral' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Used within companies <DesignToolCompareLegend variant='quality' /></Th>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='neutral' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Offline workflow <DesignToolCompareLegend variant='quality' /></Th>
												<Td className="text-center"><DesignToolCompareCell rating='neutral' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='neutral' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Plugin support <DesignToolCompareLegend variant='quality' /></Th>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='neutral' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='neutral' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Open source <DesignToolCompareLegend variant='quality' /></Th>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='bad' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='good' /></Td>
											</Tr>
											<Tr>
												<Th scope="row">Cost <DesignToolCompareLegend variant='cost' /></Th>
												<Td className="text-center"><DesignToolCompareCell rating='free' /><LinkButton href="#Design tools 1"><sup>[1]</sup></LinkButton></Td>
												<Td className="text-center"><DesignToolCompareCell rating='free' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='free' /></Td>
												<Td className="text-center"><DesignToolCompareCell rating='free' /></Td>
											</Tr>
										</Tbody>
										<Tfoot>
											<Tr>
												<Th scope="row"></Th>
												<Td className="text-center">👑</Td>
												<Td className="text-center"></Td>
												<Td className="text-center"></Td>
												<Td className="text-center"></Td>
											</Tr>
										</Tfoot>
									</Table>
									<p id="Design tools 1"><LinkButton href='#Design tools 1'><sup>[1]</sup></LinkButton> Need to pay a subscription fee to get all features. Not necessary in my option</p>
								</div>
								<div className='space-y-2'>
									<h2 id="Design fundamentals">Design fundamentals</h2>

									<ul className='list-disc pl-5'>
										<li>
											<LinkButton href='https://www.colorpsychology.org/'>Color Psychology</LinkButton>
										</li>
										<li>
											<LinkButton href='https://en.wikipedia.org/wiki/Gestalt_psychology#Principles'>Gestalt Principles</LinkButton>
										</li>
										<li>
											<LinkButton href='https://www.youtube.com/watch?v=UWwNIMHFdW4'>60/30/10 rule</LinkButton>
										</li>
										<li>
											<LinkButton href='https://www.thedesignership.com/blog/the-ultimate-spacing-guide-for-ui-designers'>4-point grid system</LinkButton>
										</li>
										<li>
											<LinkButton href='https://jakub.kr/work/concentric-border-radius'>Concentric Borders</LinkButton>
										</li>
									</ul>
								</div>
							</div>
						)
					},
					{
						title: "Front end",
						content: (
							<>
								<div className='grid gap-8'>
									<div className='space-y-2'>
										<h2 id="Docs">Docs</h2>
										<ul className='list-disc pl-5 space-y-0.5'>
											<li>
												<LinkButton href='https://developer.mozilla.org/en-US/'>MDN</LinkButton> (Mozilla) {'<-'} personal favorit
											</li>
											<li>
												<LinkButton href='https://web.dev/learn/'>web.dev</LinkButton> (Google)
											</li>
										</ul>
										<Note variant='warning'>
											<p>Avoid W3Schools — some information there is outdated.</p>
											<p>Bonus: add <InlineCode>-site:w3schools.com</InlineCode> to searches to filter W3Schools out (may not work on every search engine). Or use a custom search URL — replace <InlineCode>%s</InlineCode> with your query in the browser&apos;s keyword search settings:</p>
											<ul className='list-disc pl-5 space-y-1'>
												<li><LinkButton href='https://www.google.com/search?udm=14&q=%s%20-site:w3schools.com'>https://www.google.com/search?udm=14&q=%s%20-site:w3schools.com</LinkButton> (example template)</li>
												<li><LinkButton href='https://search.brave.com/search?q=%s%20-w3schools'>https://search.brave.com/search?q=%s%20-w3schools</LinkButton> (different operator example)</li>
												<li><LinkButton href='https://search.phadonia.com/?q=%s%20-site:w3schools.com'>https://search.phadonia.com/?q=%s%20-site:w3schools.com</LinkButton> (personal default)</li>
											</ul>
											<p><span className='font-medium text-text-800'>How do I add a custom search engine?</span> Search it up — your browser&apos;s docs explain keyword URLs.</p>
										</Note>
									</div>

									<div className='space-y-2'>
										<h2 id="Courses / roadmaps">Courses / roadmaps</h2>
										<ul className='list-disc pl-5 space-y-0.5'>
											<li><LinkButton href='https://www.youtube.com/watch?v=1L2YiWdaUDM&list=PL4-IK0AVhVjOJs_UjdQeyEZ_cmEV3uJvx'>YouTube course (playlist)</LinkButton> {'<-'} personal recommendation</li>
											<li><LinkButton href='https://www.theodinproject.com/'>The Odin Project</LinkButton></li>
											<li><LinkButton href='https://www.freecodecamp.org/'>freeCodeCamp</LinkButton></li>
											<li><LinkButton href='https://roadmap.sh/'>roadmap.sh</LinkButton></li>
											<li><LinkButton href='https://pll.harvard.edu/course/cs50-introduction-computer-science'>CS50x</LinkButton> (not web-specific)</li>
										</ul>
										<Note variant='warning'>
											Don{"'"}t do any of these courses without asking yourself why they did what they did. If you
											don{"'"}t understand what they did, read
											{' '}
											<LinkButton href='https://developer.mozilla.org/en-US/'>MDN</LinkButton> or
											{' '}
											<LinkButton href='https://web.dev/learn/'>web.dev</LinkButton>; if you are still stuck, ask your question on
											{' '}
											<LinkButton href='https://discord.gg/programming'>TPH</LinkButton>.
										</Note>
									</div>

									<div className='space-y-2'>
										<h2 id="Resources">Resources</h2>

										<h3 className='text-text-900 font-medium'>CSS</h3>
										<ul className='list-disc pl-5 space-y-1'>
											<li className='space-y-1'>
												<strong className='text-text-800'>Selectors</strong>
												<ul className='list-disc pl-5 space-y-0.5'>
													<li>Game: <LinkButton href='https://flukeout.github.io/'>CSS Diner</LinkButton></li>
													<li>Article: <LinkButton href='https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors'>MDN</LinkButton></li>
												</ul>
											</li>
											<li className='space-y-1'>
												<strong className='text-text-800'>Units</strong>
												<ul className='list-disc pl-5 space-y-0.5'>
													<li>Diagram: <LinkButton href='https://whatunit.com/'>What CSS length unit should you use?</LinkButton></li>
													<li>Article: <LinkButton href='https://web.dev/learn/css/sizing'>web.dev</LinkButton></li>
												</ul>
											</li>
											<li className='space-y-1'>
												<strong className='text-text-800'><InlineCode>display: grid</InlineCode></strong>
												<ul className='list-disc pl-5 space-y-0.5'>
													<li>Game: <LinkButton href='http://cssgridgarden.com/'>Grid Garden</LinkButton></li>
													<li>Article: <LinkButton href='https://www.joshwcomeau.com/css/interactive-guide-to-grid/'>An interactive guide to css grid</LinkButton></li>
												</ul>
											</li>
											<li className='space-y-1'>
												<strong className='text-text-800'><InlineCode>display: flex</InlineCode></strong>
												<ul className='list-disc pl-5 space-y-0.5'>
													<li>Game: <LinkButton href='https://flexboxfroggy.com/'>Flexbox Froggy</LinkButton></li>
													<li>Article: <LinkButton href='https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/'>An interactive guide to flexbox</LinkButton></li>
												</ul>
											</li>
										</ul>
										<Note variant='info'>
											<p className='font-medium text-text-800 mb-1'>When to use grid/flex</p>
											<ul className='list-disc pl-5 space-y-1'>
												<li><LinkButton href='https://www.youtube.com/watch?v=aKFB5Bjk6KM'>YouTube (1)</LinkButton></li>
												<li><LinkButton href='https://www.youtube.com/watch?v=vO-1eseQ-kc'>YouTube (2)</LinkButton></li>
												<li><LinkButton href='https://www.youtube.com/watch?v=3elGSZSWTbM'>YouTube (3)</LinkButton></li>
											</ul>
										</Note>

										<h3 id="SVG">SVG</h3>
										<ul className='list-disc pl-4 space-y-2'>
											<li>
												<LinkButton href='https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/'>
													Friendly introduction to SVG
												</LinkButton>
											</li>
										</ul>
									</div>

									<div className='space-y-2'>
										<h2 id="Tools">Tools</h2>
										<ul className='list-disc pl-5 space-y-0.5'>
											<li>
												axe DevTools
												<ul className='list-disc pl-5 space-y-0.5'>
													<li><LinkButton href='https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd'>Chrome</LinkButton></li>
													<li><LinkButton href='https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/'>Firefox</LinkButton></li>
												</ul>
											</li>
											<li>
												<LinkButton href='https://utopia.fyi/clamp/calculator/'>Utopia clamp calculator</LinkButton>
											</li>
											<li>
												<LinkButton href='https://svgomg.net/'>SVGOMG - Optimize and minify SVG(s)</LinkButton>
											</li>
											<li><LinkButton href='/settings/vscode'>VS Code extensions &amp; settings</LinkButton></li>
										</ul>
										<Note variant='warning'>
											<strong>DO NOT</strong> install any extensions before knowing what they do.
										</Note>
									</div>

									<div className='space-y-2'>
										<h2 id="Challenges">Challenges</h2>
										<p className='mt-2'>
										Challenges are meant to test your skills, so try solving them on your own before asking for help. You can find more info <LinkButton href='https://discord.com/channels/244230771232079873/353544874034855936/1300432565471285312'>here</LinkButton>.
										</p>
										<ul className='list-disc pl-5 space-y-0.5'>
											<li><LinkButton href='https://cssbattle.dev/'>CSSBattle</LinkButton></li>
											<li><LinkButton href='https://www.frontendmentor.io/'>Frontend Mentor</LinkButton></li>
										</ul>
									</div>

									<div className='space-y-2'>
										<h2 id="CSS reset">CSS reset</h2>
										<ul className='list-disc pl-5 space-y-0.5'>
											<li><LinkButton href='https://www.joshwcomeau.com/css/custom-css-reset/#four-add-accessible-line-height-5'>Josh Comeau{"'"}s reset</LinkButton></li>
											<li><LinkButton href='https://github.com/tailwindlabs/tailwindcss/blob/next/packages/tailwindcss/preflight.css'>Tailwind preflight</LinkButton></li>
										</ul>
									</div>

									<div className='space-y-2'>
										<h2 id="When can i start using frameworks and libs">When can i start using frameworks and libs</h2>
										<ol className='list-decimal pl-5 space-y-2'>
											<li>
												You don{"'"}t suffer from{' '}
												<LinkButton href='https://en.wiktionary.org/wiki/divitis'>divitis</LinkButton>.
											</li>
											<li>You know <InlineCode>display: flex</InlineCode> and <InlineCode>display: grid</InlineCode>.</li>
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
											<li>You can explain how your HTML and CSS work to a six year old.</li>
										</ol>
										<Note variant='ok'>
											<strong className='text-text-800'>It{"'"}s okay</strong> if you reach for frameworks or libs if you could check all of these boxes.
										</Note>
										<Note variant='error'>
											<strong className='text-text-800'>Do not</strong> reach for frameworks or libs if you couldn{"'"}t check all these boxes.
										</Note>
									</div>
								</div>
							</>
						)
					},
					{
						title: "Git",
						content: (
							<div className='space-y-8'>
								<div className='space-y-2'>
									<h2 id="Git">Git</h2>
									<p className='max-w-full'>Recommend learning git regardless of what you are doing. You can find git docs here: <LinkButton href='https://git-scm.com/'>git-scm.com</LinkButton>.</p>
									<p className='font-medium text-text-800'>My frequently used commands</p>
									{gitCommands}
								</div>
							</div>
						)
					},
				]}
				width={8}
				startIndex={1}
			/>
		</section>
	);
}
