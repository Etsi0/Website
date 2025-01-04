import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn, whenFocusing, whenHovering } from '@/lib/util';

type TButton = {
	className?: string;
	hoverable?: boolean;
	focusable?: boolean;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, hoverable = true, focusable = true, children, ...props }: TButton) {
	return (
		<button className={cn(hoverable && whenHovering, focusable && whenFocusing, className)} {...props}>
			{children}
		</button>
	);
}
