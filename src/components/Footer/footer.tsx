import { A } from '@/components/ui/link';

export default function Footer() {
	return (
		<>
			<hr />
			<footer className='space-y-8 bg-primary-500 p-16 text-input'>
				<div className='space-y-4'>
					<div className='flex justify-center gap-4 divide-x divide-input/25 [&>:not(:first-child)]:pl-4'>
						<A href='/'>Home</A>
						<A href='/#about'>About</A>
						<A href='/#skills'>Skills</A>
						<A href='/#portfolio'>Portfolio</A>
					</div>
					<div className='flex justify-center gap-4 divide-x divide-input/25 [&>:not(:first-child)]:pl-4'>
						<A href='/minecraft'>Minecraft mods</A>
						<A href='/habit-remover'>Habit Remover</A>
						<A href='/spotify/recommendations'>Spotify Recommendations</A>
						<A href='https://cv-maker.phadonia.com'>CV Maker</A>
						<A href='https://etsi0.github.io/Infinity-tic-tac-toe'>Infinity tic tac toe</A>
						<A href='https://etsi0.github.io/DiceGame'>Dice Game</A>
					</div>
				</div>
				<div className='grid justify-items-center'>
					<p>Phadonia | 2022 - {new Date().getFullYear()}</p>
				</div>
			</footer>
		</>
	);
}
