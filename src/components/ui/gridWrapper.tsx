import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TSvg = {
	className: string
}
type TGridWrapper = {
	children: ReactNode;
}

function Svg({ className }: TSvg) {
	return (
		<svg
			className={cn(`
				absolute z-2
				w-[calc(var(--square-size)*2)]
				h-[calc(var(--square-size)*2)]
				top-[calc(round(100%*var(--top),2rem)+var(--line-width)/2)]
				left-[calc(round((100%-80rem)/2+(80rem*var(--left)),2rem)+var(--line-width)/2)]
			`, className)}
			width="64"
			height="64"
			aria-hidden="true"
			role="presentation"
		>
			<use href="#corner-tile"/>
		</svg>
	)
}

export function GridWrapper({ children }: TGridWrapper) {
	return (
		<div className='col-full grid *:col-1 *:row-1'>
			<div className='[--line-width:2px] [--square-size:2rem] overflow-clip relative grid -z-1 *:col-1 *:row-1'>
				<svg className="hidden" xmlns="http://www.w3.org/2000/svg">
					<symbol id="corner-tile" viewBox="0 0 64 64">
						<rect width="64" height="64" fill="var(--color-body-50)"/>
						<path d="M31.4932 0.5C31.2286 17.5 17.5 31.2286 0.5 31.4932V0.5H31.4932Z" fill="var(--color-body-50)" stroke="var(--color-body-200)"/>
						<path d="M63.5 0.5V31.4932C46.5 31.2286 32.7714 17.5 32.5068 0.5H63.5Z" fill="var(--color-body-50)" stroke="var(--color-body-200)"/>
						<path d="M0.5 32.5059C17.5 32.7704 31.2286 46.5 31.4932 63.5H0.5V32.5059Z" fill="var(--color-body-50)" stroke="var(--color-body-200)"/>
						<path d="M63.5 63.5H32.5068C32.7714 46.5 46.5 32.7704 63.5 32.5059V63.5Z" fill="var(--color-body-50)" stroke="var(--color-body-200)"/>
					</symbol>
				</svg>
				<div className="bg-[linear-gradient(to_bottom,var(--color-body-200)_var(--line-width),transparent_var(--line-width)),linear-gradient(to_right,var(--color-body-200)_var(--line-width),transparent_var(--line-width))] bg-size-[var(--square-size)_var(--square-size)]"></div>
				<Svg className='[--top:0.51] [--left:0.14]' />
				<Svg className='[--top:0.21] [--left:0.52]' />
				<Svg className='[--top:0.7] [--left:0.72]' />
				<div className="relative bg-[radial-gradient(closest-side,transparent,var(--color-body-50))] z-3"></div>
			</div>
			<div className='breakout-wrapper'>
				{children}
			</div>
		</div>
	);
}