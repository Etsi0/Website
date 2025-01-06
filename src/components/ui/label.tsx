import { cn } from '@/lib/util';
import { LabelHTMLAttributes, ReactNode } from 'react';

type variants = 'vertical' | 'horizontal';

type TLabel = LabelHTMLAttributes<HTMLLabelElement> & {
	className?: string;
	type: variants;
	children: ReactNode;
};

export function Label({ className, type, children, ...props }: TLabel) {
	return (
		<label className={cn('cursor-pointer', type === 'vertical' && 'inline-grid gap-1', className)} {...props}>
			{children}
		</label>
	);
}
