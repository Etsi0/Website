import Head from 'next/head';

import Header from '@/components/header';
import Footer from '@/components/footer';

import '@/components/hueChanger';
import '../output.css';

export default function RootLayout({ children }) {
	return (
		<>
			<Head>
				<meta name='description' content='Description of my page' />
				<meta property='og:title' content='My Page Title' />
				<meta property='og:description' content='Description of my page' />
				<meta property='og:image' content='URL_to_image.jpg' />
			</Head>
			<html lang='en'>
				<body
					className='
						overflow-x-hidden
						flex
						flex-col
						bg-body
						min-h-screen
					'
				>
					<Header />
					<main
						className='
							flex
							flex-col
							grow
							w-full
							max-w-7xl
							pt-16
							px-8
							mx-auto
						'
					>
						{children}
					</main>
					<Footer />
				</body>
			</html>
		</>
	);
}
