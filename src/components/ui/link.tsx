import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn, whenFocusing, whenHovering } from '@/lib/util';

type TA = AnchorHTMLAttributes<HTMLAnchorElement> & {
	className?: string;
	hoverable?: boolean;
	focusable?: boolean;
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

export function A({ className, hoverable = true, focusable = true, children, href, disabled, target, ...props }: TA) {
	if (disabled) {
		const { style, id, 'aria-label': ariaLabel } = props;
		return (
			<button className={cn('cursor-not-allowed opacity-50', className)} {...{ disabled, style, id, ariaLabel }}>
				{children}
			</button>
		);
	}

	const isLocalLink = href ? href.startsWith('/') || href.startsWith('#') : false;
	const security = !isLocalLink || target === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

	const standard = 'inline-block';

	if (isLocalLink) {
		return (
			<Link href={href} className={cn(standard, hoverable && whenHovering, focusable && whenFocusing, className)} {...security} {...props}>
				{children}
			</Link>
		);
	}

	return (
		<a href={href} className={cn(standard, hoverable && whenHovering, focusable && whenFocusing, className)} {...security} {...props}>
			{children}
		</a>
	);
}
