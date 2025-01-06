import { cn } from '@/lib/util';
import { LabelHTMLAttributes, ReactNode } from 'react';

const variants = ['vertical', 'horizontal'] as const;

type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
	className?: string;
	type: (typeof variants)[number];
	children: ReactNode;
};

export function Label({ className, type, children, ...props }: TLabel) {
	return (
		<label className={cn('cursor-pointer', type === 'vertical' && 'inline-grid gap-1', className)} {...props}>
			{children}
		</label>
	);
}
