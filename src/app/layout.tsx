import { ReactNode } from 'react';
import { Inter, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local'
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

const instrumentSerif = Instrument_Serif({
	weight: ['400'],
	style: ['normal', 'italic'],
	display: 'swap',
	variable: '--font-instrument-serif',
	subsets: ['latin', 'latin-ext'],
});

const jetBrainsMono = localFont({
	src: [
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Thin.woff2', weight: '100', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ThinItalic.woff2', weight: '100', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraLight.woff2', weight: '200', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraLightItalic.woff2', weight: '200', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Light.woff2', weight: '300', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-LightItalic.woff2', weight: '300', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Italic.woff2', weight: '400', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Medium.woff2', weight: '500', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-MediumItalic.woff2', weight: '500', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-SemiBold.woff2', weight: '600', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-Bold.woff2', weight: '700', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-BoldItalic.woff2', weight: '700', style: 'italic' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraBold.woff2', weight: '800', style: 'normal' },
		{ path: '../../public/font/JetBrainsMono-2.304/fonts/webfonts/JetBrainsMono-ExtraBoldItalic.woff2', weight: '800', style: 'italic' },
	],
	display: 'swap',
	variable: '--font-jetBrains-mono',
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
