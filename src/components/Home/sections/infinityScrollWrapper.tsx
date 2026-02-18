'use client';
import { InfinityScroll } from './infinityScroll';
import Icon from '@/../public/img/production/icon.png';
import Farsight from '@/../public/img/production/companies/Farsight.webp';
const MaxPA = '/img/production/companies/MaxPA.svg';
const HCLTech = '/img/production/companies/HCLTech.svg';

export function InfinityScrollWrapper() {
	return (
		<InfinityScroll
			className={['h-[100px]', 'size-[100px] not-nth-[4n+2]:brightness-1000 not-nth-[4n+2]:invert dark:not-nth-[4n+2]:invert-0']}
			pxPerSec={15}
			gap={50}
			images={[MaxPA, Icon, Farsight, HCLTech, MaxPA, Icon, Farsight, HCLTech, MaxPA, Icon, Farsight, HCLTech]}
			size={100}
		/>
	);
}
