'use client'
import { LinkButton } from "@/components/ui/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/util";
import { navLinks } from "@/json/navLinks";
import { usePathname } from "next/navigation";

export function Navigation() {
	const [currentPath, setCurrentPath] = useState<string>('');
	const pathname = usePathname();

	useEffect(() => {
		if (window.location.hash) {
			setCurrentPath(pathname + window.location.hash);
			console.log(pathname + window.location.hash);
		}
	}, [pathname]);

	const isActive = useCallback((path: string) => {
		return currentPath === path || (
			['', '/'].includes(currentPath) && path === '/#home'
		);
	}, [currentPath]);

	return (
		<nav id="mobile-nav" className='[position-area:bottom_left] bg-body-50 min-w-72 mt-4.5 -mr-6' aria-label='Main Navigation' popover="">
			<ul>
				{navLinks.internal.map((link) => (
					<li key={link.path}>
						<LinkButton
							tabIndex={isActive(link.path) ? -1 : 0}
							className={cn(
								'block p-3 text-text-900',
								isActive(link.path) && 'bg-primary-500 text-primary-50 w-full text-left',
								!isActive(link.path) && 'hover:bg-primary-100 hover:text-primary-600 focus-visible:bg-primary-100 focus-visible:text-primary-600 dark:hover:bg-primary-800 dark:hover:text-primary-400 dark:focus-visible:bg-primary-800 dark:focus-visible:text-primary-400'
							)}
							href={link.path}
							isButton
							isHoverable={false}
							isFocusable={false}
						>
							{link.name}
						</LinkButton>
					</li>
				))}
			</ul>
		</nav>
	);
}