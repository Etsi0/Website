import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/util';

type TButton = {
	children: ReactNode;
	className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: TButton) {
	return (
		<button
			className={cn(
				'rounded-md bg-primary-500 text-input ring-primary-500 ring-offset-2 ring-offset-body-100 hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500 focus-visible:outline-none focus-visible:ring-2',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
