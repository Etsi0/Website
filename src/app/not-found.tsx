import Person from '@/svg/person.svg';
import { LinkButton } from '@/components/ui/link';

export default function App() {
	return (
		<>
			<section className='grid place-content-center place-items-center text-center min-h-[min(62.5rem,100svh)]'>
				<div className='grid place-items-center *:col-[1/span_1] *:row-[1_/span_1]'>
					<h1 className='font-sans-serif font-bold text-[clamp(1rem,50vw,16rem)] text-primary-500'>404</h1>
					<div className='h-full'>
						<Person className='h-full text-primary-300' />
					</div>
				</div>
				<p className='max-w-prose p-4'>Lost your way? No worries, we&apos;ve all been there. Just like our coffee-loving friend here. Let&apos;s guide you home.</p>
				<LinkButton href='/' className='text-primary-50 bg-primary-500 px-[1.5em] py-[0.75em] rounded-md' isButton>
					Home Page
				</LinkButton>
			</section>
		</>
	);
}
