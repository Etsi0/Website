import { createElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardElement = "article" | "section";
type TCard<T extends CardElement = "article"> = { as?: T } & ComponentPropsWithoutRef<T>;

export function Card<T extends CardElement = "article">({ as = "article" as T, children, className, ...props }: TCard<T>) {
	const componentProps = {
		className: cn('corner-shape-12 bg-body-white p-2 border border-white dark:bg-body-900 dark:border-body-800', className),
		...props,
		children,
	};
	return createElement(as, componentProps);
}