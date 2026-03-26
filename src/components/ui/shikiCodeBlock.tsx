import type { BundledLanguage } from 'shiki';
import { codeToHtml } from 'shiki';

import { cn } from '@/lib/cn';

type TShikiCodeBlockProps = {
	children: string;
	lang: BundledLanguage;
	className?: string;
};

export async function ShikiCodeBlock({ children, lang, className }: TShikiCodeBlockProps) {
	const html = await codeToHtml(children, {
		lang,
		themes: {
			dark: 'material-theme-palenight',
			light: 'material-theme-lighter',
		},
	});

	return (
		<div
			className={cn(className)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
