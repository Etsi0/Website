import { cn } from '@/lib/util';

type IProductJson = {
	img: string;
	title: string;
	points?: JSX.Element | JSX.Element[];
	video?: string;
	url?: string;
};
export const WishlistJson: IProductJson[] = [
	{
		img: 'https://deltakeyco.com/cdn/shop/products/Gift-Card-Render-3-3_1.jpg?v=1675622518&width=1080',
		title: 'Delta Key Co. Gift Card',
		points: [<>Gör så att jag kan köpa vad jag vill på deras hemsida</>],
		url: 'https://deltakeyco.com/en-se/products/gift-card?variant=44263341490408',
	},
	{
		img: 'https://pricespy-75b8.kxcdn.com/product/back/800/4829502.jpg',
		title: 'Soundbar',
		points: [
			<>
				<b>Funktioner</b>:
				<ul className={cn('list-inside list-disc')}>
					<li>ARC</li>
					<li>5.1 – 9.1</li>
					<li>Dolby Atmos</li>
				</ul>
			</>,
			<>
				<b>Färg</b>: Helst vit annars svart
			</>,
		],
		url: 'https://www.prisjakt.nu/c/hemmabiosystem?143=378%7C374%7C37643&258=23287%7C5523%7C128%7C129%7C5525%7C126%7C92&3666=31644',
	},
	{
		img: 'https://ae01.alicdn.com/kf/Hafa92db164124294bf6768503edd2086s/Logitech-Mouse-Charging-Dock-Station-Pitta-Studio-Plastic-Power-Bank-Base-For-G403-502-703-903.jpg_.webp',
		title: 'Logitech Mouse Charging Dock',
		points: [
			<>
				<b>Fördelar</b>:
			</>,
			<ul className={cn('list-inside list-disc')}>
				<li>Alltid laddad när man behöver den</li>
				<li>Laddar upp till 80%</li>
			</ul>,
		],
		url: 'https://www.aliexpress.com/item/1005002978549349.html',
	},
	{
		img: 'https://x-gamer.com/cdn/shop/files/cat1-new_e7b1482c-50d5-413e-b912-331114de223b_540x.png?v=1668501437',
		title: 'X-Tubz',
		points: [
			<>
				<b className='text-text-400'>Rabat kod</b>: få <b>10%</b> rabat på X-Gamer med koden{' '}
				<q>
					<b>STAMSITE</b>
				</q>
				!
			</>,
			<>
				<b>Favoriter</b>:
				<ul className={cn('list-inside list-disc')}>
					<li>Hyperbeast</li>
					<li>Dr. Beast</li>
				</ul>
			</>,
		],
		url: 'https://x-gamer.com/collections/x-tubz',
	},
	{
		img: 'https://cdn.shopify.com/s/files/1/0567/1505/1123/products/Embody_Gaming_Chair-Cyan-03_1280x1280.jpg?w=1028&q=75&fit=fillmax&auto=format',
		title: 'Herman Miller Embody',
		points: [
			<>
				<b>Funktioner</b>:
				<ul className={cn('list-inside list-disc')}>
					<li>Alla functions som är på IKEA MARKUS</li>
					<li>Sittdjup</li>
					<li>Armstödets bredd och höjd</li>
					<li>Lutningsbegränsare</li>
					<li>BackFit™</li>
				</ul>
			</>,
			<>
				<b>Komfort för långa timmar</b>: Precis som när du skulle välja den bilen, är Embody
				designad med din hälsa i åtanke, främjar en bra hållning och minskar risken för värk
				och smärta i samband med att sitta under långa perioder.
			</>,
			<>
				<b>Investering</b>: Embody-stolen är som att investera i ett premiumverktyg. Även om
				initialkostnaden är hög, uppväger de långsiktiga vinsterna genom att den inte
				behöver bytas ut lika ofta och främjar hälsa och komfort.
			</>,
		],
		video: 'https://youtu.be/i4gnvmcD9V4?t=132',
		url: 'https://segaming.hermanmiller.com/products/embody-gaming-chair-cyan?storeRedirect=SE',
	},
	{
		img: 'https://cdn.shopify.com/s/files/1/0280/8099/6440/products/EmbodyMaster.127_750x.png.jpg?w=750&q=75&fit=fillmax&auto=format',
		title: 'Nackstöd för Embody',
		points: (
			<>
				<li className='list-inside list-disc'>Anpassbar</li>
				<li className='list-inside list-disc'>
					Förlorar inte garantin på stolen ifall nackstödet förstör stolen
				</li>
				<li className='list-inside list-disc'>
					Använder samma matrial och färg som Herman Miller
				</li>
			</>
		),
		video: 'https://www.youtube.com/watch?v=OMi9p3V1-Hg',
		url: 'https://www.atlasheadrest.com/products/headrest-for-embody-gaming-chair?variant=44230820331799',
	},
	{
		img: 'https://cdn.sanity.io/images/jjv48zaf/production/71f6b7a26744adb58f873a4874aaa23ab56e5676-8688x5792.jpg?w=2048&q=75&fit=fillmax&auto=format',
		title: ' Japanska knivar',
		points: (
			<>
				<li className='list-inside list-disc'>
					Handsmidd, högkvalitativt stål för långvarig skärpa
				</li>
				<li className='list-inside list-disc'>
					Möjliggör precisionsskärning för förbättrad smak och presentation
				</li>
				<li className='list-inside list-disc'>
					Lämplig för ett brett spektrum av matlagningsuppgifter, förenklar
					köksuppsättning.
				</li>
			</>
		),
		url: 'https://www.cervera.se/inspiration/guider/japansk-knivskola/',
	},
];
