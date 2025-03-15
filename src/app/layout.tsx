import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

import '../output.css';
import { ReactScan } from '@/components/reactScan';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<ReactScan />
			<body className='bg-body-100'>
				<div id='root' className='flex min-h-screen flex-col overflow-x-hidden'>
					<Header />
					<main className='mx-auto flex w-full max-w-7xl grow flex-col px-8 pt-16'>{children}</main>
					<Footer />
					<Analytics />
					<SpeedInsights />
				</div>
			</body>
		</html>
	);
}
