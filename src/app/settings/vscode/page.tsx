import Image from 'next/image';
import json from '@/json/settings/vscode/extensions.json';
import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { LinkButton } from '@/components/ui/link';
import { Metadata } from 'next';
import { pageTitle } from '@/lib/util';

export const metadata: Metadata = {
	title: pageTitle('VS Code Settings'),
	description: "Are there something you want to stop doing? Then you can use this to see when you should do that thing or when you shouldn't do that thing",
};

const userSettings = `{
	"C_Cpp.default.compilerPath": "",
	"cSpell.language": "en,sv",

	"diffEditor.ignoreTrimWhitespace": false,
	"discord.detailsEditing": "Editing {dir_name}/{file_name}",

	"editor.fontFamily": "'JetBrains Mono', Consolas, 'Courier New', monospace",
	"editor.minimap.enabled": false,
	"editor.renderWhitespace": "none",
	"editor.stickyScroll.enabled": false,
	"editor.wordWrap": "on",
	"errorLens.enabledDiagnosticLevels": [
		"error",
		"warning"
	],
	"explorer.autoReveal": false,
	"explorer.compactFolders": false,

	"git.confirmSync": false,
	"gitlens.codeLens.scopes": [
		"document"
	],
	"gitlens.hovers.enabled": false,

	"indentRainbow.colors": [
		"oklch(40.09% 0.0628 274.11)",
		"oklch(40.09% 0.0785 274.11)",
		"oklch(40.09% 0.0942 274.11)",
		"oklch(40.09% 0.1099 274.11)",
		"oklch(40.09% 0.0942 274.11)",
		"oklch(40.09% 0.0785 274.11)",
	],
	"indentRainbow.indicatorStyle": "light",
	"indentRainbow.lightIndicatorStyleLineWidth": 4,

	"settingsSync.ignoredExtensions": [],

	"terminal.integrated.fontFamily": "'JetBrainsMono NFM', Consolas, 'Courier New', monospace",
	"terminal.integrated.env.windows": {},

	"workbench.colorTheme": "Material Theme Palenight High Contrast",
	"workbench.iconTheme": "material-icon-theme",
}` as const;

const workspaceSettings = `{
	"diffEditor.ignoreTrimWhitespace": false,
	"editor.formatOnPaste": false,
	"editor.formatOnSave": false,
	"editor.formatOnSaveMode": "modifications",
	"editor.defaultFormatter": null,
	"editor.detectIndentation": false,
	"editor.indentSize": "tabSize",
	"editor.insertSpaces": false,
	"editor.tabSize": 4,
	"files.autoGuessEncoding": false,
	"files.encoding": "utf8",
	"typescript.preferences.importModuleSpecifier": "non-relative",
	"workbench.editorAssociations": {
		"*.svg": "default"
	}
}` as const;

export default async function Page() {
	return (
		<section className='my-16 space-y-12'>
			<div className='grid justify-items-center text-center'>
				<h1>VS Code Settings</h1>
				<p>One stop shop for all your vscode needs</p>
			</div>
			<div className='space-y-5'>
				<h2 className="text-center">Extensions</h2>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,calc(80rem/3-2rem)),1fr))] gap-x-4 gap-y-5'>
					{json
						.sort((a, b) => a.title.localeCompare(b.title))
						.map((items, index) => (
							<LinkButton key={index} href={items.link} className='grid place-items-center space-y-4 rounded-md bg-body-100 border border-body-200 p-4 text-center'>
								<div className='aspect-square content-center'>
									<Image src={`/img/settings/vscode/${items.icon}`} alt='' width={128} height={128} />
								</div>
								<h3>{items.title}</h3>
								<p>{items.description}</p>
							</LinkButton>
						))}
				</div>
			</div>
			<div className='space-y-5'>
				<h2 className="text-center">User Settings</h2>
				<CodeBlock lang='jsonc'>{userSettings}</CodeBlock>
			</div>
			<div className='space-y-5'>
				<h2 className="text-center">.vscode/settings.json</h2>
				<CodeBlock lang='jsonc'>{workspaceSettings}</CodeBlock>
			</div>
			<div className='space-y-5'>
				<h2 className="text-center">FAQ</h2>
				<div className='space-y-2'>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>Why aren{"'"}t you using any formatters?</summary>
						I used <LinkButton className='text-primary-500' href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier</LinkButton> for 5+ years. Then I started working for a company that didn{"'"}t use formatters, and after a while I got frustrated that Prettier wanted to split lines into multiple lines when those lines could fit on just one line without scrolling. I disabled Prettier on my personal projects and instead configured my <code className='px-1 bg-black/15 border-body-400 dark:border-body-300 border rounded-md'>.vscode/settings.json</code> to handle formatting manually. This gives me full control over code appearance without the opinionated line-breaking behavior of formatters.
						<br />
						<b className='text-sm'>I do recommend using a formatter if you are new to coding or unsure how to format code</b>
					</details>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>Is Error Lens distracting with all the inline error highlighting?</summary>
						No. It makes development more convenient since you don{"'"}t need to hover over problematic code to see what{"'"}s wrong.
					</details>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>How does GitLens compare to the built-in Git features?</summary>
						I primarily use GitLens to see who made changes, when they were made, and which commit introduced them.
					</details>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>Why disable the minimap?</summary>
						It takes up screen space without providing valuable information. I prefer maximizing the code editing area.
					</details>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>Why turn off explorer auto-reveal?</summary>
						I want my file explorer to stay clean and organized. I navigate primarily using <code className='px-1 bg-black/15 border rounded-md'>Ctrl + Shift + P</code> (Command Palette) anyway.
					</details>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>What{"'"}s the benefit of using tabs over spaces?</summary>
						<p>
							For me, it comes down to fewer keystrokes and personal preference. I{"'"}ve always used tabs, find them more efficient, and I happen to agree with Linus Torvalds <LinkButton className='text-primary-500' href="https://www.kernel.org/doc/html/v4.10/process/coding-style.html#indentation"><q>spaces are never used for indentation</q></LinkButton>.
							<br />
							He also said, <q>Get a decent editor and don{"'"}t leave whitespace at the end of lines.</q> That{"'"}s why I use <LinkButton className='text-primary-500' href="https://marketplace.visualstudio.com/items?itemName=sidp.strict-whitespace">Strict Whitespace</LinkButton>. I can{"'"}t stand mixed indentation or stray whitespace hanging around at the end of a line.
						</p>
					</details>
					<details name="details-group" className='bg-body-200 px-3 py-1 rounded-md max-w-prose mx-auto'>
						<summary>Why use JetBrains Mono font?</summary>
						I have dyslexia, and this font significantly improves readability for me.
					</details>
				</div>
			</div>
		</section>
	);
}

type TProps = {
	children: string;
	lang: BundledLanguage;
};

async function CodeBlock(props: TProps) {
	const out = await codeToHtml(props.children, {
		lang: props.lang,
		themes: {
			dark: 'material-theme-palenight',
			light: 'material-theme-lighter',
		},
	});

	return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
