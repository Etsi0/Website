'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { TSongs } from '@/types/spotify/recommendations/main';

type TSongState = {
	songJson: TSongs | null;
	setSongJson: Dispatch<SetStateAction<TSongs | null>>;
};

export const SongJsonContext = createContext<TSongState | null>(null);

export default function SongContext({ children }: { children: ReactNode }) {
	const [songJson, setSongJson] = useState<TSongs | null>(null);

	return (
		<SongJsonContext.Provider
			value={{
				songJson,
				setSongJson,
			}}
		>
			{children}
		</SongJsonContext.Provider>
	);
}

export function useSongJsonContext() {
	const context = useContext(SongJsonContext);
	if (!context) {
		throw new Error('useSongJsonContext must be used within a SongJsonContext');
	}
	return context;
}
