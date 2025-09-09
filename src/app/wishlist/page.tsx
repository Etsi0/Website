import type { Metadata } from 'next';
import { db } from '@vercel/postgres';
import { z } from 'zod';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { schemaWishlist } from '@/schema/wishlist/main';
import Play from '@/svg/play.svg';
import { LinkButton } from '@/components/ui/link';
import { pageTitle } from '@/lib/util';

// Cache for 24 hours (86400 seconds)
export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: pageTitle('Wishlist'),
		description: 'A list of product i would like to have sometime in the future',
	};
}

function Card({ product }: { product: z.infer<typeof schemaWishlist>[number] }) {
	return (
		<div className='flex w-72 flex-col gap-3 self-stretch rounded-lg bg-body-50 p-4 shadow-lg dark:bg-body-200'>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				alt={`Image of a product called '${product.title}'`}
				className='mx-auto aspect-square w-48 rounded-md bg-primary-50 object-cover dark:bg-body-300'
				decoding='async'
				loading='lazy'
				src={product.img}
			/>
			<h2 className='text-center text-xl font-semibold leading-6'>{product.title}</h2>
			<div className='grow text-base leading-5 [&_ul]:list-inside [&_ul]:list-disc'>{product.description && <MDXRemote source={product.description.replace(/\\n/g, '\n')} />}</div>
			{product.video && (
				<LinkButton href={product.video} className='rounded-md bg-red-500 p-3'>
					<Play className='mx-auto size-4 fill-primary-50' />
				</LinkButton>
			)}
			{product.url && (
				<LinkButton href={product.url} className='rounded-md bg-primary-500 p-3 text-center text-primary-50'>
					Link
				</LinkButton>
			)}
		</div>
	);
}

export default async function page() {
	const client = await db.connect();
	const { rows } = await client.sql`SELECT * FROM wishlist;`;
	const parsedRows = schemaWishlist.safeParse(rows);
	if (!parsedRows.success) {
		return <>Something when wrong please contact admin</>;
	}

	parsedRows.data.sort((a, b) => {
		// Handle null priorities
		if (a.priority === null && b.priority === null) return 0;
		if (a.priority === null) return 1; // null values go to the end
		if (b.priority === null) return -1;

		// Normal number comparison
		return a.priority - b.priority;
	});

	return (
		<>
			<div className='m-8 grid justify-center gap-3 text-center'>
				<h1>Wishlist</h1>
				<p>If you are on this page and do not know me IRL, then why are you here</p>
			</div>
			<div className='mb-16 flex flex-wrap items-start justify-center gap-5'>
				{parsedRows.data.map((item, index: number) => (
					<Card key={index} product={item} />
				))}
				<Card
					product={{
						id: 0,
						img: 'https://cdn.breakit.se/assets/article/e2eba1adead60a413151daae0aed2fd0.jpg?w=980&q=75&fit=fillmax&auto=format',
						title: 'Pengar',
						description: 'Pengar är alltid nice',
						video: null,
						url: null,
						priority: null,
					}}
				></Card>
			</div>
		</>
	);
}
