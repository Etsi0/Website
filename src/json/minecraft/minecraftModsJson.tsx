type TCurseForge = {
	categories: string[];
	client_side: 'required' | 'optional' | 'unsupported';
	game_versions: string[];
	icon_url: string;
	id: string;
	loaders: string[];
	server_side: 'required' | 'optional' | 'unsupported';
	slug: string;
	title: string;
};

export const MinecraftModsJson: TCurseForge[] = [
	{
		categories: [],
		client_side: 'required' as const,
		game_versions: [],
		icon_url: '',
		id: '',
		loaders: [],
		server_side: 'optional' as const,
		slug: 'inventory-hud-forge',
		title: 'Inventory HUD+',
	},
	{
		categories: [],
		client_side: 'required' as const,
		game_versions: [],
		icon_url: '',
		id: '',
		loaders: [],
		server_side: 'optional' as const,
		slug: 'item-scroller',
		title: 'Item Scroller',
	},
	{
		categories: [],
		client_side: 'required' as const,
		game_versions: [],
		icon_url: '',
		id: '',
		loaders: [],
		server_side: 'optional' as const,
		slug: 'litematica',
		title: 'Litematica',
	},
	{
		categories: [],
		client_side: 'required' as const,
		game_versions: [],
		icon_url: '',
		id: '',
		loaders: [],
		server_side: 'optional' as const,
		slug: 'minihud',
		title: 'MiniHUD',
	},
];
