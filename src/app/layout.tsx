import Header from '@/components/header';
import Footer from '@/components/footer';

import '@/components/hueChanger';
import '../output.css';

export default function RootLayout({ children }) {
	return (
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
	);
}
