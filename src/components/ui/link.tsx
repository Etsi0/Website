import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/util';

type TA = AnchorHTMLAttributes<HTMLAnchorElement> & {
	className?: string;
	notHoverable?: boolean;
	children: ReactNode;
} & (
		| {
				href: string;
				disabled?: false;
		  }
		| {
				href?: string;
				disabled: true;
		  }
	);

export function A({ className, notHoverable, children, href, disabled, target, ...props }: TA) {
	if (disabled) {
		const { style, id } = props;
		return (
			<button className={cn('cursor-not-allowed opacity-50', className)} {...{ disabled, style, id }}>
				{children}
			</button>
		);
	}

	const isLocalLink = href ? href.startsWith('/') || href.startsWith('#') : false;
	const security = !isLocalLink || target === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

	const standard = 'inline-block';
	const hover = notHoverable ? '' : 'hover:opacity-85 hover:active:opacity-50';
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
