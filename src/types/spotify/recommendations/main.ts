export type TNameLink = {
	name: string;
	link: string;
};

export type TSongs = {
	image: {
		height: number;
		url: string;
		width: number;
	};
	previewUrl: string | null;
	track: TNameLink;
	artists: TNameLink[];
	album: TNameLink;
}[];
