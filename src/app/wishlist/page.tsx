import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/util';

import { WishlistJson } from '@/json/wishlist/wishlist';

type IProductJson = {
	img: string;
	title: string;
	points?: JSX.Element;
	video?: string;
	url?: string;
};
type ICard = {
	product: IProductJson;
	className?: any;
	children?: ReactNode;
};

function Card(prop: ICard) {
	const { product, className, children } = prop;
	return (
		<div
			className={cn(
				`flex w-72 flex-col gap-3 rounded-lg bg-white p-4 shadow-lg dark:bg-body-800`,
				className,
			)}
		>
			{((product.img && product.title) || product.title) && (
				<img
					src={product.img ?? ''}
					alt={`Image of a product called '${product.title}'`}
					className={cn(
						`mx-auto aspect-square w-48 rounded-md bg-primary-50 object-cover dark:bg-body-700`,
					)}
				/>
			)}
			{product.title && (
				<h2 className={cn(`overflow-hidden text-ellipsis text-center text-3xl`)}>
					{product.title}
				</h2>
			)}
			{children}
			{product.video && (
				<a
					href={product.video}
					target='_blank'
					className={cn(`w-full rounded-md bg-red-500 p-3 text-center text-input`)}
				>
					▷
				</a>
			)}
			{product.url && (
				<a
					href={product.url}
					target='_blank'
					className={cn('w-full rounded-md bg-primary-500 p-3 text-center text-input')}
				>
					Link
				</a>
			)}
		</div>
	);
}

export default function page() {
	return (
		<>
			<div className='m-8 grid justify-center gap-3 text-center'>
				<h1>Wishlist</h1>
				<p>If you are on this page and do not know me IRL, then why are you here</p>
			</div>
			<div className={cn('mb-16 flex flex-wrap items-start justify-center gap-5')}>
				{WishlistJson.map((item, index: number) => (
					<Card key={index} product={item} className={cn('self-stretch')}>
						<ul className={cn(`grow`)}>{item.points}</ul>
					</Card>
				))}
				<Card
					product={{
						img: 'https://cdn.breakit.se/assets/article/e2eba1adead60a413151daae0aed2fd0.jpg?w=980&q=75&fit=fillmax&auto=format',
						title: 'Pengar',
					}}
				></Card>
			</div>
		</>
	);
}
