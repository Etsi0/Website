import { cn } from "@/lib/cn";
import { ReactNode } from "react";

export function InlineCode({ className, children }: { className?: string, children: ReactNode }) {
	return (
		<code className={cn('text-[calc(1em-1em/6)] align-center bg-body-100 dark:bg-body-900 px-[calc(1em/3)] py-[calc(1em/6)] corner-shape-[calc(1em/3)]', className)}>
			{children}
		</code>
	)
}