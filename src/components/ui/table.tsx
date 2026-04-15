import { cn } from "@/lib/cn";
import { JSX, ReactNode } from "react";

type TTable = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['table'], "className">;
export function Table({ children, className, ...props }: TTable) {
	return (
		<div className='overflow-x-auto w-full'>
			<table className={cn('max-w-full w-full text-nowrap text-left', className)} {...props}>
				{children}
			</table>
		</div>
	);
}

type TThead = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['thead'], "className">;
export function Thead({ children, className, ...props }: TThead) {
	return (
		<thead
			className={cn(
				'[&_th,&_td]:bg-body-100',
				'after:table-row after:h-4',
				className
			)}
			{...props}
		>
			{children}
		</thead>
	);
}

type TTbody = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['tbody'], "className">;
export function Tbody({ children, className, ...props }: TTbody) {
	return (
		<tbody className={cn(
			'[&_tr:hover_>_*]:bg-body-100',
			'[&_tr]:not-first:border-t [&_tr]:not-first:border-t-[color-mix(var(--color-body-100),var(--color-body-200))]',
			className
		)} {...props}>
			{children}
		</tbody>
	);
}

type TTfoot = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['tfoot'], "className">;
export function Tfoot({ children, className, ...props }: TTfoot) {
	return (
		<tfoot
			className={cn(
				'[&_th,&_td]:bg-body-100',
				'before:table-row before:h-4',
				className
			)}
			{...props}
		>
			{children}
		</tfoot>
	);
}

type TTr = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['tr'], "className">;
export function Tr({ children, className, ...props }: TTr) {
	return (
		<tr
			className={cn(
				'first:[&_>_*:first-child]:rounded-tl-lg first:[&_>_*:last-child]:rounded-tr-lg',
				'last:[&_>_*:first-child]:rounded-bl-lg last:[&_>_*:last-child]:rounded-br-lg',
				className
			)}
			{...props}
		>
			{children}
		</tr>
	);
}

type TTh = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['th'], "className">;
export function Th({ children, className, ...props }: TTh) {
	return (
		<th className={cn('font-normal px-4 py-2', className)} {...props}>
			{children}
		</th>
	);
}

type TTd = {
	children?: ReactNode,
	className?: string
} & Omit<JSX.IntrinsicElements['td'], "className">;
export function Td({ children, className, ...props }: TTd) {
	return (
		<td className={cn('px-4 py-2', className)} {...props}>
			{children}
		</td>
	);
}