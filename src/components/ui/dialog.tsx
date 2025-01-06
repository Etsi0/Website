import { cn } from '@/lib/util';
import { DialogHTMLAttributes, ForwardedRef, ReactNode } from 'react';

type TDialog = DialogHTMLAttributes<HTMLDialogElement> & {
	className?: string;
	ref?: ForwardedRef<HTMLDialogElement>;
	children: ReactNode;
};

export function Dialog({ className, ref, children, ...props }: TDialog) {
	return (
		<dialog ref={ref} className={cn('space-y-3 rounded-xl border border-body-200 bg-body-100 p-8 backdrop:bg-black/25', className)} {...props}>
			{children}
		</dialog>
	);
}
