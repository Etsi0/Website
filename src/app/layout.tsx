import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/util';

import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';

import '../output.css';

export default function RootLayout({ children }) {
	return (
		<>
			<html lang='en'>
				<body className={cn('flex min-h-screen flex-col overflow-x-hidden bg-body-100')}>
					<Header />
					<main className={cn('mx-auto flex w-full max-w-7xl grow flex-col px-8 pt-16')}>
						{children}
					</main>
					<Footer />
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		</>
	);
}
