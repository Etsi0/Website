import Head from 'next/head';

import { cn } from '@/lib/util';

import Header from '@/components/header';
import Footer from '@/components/footer';

import '../output.css';

export default function RootLayout({ children }) {
	return (
		<>
			<Head>
				<meta property='og:type' content='website' />
				<meta property='og:type' content='website' />
				<meta property='og:image' content='URL_to_image.jpg' />
			</Head>
			<html lang='en'>
				<body className={cn('flex min-h-screen flex-col overflow-x-hidden bg-body-100')}>
					<Header />
					<main className={cn('mx-auto flex w-full max-w-7xl grow flex-col px-8 pt-16')}>
						{children}
					</main>
					<Footer />
				</body>
			</html>
		</>
	);
}
