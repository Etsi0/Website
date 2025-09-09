import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn, whenFocusing, whenHoveringButton, whenHoveringLink } from '@/lib/util';

type TStandard = {
	className?: string;
	isHoverable?: boolean;
	isFocusable?: boolean;
	children: ReactNode;
}

type TA = AnchorHTMLAttributes<HTMLAnchorElement> & TStandard & {
	href: string;
	isButton?: boolean;
	disabled?: boolean;
};

type TButton = ButtonHTMLAttributes<HTMLButtonElement> & TStandard & {
	href?: never;
	isButton?: never;
}

type TLinkButton = TA | TButton

export function LinkButton({ ...props }: TA): ReactNode;
export function LinkButton({ ...props }: TButton): ReactNode;
export function LinkButton({ ...props }: TLinkButton): ReactNode {
	const standard = 'inline-block';
	const isLink = 'href' in props;

	if (!props.disabled && isLink && props.href) {
		const { className, isHoverable = true, isFocusable = true, children, isButton, href, target, ...restProps } = props as TA;
		delete restProps.disabled;

		const isExternal = !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('?');
		const security = isExternal || target === '_blank' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

		const clazz = [standard, isHoverable && (isButton ? whenHoveringButton : whenHoveringLink), isFocusable && whenFocusing, className];

		const properties = {
			tabIndex: isFocusable ? 0 : -1,
			className: cn(...clazz),
			href: href,
			...security,
			...restProps
		};

		if (isExternal) {
			return (
				<a {...properties}>
					{children}
				</a>
			);
		}

		return (
			<Link {...properties}>
				{children}
			</Link>
		);
	}

	delete props.href;
	delete props.isButton;
	const { className, isHoverable = true, isFocusable = true, children, disabled = false, type = 'button', ...restProps } = props as TButton;
	const clazz = [standard, ...(disabled ? ['cursor-not-allowed opacity-50'] : [isHoverable && whenHoveringButton, isFocusable && whenFocusing]), className]

	return (
		<button
			type={type}
			tabIndex={!disabled && isFocusable ? 0 : -1}
			className={cn(...clazz)}
			aria-disabled={disabled || undefined}
			disabled={disabled}
			{...(isLink && {role: 'link'})}
			{...restProps}
		>
			{children}
		</button>
	);
}