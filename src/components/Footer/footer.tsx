import Link from 'next/link';

export default function Footer() {
	return (
		<>
			<hr />
			<footer className='space-y-8 bg-primary-500 p-16 text-input'>
				<div className='space-y-4'>
					<div className='flex justify-center gap-4 divide-x divide-input/25 [&>:not(:first-child)]:pl-4'>
						<Link href='/'>Home</Link>
						<Link href='/#about'>About</Link>
						<Link href='/#skills'>Skills</Link>
						<Link href='/#portfolio'>Portfolio</Link>
					</div>
					<div className='flex justify-center gap-4 divide-x divide-input/25 [&>:not(:first-child)]:pl-4'>
						<Link href='/minecraft'>Minecraft mods</Link>
						<Link href='/spotify/recommendations'>Spotify Recommendations</Link>
						<a href='https://cv-maker.phadonia.com' target='_blank' rel='noopener'>
							CV Maker
						</a>
						<a href='https://etsi0.github.io/Infinity-tic-tac-toe' target='_blank' rel='noopener'>
							Infinity tic tac toe
						</a>
						<a href='https://etsi0.github.io/DiceGame' target='_blank' rel='noopener'>
							Dice Game
						</a>
					</div>
				</div>
				<div className='grid justify-items-center'>
					<p>Phadonia | 2022 - {new Date().getFullYear()}</p>
				</div>
			</footer>
		</>
	);
}
