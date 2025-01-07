import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn, whenFocusing, whenHovering } from '@/lib/util';

type TButton = {
	className?: string;
	hoverable?: boolean;
	focusable?: boolean;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, hoverable = true, focusable = true, children, disabled, ...props }: TButton) {
	return (
		<button
			tabIndex={disabled ? -1 : 0}
			className={cn(hoverable && !disabled && whenHovering, focusable && !disabled && whenFocusing, disabled && 'cursor-not-allowed opacity-50', className)}
			{...props}
		>
			{children}
		</button>
	);
}
