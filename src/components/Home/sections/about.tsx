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
							Hi there! I recently completed my upper secondary school engineering
							degree at NTI Gymnasiet and the CS50x course from Harvard University, an
							introduction to computer science and programming. During my time at NTI,
							I won NTI{"'"}s Game On competition twice in a row. My passion for
							technology extends beyond programming; in my free time, I enjoy building
							things, gaming, and creating new programs. I am enthusiastic about using
							my knowledge to develop innovative digital solutions.
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
