import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/util';

/* prettier-ignore */
type TA = AnchorHTMLAttributes<HTMLAnchorElement> & {
	className?: string;
	target?: string;
	children: ReactNode;
} & ({
	href: string;
	disabled?: false;
} | {
	href?: string;
	disabled: true;
});

export function A({ href, className, target, disabled, children, ...props }: TA) {
	if (disabled) {
		const { style, id } = props;
		return (
			<button className={cn('cursor-not-allowed opacity-50', className)} {...{ disabled, style, id }}>
				{children}
			</button>
		);
	}

	const isLocalLink = href ? href.startsWith('/') : false;
	const security = isLocalLink || target === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

	const standard = 'inline-block';
	const hover = 'hover:opacity-85 hover:active:opacity-50';
	const focus = 'ring-primary-500 ring-offset-2 ring-offset-body-100 focus-visible:outline-none focus-visible:ring-2';

	if (isLocalLink) {
		return (
			<Link href={href} className={cn(standard, hover, focus, className)} {...security} {...props}>
				{children}
			</Link>
		);
	}

	return (
		<a href={href} className={cn(standard, hover, focus, className)} {...security} {...props}>
			{children}
		</a>
	);
}
