import Image from 'next/image';

import Download from '@/svg/materialDesignIcons/rounded/download.svg';
import StudentCapSelfie from '@/../public/img/production/student cap selfie/selfie.webp';
import { LinkButton } from '@/components/ui/link';

export function About() {
	return (
		<>
			<section id='about' className='py-8'>
				<div className='grid justify-items-center'>
					<h2>About Me</h2>
					<p>My Introduction</p>
				</div>
				<div className='grid place-items-center gap-3 pt-3 lg:grid-cols-2'>
					<div>
						<Image
							className='aspect-square w-full max-w-prose rounded-2xl object-cover'
							src={StudentCapSelfie}
							alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
							width={449}
							height={449}
							sizes='(max-width: 1024px) 100%, 449px'
							blurDataURL={StudentCapSelfie.blurDataURL}
							placeholder='blur'
						/>
					</div>
					<div className='my-auto space-y-3'>
						<h3>Working With Passion</h3>
						<p>
							As a full-stack developer specializing in modern web technologies, I develop enterprise payroll systems and create developer tools that have collected over 3,000 downloads.
							When I{"'"}m not coding, I enjoy mentoring aspiring programmers on Discord, building custom mechanical keyboards or computers, and exploring the latest in tech.
						</p>
						<LinkButton
							className='inline-flex items-center rounded-md bg-primary-500 px-[1.5em] py-[0.75em] font-semibold text-primary-100'
							href='/Albin_Karlsson_CV.pdf'
							download="Albin Karlsson's CV"
							isButton
						>
							Download CV <Download className='size-6 fill-current' />
						</LinkButton>
					</div>
				</div>
			</section>
		</>
	);
}
