import { cn } from '@/lib/util';

type IProductJson = {
	img: string;
	title: string;
	points?: JSX.Element;
	video?: string;
	url?: string;
};
export const WishlistJson: IProductJson[] = [
	{
		img: 'https://deltakeyco.com/cdn/shop/products/Gift-Card-Render-3-3_1.jpg?v=1675622518&width=1080',
		title: 'Delta Key Co. Gift Card',
		points: (
			<>
				<li>
					<p>Tillåter mig att köpa vad jag vill på deras hemsida</p>
				</li>
			</>
		),
		url: 'https://deltakeyco.com/en-se/products/gift-card?variant=44263341490408',
	},
	{
		img: 'https://pricespy-75b8.kxcdn.com/product/back/800/4829502.jpg',
		title: 'Soundbar',
		points: (
			<>
				<li>
					<h3 className={cn(`text-xl`)}>Funktioner:</h3>
					<ul className={cn('list-inside list-disc')}>
						<li>ARC</li>
						<li>5.1+</li>
						<li>Dolby Atmos</li>
					</ul>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Färg:</h3>
					<p>Helst vit annars svart</p>
				</li>
			</>
		),
		url: 'https://www.prisjakt.nu/c/hemmabiosystem?143=378%7C374%7C37643&258=23287%7C5523%7C128%7C129%7C5525%7C126%7C92&3666=31644',
	},
	{
		img: 'https://ae01.alicdn.com/kf/Hafa92db164124294bf6768503edd2086s/Logitech-Mouse-Charging-Dock-Station-Pitta-Studio-Plastic-Power-Bank-Base-For-G403-502-703-903.jpg_.webp',
		title: 'Logitech Mouse Charging Dock',
		points: (
			<>
				<li>
					<h3 className={cn(`text-xl`)}>Pros:</h3>
					<p>
						Behöver inte dra ut sladen från den trådlösa transmittorn för att kunna
						ladda mussen
					</p>
					<p>Den sluttar ladda när den har mer en 80%</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Cons:</h3>
					<p>Levererar från Kina</p>
				</li>
			</>
		),
		url: 'https://www.aliexpress.com/item/1005002978549349.html',
	},
	{
		img: 'https://x-gamer.com/cdn/shop/files/cat1-new_e7b1482c-50d5-413e-b912-331114de223b_540x.png?v=1668501437',
		title: 'X-Tubz',
		points: (
			<>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Använd koden STAMSITE för att få 10% rabat på X-Gamer!</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Favoriter:</h3>
					<p>Hyperbeast</p>
					<p>Dr. Beast</p>
				</li>
			</>
		),
		url: 'https://x-gamer.com/collections/x-tubz',
	},
	{
		img: 'https://cdn.shopify.com/s/files/1/0567/1505/1123/products/Embody_Gaming_Chair-Cyan-03_1280x1280.jpg?w=1028&q=75&fit=fillmax&auto=format',
		title: 'Herman Miller Embody',
		points: (
			<>
				<li>
					<h3 className={cn(`text-xl`)}>Anpassbar:</h3>
					<ul className={cn('list-inside list-disc')}>
						<li>Sittdjup</li>
						<li>Armstödets bredd och höjd</li>
						<li>Lutningsspänning</li>
						<li>Sits- och ryggstödsvinkel</li>
					</ul>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Komfort för långa timmar:</h3>
					<p>
						Precis som när du skulle välja den bilen, är Embody designad med din hälsa i
						åtanke, främjar en bra hållning och minskar risken för värk och smärta i
						samband med att sitta under långa perioder.
					</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Investering:</h3>
					<p>
						Embody-stolen är som att investera i premiumverktyg för din karriär. Även om
						initialkostnaden är märkbar, uppväger de långsiktiga vinsterna i hälsa,
						komfort och produktivitet det vida. Det är en investering i ditt
						välbefinnande som förbättrar ditt arbetsliv.
					</p>
				</li>
			</>
		),
		video: 'https://youtu.be/i4gnvmcD9V4?t=132',
		url: 'https://segaming.hermanmiller.com/products/embody-gaming-chair-cyan?storeRedirect=SE',
	},
	{
		img: 'https://cdn.shopify.com/s/files/1/0280/8099/6440/products/EmbodyMaster.127_750x.png.jpg?w=750&q=75&fit=fillmax&auto=format',
		title: 'Nackstöd för Embody',
		points: (
			<>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Anpassbar</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Förlorar inte garantin på stolen ifall nackstödet förstör stolen</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Använder samma matrial och färg som Herman Miller</p>
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
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Handsmidd, högkvalitativt stål för långvarig skärpa.</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Möjliggör precisionsskärning för förbättrad smak och presentation.</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>
						Lämplig för ett brett spektrum av matlagningsuppgifter, förenklar
						köksuppsättning.
					</p>
				</li>
			</>
		),
		url: 'https://www.cervera.se/inspiration/guider/japansk-knivskola/',
	},
];
