import { Metadata } from 'next';
import Client from '@/components/pomodoro/client2';

export const metadata: Metadata = {
	title: 'Pomodoro | Phadonia',
	description: 'This Pomodoro Timer is designed to help you stay productive and focused while maintaining a clutter-free, professional workspace.',
	keywords: ['Pomodoro Timer', 'productivity', 'focus', 'time management'],
};

export default function Page() {
	return (
		<>
			<Client />
		</>
	);
}
