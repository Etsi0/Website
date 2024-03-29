import { cn } from '@/lib/util';

export default function Footer() {
	return (
		<>
			<footer className={cn('bg-primary-500')}>
				<hr />
				<div className={cn('grid justify-items-center py-16')}>
					<p className={cn('text-input')}>Phadonia | 2022 - {new Date().getFullYear()}</p>
				</div>
			</footer>
		</>
	);
}
