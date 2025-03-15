import Image from 'next/image';
import json from '@/components/settings/vscode/final.json';
import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { A } from '@/components/ui/link';

const userSettings = `{
	"C_Cpp.default.compilerPath": "",
	"class-collapse.functionality.enable": true,
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
	"css.format.enable": false,
	"diffEditor.ignoreTrimWhitespace": false,
	"editor.formatOnPaste": true,
	"editor.formatOnSave": true,
	"editor.formatOnSaveMode": "modifications",
	"editor.defaultFormatter": "esbenp.prettier-vscode", // depends on what project i'm working on
	"editor.detectIndentation": false,
	"editor.indentSize": "tabSize",
	"editor.insertSpaces": false,
	"editor.tabSize": 4,
	"files.autoGuessEncoding": false,
	"files.encoding": "utf8", // depends if i'm working on a new or old project
	"intelephense.format.enable": true, // depends on what project i'm working on
	"prettier.enable": true, // depends on what project i'm working on
	"typescript.preferences.importModuleSpecifier": "non-relative",

	// depends on what project i'm working on
	"[php]": {
		"editor.defaultFormatter": "bmewburn.vscode-intelephense-client",
	},
}` as const;

const prettierrc = `{
	"printWidth": 200,
	"tabWidth": 4,
	"useTabs": true,
	"semi": true,
	"singleQuote": true,
	"jsxSingleQuote": true,
	"bracketSpacing": true,
	"bracketSameLine": false,
	"arrowParens": "always",
	"trailingComma": "es5",
	"plugins": ["prettier-plugin-tailwindcss"]
}` as const;

export default async function Page() {
	return (
		<section className='my-8 mt-16 space-y-16'>
			<div className='grid justify-items-center text-center'>
				<h1>VS Code extensions</h1>
				<p>One stop shop for all your vscode extension needs</p>
			</div>
			<div className='space-y-5'>
				<h2>Extensions</h2>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,calc(80rem/3-2rem)),1fr))] gap-x-4 gap-y-5'>
					{json
						.sort((a, b) => a.title.localeCompare(b.title))
						.map((items, index) => (
							<A key={index} href={items.link} className='grid place-items-center space-y-4 rounded-md bg-body-50 p-4 text-center dark:bg-body-200'>
								<div className='aspect-square content-center'>
									<Image src={`/img/settings/vscode/${items.icon}`} alt='' width={128} height={128} />
								</div>
								<h3>{items.title}</h3>
								<p>{items.description}</p>
							</A>
						))}
				</div>
			</div>
			<div className='space-y-5'>
				<h2>User Settings</h2>
				<CodeBlock lang='jsonc'>{userSettings}</CodeBlock>
			</div>
			<div className='space-y-5'>
				<h2>.vscode/settings.json</h2>
				<CodeBlock lang='jsonc'>{workspaceSettings}</CodeBlock>
			</div>
			<div className='space-y-5'>
				<h2>.prettierrc</h2>
				<CodeBlock lang='jsonc'>{prettierrc}</CodeBlock>
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
			light: 'material-theme-lighter',
			dark: 'material-theme-palenight',
		},
	});

	return <div dangerouslySetInnerHTML={{ __html: out }} />;
}
