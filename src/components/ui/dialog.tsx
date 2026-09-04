import type { DialogHTMLAttributes, ForwardedRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TDialog = DialogHTMLAttributes<HTMLDialogElement> & {
	className?: string;
	ref?: ForwardedRef<HTMLDialogElement>;
	children: ReactNode;
};

export function Dialog({ className, ref, children, ...props }: TDialog) {
	return (
		<dialog closedby="any" ref={ref} className={cn('border-body-100 bg-body-50 m-auto space-y-3 rounded-xl border p-8 backdrop:bg-black/25 backdrop:backdrop-blur-[2px] dark:border-body-900 dark:bg-body-950', className)} {...props}>
			{children}
		</dialog>
	);
}
