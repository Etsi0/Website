'use client';
import Farsight from '@/../public/img/production/companies/Farsight.webp';
import { InfinityScroll } from '@/components/Home/sections/infinityScroll';
const MaxPA = '/img/production/companies/MaxPA.svg';
const HCLTech = '/img/production/companies/HCLTech.svg';

export function InfinityScrollWrapper() {
	return (
		<InfinityScroll
			className={['h-[100px]', 'size-[100px] brightness-1000 invert dark:invert-0']}
			pxPerSec={15}
			gap={50}
			images={[MaxPA, Farsight, HCLTech, MaxPA, Farsight, HCLTech, MaxPA, Farsight, HCLTech]}
			size={100}
		/>
	);
}
