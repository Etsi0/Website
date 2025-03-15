import { A } from '@/components/ui/link';

export default function Footer() {
	return (
		<>
			<hr />
			<footer className='bg-primary-500 text-input space-y-8 p-16'>
				<div className='space-y-4'>
					<div className='divide-input/25 flex justify-center gap-4 divide-x [&>:not(:last-child)]:pr-4'>
						<A href='/'>Home</A>
						<A href='/#about'>About</A>
						<A href='/#skills'>Skills</A>
						<A href='/#portfolio'>Portfolio</A>
					</div>
					<div className='divide-input/25 flex justify-center gap-4 divide-x [&>:not(:last-child)]:pr-4'>
						<A href='/minecraft'>Minecraft mods</A>
						<A href='/habit-remover'>Habit Remover</A>
						<A href='/pomodoro'>Pomodoro</A>
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
