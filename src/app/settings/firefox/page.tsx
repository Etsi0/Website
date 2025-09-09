import Image from 'next/image';
import json from '@/json/settings/vscode/extensions.json';
import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';
import { LinkButton } from '@/components/ui/link';

const aboutConfig = `browser.compactmode.show	true
devtools.cache.disabled	true
devtools.inspector.showAllAnonymousContent	true
devtools.inspector.showUserAgentShadowRoots	true
devtools.inspector.showUserAgentStyles	true
full-screen-api.transition-duration.enter	0 0
full-screen-api.transition-duration.leave	0 0
full-screen-api.warning.timeout	0
toolkit.legacyUserProfileCustomizations.stylesheets	true` as const;

export default async function Page() {
	return (
		<section className='my-16 space-y-12'>
			<div className='grid justify-items-center text-center'>
				<h1>Firefox Settings</h1>
				<p>One stop shop for all your Firefox needs</p>
			</div>
			<div className='space-y-5'>
				<h2 className="text-center">Extensions</h2>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,calc(80rem/3-2rem)),1fr))] gap-x-4 gap-y-5'>
					{json
						.sort((a, b) => a.title.localeCompare(b.title))
						.map((items, index) => (
							<LinkButton key={index} href={items.link} className='grid place-items-center space-y-4 rounded-md bg-body-50 p-4 text-center dark:bg-body-200'>
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
				<h2 className="text-center">about:config</h2>
				<CodeBlock lang='jsonc'>{aboutConfig}</CodeBlock>
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
