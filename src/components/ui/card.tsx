import { createElement } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type CardElement = "article" | "section";
type TCard<T extends CardElement = "article"> = { as?: T } & ComponentPropsWithoutRef<T>;

export function Card<T extends CardElement = "article">({ as = "article" as T, children, className, ...props }: TCard<T>) {
	const componentProps = {
		className: cn('corner-shape-[3rem] bg-body-100 p-2 border border-body-200', className),
		...props,
		children,
	};
	return createElement(as, componentProps);
}