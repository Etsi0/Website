import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { ReactScan } from '@/components/reactScan';

import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

import '../output.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<ReactScan />
			<body className='bg-body-50'>
				<ThemeProvider attribute='class'>
					<div id='root' className='flex min-h-screen flex-col'>
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
