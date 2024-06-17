import { ReactNode } from 'react';
import type { Metadata } from 'next';

import { type TProduct, WishlistJson } from '@/json/wishlist/wishlist';

export const metadata: Metadata = {
	title: 'Wishlist - Phadonia',
	description: 'A list of product i wish to get sometime in the future',
};

function Card({ product }: { product: TProduct }) {
	return (
		<div className='flex w-72 flex-col gap-3 self-stretch rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'>
			{((product.img && product.title) || product.title) && (
				<img
					src={product.img ?? ''}
					alt={`Image of a product called '${product.title}'`}
					className='mx-auto aspect-square w-48 rounded-md bg-primary-50 object-cover dark:bg-body-300'
				/>
			)}
			{product.title && (
				<p className='text-center text-xl font-semibold leading-6 text-text-600'>
					{product.title}
				</p>
			)}
			<ul className='grow text-base leading-5'>
				{(Array.isArray(product.points) &&
					product.points.map((item, index) => <li key={index}>{item}</li>)) ||
					product.points}
			</ul>
			{product.video && (
				<a
					href={product.video}
					target='_blank'
					className='w-full rounded-md bg-red-500 p-3 text-center text-input'
				>
					▷
				</a>
			)}
			{product.url && (
				<a
					href={product.url}
					target='_blank'
					className='w-full rounded-md bg-primary-500 p-3 text-center text-input'
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
			<div className='mb-16 flex flex-wrap items-start justify-center gap-5'>
				{WishlistJson.map((item, index: number) => (
					<Card key={index} product={item} />
				))}
				<Card
					product={{
						img: 'https://cdn.breakit.se/assets/article/e2eba1adead60a413151daae0aed2fd0.jpg?w=980&q=75&fit=fillmax&auto=format',
						title: 'Pengar',
						points: (
							<>
								<li className='list-inside list-disc'>Pengar är alltid nice</li>
							</>
						),
					}}
				></Card>
			</div>
		</>
	);
}
