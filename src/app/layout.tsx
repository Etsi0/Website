import { ReactNode } from 'react';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';

import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

import '../app.css';
import Script from 'next/script';

const inter = Inter({
	weight: 'variable',
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-inter',
	subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese'],
});

const instrumentSerif = Instrument_Serif({
	weight: ['400'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-instrument-serif',
	subsets: ['latin', 'latin-ext'],
});

const jetBrainsMono = JetBrains_Mono({
	weight: 'variable',
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-jetbrains-mono',
	subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'vietnamese'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}>
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
						<main className='breakout-wrapper w-full grow'>{children}</main>
						<Footer />
						<Analytics />
						<SpeedInsights />
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
