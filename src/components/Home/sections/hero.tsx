import Image from 'next/image';

import { cn } from '@/lib/util';

import { YearsElapsed } from '@/components/yearsElapsed';
import { TypingText } from '@/components/typingText';

import { SocialLinkJson } from '@/json/socialLink';
import selfie from '@/../public/img/production/casual_selfie/selfie.webp';
import Location from '@/svg/materialDesignIcons/location_on.svg';

function SocialLinks({ className }: { className: string }) {
	return (
		<ul className={cn('gap-3', className)} aria-label='Social Media Links'>
			{SocialLinkJson.map((item, index) => (
				<li key={index}>
					<a className='group block rounded-sm' href={item.path} target='blank_' rel='noopener' aria-label={item.name}>
						<item.img className='h-8 text-primary-500 group-hover:text-primary-50 group-focus-visible:text-primary-50' />
					</a>
				</li>
			))}
		</ul>
	);
}

export function Hero() {
	return (
		<>
			<section id='home' className='heroSection grid content-center justify-items-center gap-3 lg:grid-cols-2'>
				<div className='grid gap-3 self-center'>
					<div>
						<h1>Hi, I{"'"}m Albin</h1>
						<h2 className='min-h-10'>
							<TypingText textArray={['Software Engineer', '// Full-stack Dev', '<!-- Front-end Dev -->', '-- Back-end Dev']} delay={500} speed={100} />
						</h2>
					</div>
					<div>
						<p>
							<Location className='inline size-4 fill-primary-300 align-sub' />
							Sweden, Skövde
						</p>
						<p className='group max-w-prose'>
							As a <YearsElapsed startDate={new Date('2003-08-25')} />
							-year-old Software Engineer, I lead development of the MaxPA payroll system at PA-Utveckling AB and develop extensions used by thousands of VS Code developers.
						</p>
					</div>
					<SocialLinks className='hidden lg:flex' />
				</div>
				<Image
					className='aspect-square w-full max-w-prose rounded-2xl object-cover object-[50%,25%] [mask-position:_center] [mask-repeat:_no-repeat] [mask-size:_contain] lg:[mask-image:_url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTg3Ij48cGF0aCBkPSJNMTkwIDM2YzE3IDI2IDExIDY3LTggOTgtMTkgMzItNTEgNTQtODIgNTItMzAtMS01OS0yNS03OC01N0MyIDk4LTcgNTkgNyAzNSAyMSAxMCA2MCAwIDk4IDBzNzYgMTEgOTIgMzZaIi8+PC9zdmc+")]'
					src={selfie.src}
					alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
					width={562}
					height={562}
					sizes='(max-width: 375px) 311px, (max-width: 390px) 322px, (max-width: 577px) 514px, 562px'
					blurDataURL={selfie.blurDataURL}
					placeholder='blur'
				/>
				<SocialLinks className='flex lg:hidden' />
			</section>
		</>
	);
}
