import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import Plus from "@/svg/materialDesignIcons/rounded/add_2.svg";

type TDetailsProps = ComponentPropsWithoutRef<"details">;

type TDetails = {
	title: string
} & Omit<TDetailsProps, "title" | "name"> & Required<Pick<TDetailsProps, "name">>;

export function Details({ name, title, children, className }: TDetails) {
	return (
		<details name={name} className={cn(
				'leading-normal bg-body-200 rounded-2xl',
				'[&:has(summary:hover)]:bg-body-300',
				'[&:has(summary:focus-visible)]:outline-primary-500',
				'open:[&_>_summary_>_svg]:-rotate-45',
				className
			)}
		>
			<summary className="cursor-pointer flex items-center justify-between text-text-800 px-5 py-4 focus-visible:outline-transparent">{title}<Plus className='fill-current size-5 transition-transform duration-300' /></summary>
			<div className='px-5 pb-4'>
				{children}
			</div>
		</details>
	);
}