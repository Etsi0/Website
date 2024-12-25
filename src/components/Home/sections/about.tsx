import Image from 'next/image';

import { Download } from '@/components/SVGs';
import StudentCapSelfie from '@/../public/img/production/student cap selfie/selfie.webp';

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
						<a
							className='group inline-block space-x-1 rounded-md bg-primary-500 px-6 py-3 text-input hover:bg-primary-50 hover:text-primary-500 focus-visible:bg-primary-50 focus-visible:text-primary-500'
							href='/Albin_Karlsson_CV.pdf'
							download="Albin Karlsson's CV"
							target='_blank'
							rel='noopener'
						>
							<span className='align-middle'>Download CV</span>
							<Download className='inline-block h-5 text-input group-hover:text-primary-500 group-focus-visible:text-primary-500' />
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
