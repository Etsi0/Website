import { ReactNode } from "react";

export function InlineCode({ children }: { children: ReactNode }) {
	return (
		<code className='text-[calc(1em-1em/6)] align-center bg-body-100 px-[calc(1em/3)] py-[calc(1em/6)] corner-shape-[calc(1em/3)]'>
			{children}
		</code>
	)
}