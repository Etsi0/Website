import { cn } from "@/lib/util";
import type { ComponentPropsWithoutRef } from "react";

type TCard = ComponentPropsWithoutRef<"article">;

export function Card({ children, className, ...props }: TCard) {
	return (
		<article className={cn("corner-shape-[3rem] bg-body-100 p-2 border border-body-200", className)} {...props}>
			{children}
		</article>
	)
}