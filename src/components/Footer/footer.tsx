import Link from 'next/link';

export default function Footer() {
	return (
		<>
			<hr />
			<footer className='space-y-8 bg-primary-500 p-16 text-input'>
				<div className='mx-auto max-w-7xl gap-x-32 space-y-8 sm:flex sm:space-y-0'>
					<div className='grid h-fit'>
						<Link href='/'>Home</Link>
						<Link href='/#about'>About</Link>
						<Link href='/#skills'>Skills</Link>
						<Link href='/#portfolio'>Portfolio</Link>
					</div>
					<div className='grid h-fit'>
						<Link href='/minecraft'>Minecraft mods</Link>
						<Link href='/spotify/recommendations'>Spotify Recommendations</Link>
						<a
							href='https://Etsi0.github.io/infinity-tic-tac-toe'
							target='_blank'
							rel='noopener'
						>
							Infinity tic tac toe
						</a>
					</div>
					<div className='grid h-fit'>
						<Link href='/settings'>Settings</Link>
						<Link href='/settings/r6'>R6</Link>
						<Link href='/settings/vscode'>VS Code</Link>
					</div>
				</div>
				<div className='grid justify-items-center'>
					<p>Phadonia | 2022 - {new Date().getFullYear()}</p>
				</div>
			</footer>
		</>
	);
}
