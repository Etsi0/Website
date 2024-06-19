'use client';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type TNameLink = {
	name: string;
	link: string;
};

type TSongs = {
	image: {
		height: number;
		url: string;
		width: number;
	};
	previewUrl: string;
	track: TNameLink;
	artists: TNameLink[];
	album: TNameLink;
}[];

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
