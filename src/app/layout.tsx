import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';

import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

import '../app.css';
import Script from 'next/script';

const inter = Inter({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-inter',
	subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning className={inter.className}>
			<head>
				{process.env.NODE_ENV === 'development' && (
					<Script
						src="//unpkg.com/react-scan/dist/auto.global.js"
						crossOrigin="anonymous"
						strategy="beforeInteractive"
					/>
				)}
			</head>
			<body className='bg-body-50'>
				<ThemeProvider attribute='class'>
					<div id='root' className='flex min-h-svh flex-col'>
						<Header />
						<main className='breakout-wrapper w-full grow pt-16'>{children}</main>
						<Footer />
						<Analytics />
						<SpeedInsights />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
