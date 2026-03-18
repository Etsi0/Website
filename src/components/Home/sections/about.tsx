import Image from 'next/image';
import { cn } from '@/lib/cn';
import Docs from '@/svg/materialDesignIcons/rounded/docs.svg';
import CasualSelfie from '@/../public/img/production/casual_selfie/test.png';
import { LinkButton } from '@/components/ui/link';

export function About() {
	return (
		<>
			<section id='about' className='grid justify-center gap-3 pt-32 py-16 lg:flex lg:justify-between'>
				<div className='grid justify-items-start gap-[calc(1rem*sqrt(2.5214515486*1)/1.5)] my-auto'>
					<h2>A bit about <span className='italic text-text-800'>myself</span></h2>
					<p>
						Hi! I{"'"}m Albin Karlsson, a full-stack developer from Sweden who can{"'"}t resist improving things. I have a habit of building tools to solve my own problems, and I{"'"}m always looking for ways to make workflows faster and more efficient.
					</p>
					<LinkButton
						className='flex items-center gap-1 text-text-800 bg-body-50 px-[1.5em] py-[0.75em] border border-body-100 rounded-full'
						href='/Albin_Karlsson_CV.pdf'
						download="Albin Karlsson's CV"
						isButton
					>
						<Docs className='size-4 fill-current' /> View My CV
					</LinkButton>
				</div>
				<Image
					className='object-cover object-bottom w-full max-w-prose aspect-373/434 rounded-2xl lg:w-[calc(1rem*373/16)]'
					src={CasualSelfie}
					alt='Portrait of a young man wearing a student cap and a black suit with a red tie.'
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
