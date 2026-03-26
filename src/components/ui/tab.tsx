import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TTabItem = {
	title: ReactNode;
	content: ReactNode;
};

type TTabsProps = {
	name: string;
	items: TTabItem[];
	width: number;
	startIndex: number;
};

export function Tabs({ name, items, width, startIndex }: TTabsProps) {
	const clazz = 'px-[1.5em] border';
	const style: CSSProperties = {
		gridTemplateColumns: `minmax(0, 1fr) repeat(${items.length}, minmax(0, calc((1ch * ${width}) + ((1.5rem + 1px) * 2)))) minmax(0, 1fr)`
	};

	return (
		<div className='grid gap-x-4 gap-y-8' style={style}>
			{items.map((item, index) => (
				<details
					key={index}
					name={name}
					className='
						[--tabs-index:sibling-index()] grid grid-cols-subgrid grid-rows-subgrid col-span-full row-[1/span_2]
						details-content:col-span-full details-content:row-start-2 details-content:z-1
						open:[&_>_summary]:text-primary-950 open:[&_>_summary]:bg-primary-400 open:[&_>_summary]:border-primary-300 dark:open:[&_>_summary]:text-primary-50 dark:open:[&_>_summary]:bg-primary-600 dark:open:[&_>_summary]:border-primary-700
					'
					style={{ '--tabs-index': index + 1 } as CSSProperties}
					open={index === startIndex}
				>
					<summary className={cn('grid place-content-center col-[calc(var(--tabs-index)+1)] row-1 cursor-pointer select-none bg-body-200 py-[0.75em] corner-shape-3.5 border-body-300 z-1 transition-colors duration-200', clazz)}>{item.title}</summary>
					{item.content}
				</details>
			))}
		</div>
	);
}