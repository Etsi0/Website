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
		img: 'https://deltahub.io/cdn/shop/files/Carpio_2024_9_9960615b-81c4-44eb-8c18-25af87777300.png?v=1709220083&width=800',
		title: 'Carpio G2.0',
		points: (
			<>
				<li>
					<p>Glider enkelt</p>
				</li>
				<li>
					<p>Snygg</p>
				</li>
				<li>
					<p>Gratis leverans<span className={cn('text-red-500')}>*</span></p>
				</li>
			</>
		),
		url: 'https://deltahub.io/en-eu/products/carpio-g2-0?variant=43255500538022',
	},	
	{
		img: 'https://ae01.alicdn.com/kf/Hafa92db164124294bf6768503edd2086s/Logitech-Mouse-Charging-Dock-Station-Pitta-Studio-Plastic-Power-Bank-Base-For-G403-502-703-903.jpg_.webp',
		title: 'Logitech Mouse Charging Dock',
		points: (
			<>
				<li>
					<p>
						Höjer bekvämligheten vid laddning och eliminerar behovet av att upprepade
						gånger koppla ifrån och ansluta sändaren för att ladda musen.
					</p>
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
	{
		img: 'https://cdn.shopify.com/s/files/1/0567/1505/1123/products/Embody_Gaming_Chair-Cyan-03_1280x1280.jpg?w=1028&q=75&fit=fillmax&auto=format',
		title: 'Herman Miller Embody',
		points: (
			<>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Anpassbar</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>Ryggraden får stöd, oavsett hur man gillar att sitta</p>
				</li>
				<li>
					<h3 className={cn(`text-xl`)}>Rabat kod:</h3>
					<p>
						{'"'}Vi sover ungefär 1/3 av våra liv, så det har alltid varit vettigt för
						mig att spendera mycket pengar för att göra det perfect{'"'} -{' '}
						<a
							href='https://www.youtube.com/watch?v=yy4Dd9ICtFA&t=35s'
							className={cn('text-primary-500')}
						>
							Matthias
						</a>{' '}
						så varför inte göra samma sak med andra möbler?
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
];
