import type { ReactNode } from "react";
import Silk from "@/components/Silk";

type THeroWrapper = {
	children: ReactNode;
}

export function SilkWrapper({ children }: THeroWrapper) {
	return (
		<div className="col-full relative">
			<div className="absolute grid inset-0 -z-10 *:col-1 *:row-1">
				<Silk
					speed={5}
					scale={1}
					fg="var(--color-primary-100) dark:var(--color-primary-800)"
					bg="var(--color-body-50) dark:var(--color-body-100)"
					noiseIntensity={1.33}
					rotation={6}
				/>
				<noscript>
					<svg className="[--noise-color:oklch(0.1_0_0)] absolute" width="0" height="0" aria-hidden="true">
						<filter id="noise" x="0" y="0" width="100%" height="100%">
							<feTurbulence type="fractalNoise" baseFrequency="0.333" numOctaves="6" seed="0" result="noise" />
							<feFlood flood-color="var(--noise-color, #fff)" result="color"/>
							<feComposite in="color" in2="noise" operator="in"/>
						</filter>
					</svg>
					<div className='
						relative size-full
						after:absolute after:inset-0 after:filter-[url(#noise)_blur(0.5px)] after:opacity-30 after:mix-blend-plus-lighter after:pointer-events-none
					'>
						<div className='size-full blur-xl'>
							<div className='bg-primary-200 dark:bg-primary-900 size-full mask-[url("/img/satin-cloth-background-test.jpg")] mask-cover mask-center mask-no-repeat mask-luminance' />
						</div>
					</div>
				</noscript>
			</div>
			<div className="breakout-wrapper">
				{children}
			</div>
		</div>
	);
}