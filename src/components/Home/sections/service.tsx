import { HTMLAttributes } from 'react';
import { cn } from '@/lib/util';

function Cell({
	className,
	...props
}: {
	className: string;
	props?: HTMLAttributes<HTMLDivElement>;
}) {
	return (
		<>
			<div
				className={cn('rounded-lg bg-body-50 dark:bg-body-200', className)}
				{...props}
			></div>
		</>
	);
}

export async function Service() {
	return (
		<>
			<section className='space-y-3'>
				<div className='grid justify-items-center'>
					<h2>What I Can Do</h2>
					<p className='bg-red-500 text-lime-500'>something here</p>
				</div>
				<div className='grid grid-cols-3 gap-8 *:self-start'>
					<div className='rounded-lg bg-body-50 p-3 shadow-lg dark:bg-body-200'>
						<h3>Communication</h3>
						<p>
							Great at explaining complex ideas for people that dosen{"'"}t know
							coding
						</p>
					</div>
					<div className='rounded-lg bg-body-50 p-3 shadow-lg dark:bg-body-200'>
						<h3>Design</h3>
						<p>Good looking user interface</p>
					</div>
					<div className='rounded-lg bg-body-50 p-3 shadow-lg dark:bg-body-200'>
						<h3>Development</h3>
						<p>Performant code</p>
					</div>
				</div>
			</section>
		</>
	);
}
