import Image from 'next/image';
import { ReactNode } from "react";
import { cn } from "@/lib/util";
import Silk from "@/components/Silk";

type THeroWrapper = {
	children: ReactNode;
	className?: string;
}

export function HeroWrapper({ children, className }: THeroWrapper) {
	return (
		<section className="col-full grid h-svh max-h-250 *:col-1 *:row-1">
			<div className="relative -z-10 grid size-full min-w-0 min-h-0 *:col-1 *:row-1 ">
				<Silk
					speed={5}
					scale={1}
					fg="primary-200 dark:primary-800"
					bg="body-50"
					noiseIntensity={1.33}
					rotation={6}
				/>
				<noscript>
					<svg className="[--noise-color:oklch(0.5_0_0)] absolute" width="0" height="0" aria-hidden="true">
						<filter id="noise" x="0" y="0" width="100%" height="100%">
							<feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="6" seed="0" result="noise" />
							<feFlood flood-color="var(--noise-color, #fff)" result="color"/>
							<feComposite in="color" in2="noise" operator="in"/>
						</filter>
					</svg>
					<div className='
						relative size-full
						after:absolute after:inset-0 after:filter-[url(#noise)_blur(0.5px)] after:opacity-30 after:pointer-events-none
					'>
						<div className='size-full blur-xl'>
							<div className='bg-primary-200 dark:bg-primary-900 size-full mask-[url("/img/satin-cloth-background-test.jpg")] mask-cover mask-center mask-no-repeat mask-luminance' />
						</div>
					</div>
				</noscript>
			</div>
			<div className={cn("breakout-wrapper place-content-center place-items-center", className)}>{children}</div>
		</section>
	);
}