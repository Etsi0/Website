import Image from 'next/image';
import { cn } from '@/lib/cn';
import Docs from '@/svg/materialDesignIcons/rounded/docs.svg';
import ArrowOutward from '@/svg/materialDesignIcons/outline/folder_supervised.svg';
import CasualSelfie from '@/../public/img/production/casual_selfie/test.png';
import { LinkButton } from '@/components/ui/link';

type AboutProp = {
	className?: string;
	heading?: 'h1' | 'h2';
	showAboutMeLink?: boolean;
};

export function About({ className, heading = 'h2', showAboutMeLink = true }: AboutProp) {
	const Heading = heading;

	return (
		<>
			<section id='about' className={cn('grid place-items-center gap-3 pt-32 py-16 lg:flex lg:justify-between', className)}>
				<div className='grid justify-items-start gap-[calc(1rem*sqrt(2.5214515486*1)/1.5)] my-auto'>
					<Heading>A bit about <span className='italic text-body-850 dark:text-body-150'>myself</span></Heading>
					<p>
						Hi! I&apos;m Albin Karlsson, a full-stack developer from Sweden. Professionally I work in LAMP on a payroll system, where the data has to be right. On my own time I write TypeScript, and I pick Vite, Preact, or Next.js depending on what the project actually needs.
					</p>
					<div className='flex gap-2'>
						<LinkButton
							className='flex items-center gap-1 text-body-850 bg-body-50 px-[1.5em] py-[0.75em] border border-body-100 rounded-full dark:text-body-150 dark:bg-body-950 dark:border-body-900'
							href='/Albin_Karlsson_CV.pdf'
							download="Albin Karlsson's CV"
							isButton
						>
							<Docs className='size-4 fill-current' /> View My CV
						</LinkButton>
						{showAboutMeLink && (
							<LinkButton
								className='flex items-center gap-1 text-body-850 bg-body-50 px-[1.5em] py-[0.75em] border border-body-100 rounded-full dark:text-body-150 dark:bg-body-950 dark:border-body-900'
								href='/about'
								isButton
							>
								<ArrowOutward className='size-4 fill-current' aria-hidden="true" /> More about me
							</LinkButton>
						)}
					</div>
				</div>
				<Image
					className='object-cover object-bottom inline-full max-inline-[calc(1rem*373/16)] aspect-373/434 rounded-2xl'
					src={CasualSelfie}
					alt='Portrait of me in a brown hoodie looking at the camera straight on.'
					width={373}
					height={434}
					sizes='(max-width: 1024px) 100%, 449px'
					blurDataURL={CasualSelfie.blurDataURL}
					placeholder='blur'
				/>
			</section>
		</>
	);
}
