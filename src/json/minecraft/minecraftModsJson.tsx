type TBase = {
	title: string;
	color: 'green' | 'yellow' | 'red';
};

type TModrinth = {
	id: string;
} & TBase;

type TCurseForge = {
	link: string;
} & TBase;

const json: (TModrinth | TCurseForge)[] = [
	{
		id: 'zV5r3pPn',
		title: '3D Skin Layers',
		color: 'green',
	},
	{
		id: 'M08ruV16',
		title: 'Bobby',
		color: 'green',
	},
	{
		id: '89Wsn8GD',
		title: 'Capes',
		color: 'green',
	},
	{
		id: '1IjD5062',
		title: 'Continuity',
		color: 'green',
	},
	{
		id: 'k2ZPuTBm',
		title: 'ESSENTIAL Mod',
		color: 'green',
	},
	{
		id: 'P7dR8mSH',
		title: 'Fabric API',
		color: 'yellow',
	},
	{
		id: 'Ha28R6CL',
		title: 'Fabric Language Kotlin',
		color: 'yellow',
	},
	{
		id: 'WNcgffMw',
		title: 'FastChest',
		color: 'green',
	},
	{
		id: 'uXXizFIs',
		title: 'FerriteCore',
		color: 'green',
	},
	{
		id: 'iZ10HXDj',
		title: 'FPS Reducer',
		color: 'green',
	},
	{
		id: 'XeEZ3fK2',
		title: 'Freecam',
		color: 'green',
	},
	{
		id: 'Orvt0mRa',
		title: 'Indium',
		color: 'yellow',
	},
	{
		title: 'Inventory HUD+',
		link: 'inventory-hud-forge',
		color: 'green',
	},
	{
		id: 'O7RBXm3n',
		title: 'Inventory Profiles Next',
		color: 'green',
	},
	{
		id: 'YL57xq9U',
		title: 'Iris Shaders',
		color: 'green',
	},
	{
		title: 'Item Scroller',
		link: 'item-scroller',
		color: 'green',
	},
	{
		id: 'hvFnDODi',
		title: 'LazyDFU',
		color: 'green',
	},
	{
		id: 'onSQdWhM',
		title: 'libIPN',
		color: 'yellow',
	},
	{
		title: 'Litematica',
		link: 'litematica',
		color: 'green',
	},
	{
		id: 'gvQqBUqZ',
		title: 'Lithium',
		color: 'green',
	},
	{
		id: 'GcWjdA9I',
		title: 'MaLiLib',
		color: 'yellow',
	},
	{
		id: 'NRjRiSSD',
		title: 'Memory Leak Fix',
		color: 'green',
	},
	{
		title: 'MiniHUD',
		link: 'minihud',
		color: 'green',
	},
	{
		id: 'mOgUt4GM',
		title: 'Mod Menu',
		color: 'green',
	},
	{
		id: 'SfMw2IZN',
		title: 'Nvidium',
		color: 'green',
	},
	{
		id: 'AANobbMI',
		title: 'Sodium',
		color: 'green',
	},
	{
		id: 'kYuIpRLv',
		title: 'Wavey Capes',
		color: 'green',
	},
	{
		id: 'N6n5dqoA',
		title: 'Axiom',
		color: 'green',
	},
	{
		id: '1bokaNcj',
		title: "Xaero's Minimap",
		color: 'green',
	},
	{
		id: 'NcUtCpym',
		title: "Xaero's World Map",
		color: 'green',
	},
	{
		id: '1eAoo2KR',
		title: 'YetAnotherConfigLib',
		color: 'yellow',
	},
	{
		id: 'w7ThoJFB',
		title: 'Zoomify',
		color: 'green',
	},
	{
		id: 'NNAgCjsB',
		title: 'Entity Culling',
		color: 'green',
	},
	{
		id: 'EsAfCjCV',
		title: 'AppleSkin',
		color: 'green',
	},
	{
		id: 'Wnxd13zP',
		title: 'Clumps',
		color: 'green',
	},
	{
		id: 'o1C1Dkj5',
		title: "YUNG's Better Dungeons",
		color: 'green',
	},
	{
		id: 'HjmxVlSr',
		title: "YUNG's Better Mineshafts",
		color: 'green',
	},
	{
		id: 'Z2mXHnxP',
		title: "YUNG's Better Nether Fortresses",
		color: 'green',
	},
	{
		id: '3dT9sgt4',
		title: "YUNG's Better Ocean Monuments",
		color: 'green',
	},
	{
		id: 'kidLKymU',
		title: "YUNG's Better Strongholds",
		color: 'green',
	},
	{
		id: '8oi3bsk5',
		title: 'Terralith',
		color: 'green',
	},
	{
		id: 't5FRdP87',
		title: "YUNG's Better Witch Huts",
		color: 'green',
	},
	{
		id: 'Fb4jn8m6',
		title: 'FallingTree',
		color: 'green',
	},
	{
		id: 'z9Ve58Ih',
		title: "YUNG's Better Jungle Temples",
		color: 'green',
	},
	{
		id: 'kfqD1JRw',
		title: 'Visual Workbench',
		color: 'green',
	},
	{
		id: 'XNlO7sBv',
		title: "YUNG's Better Desert Temples",
		color: 'green',
	},
	{
		id: 'Ht4BfYp6',
		title: "YUNG's Bridges",
		color: 'green',
	},
	{
		id: 'lWDHr9jE',
		title: 'Tectonic',
		color: 'green',
	},
	{
		id: 'ZYgyPyfq',
		title: "YUNG's Extras",
		color: 'green',
	},
	{
		id: 'OZBR5JT5',
		title: 'Easy Anvils',
		color: 'green',
	},
	{
		id: '9hx3AbJM',
		title: 'Easy Magic',
		color: 'green',
	},
	{
		id: 'EltpO5cN',
		title: 'Lootr',
		color: 'green',
	},
	{
		id: 'AVq17PqV',
		title: 'Leaves Be Gone',
		color: 'green',
	},
	{
		id: 'ZVzW5oNS',
		title: 'Incendium',
		color: 'green',
	},
	{
		id: 'IKARgflD',
		title: 'Diagonal Fences',
		color: 'green',
	},
	{
		id: 'LPjGiSO4',
		title: 'Nullscape',
		color: 'green',
	},
	{
		id: 'Cnejf5xM',
		title: 'RightClickHarvest',
		color: 'green',
	},
	{
		id: 'EFtixeiF',
		title: 'LevelZ',
		color: 'green',
	},
	{
		id: 'z6sMEexp',
		title: 'TieredZ',
		color: 'green',
	},
	{
		id: 'whv2X0ei',
		title: 'JobsAddon',
		color: 'green',
	},
	{
		id: 'wXiGiyGX',
		title: 'Amplified Nether',
		color: 'green',
	},
	{
		id: 'd6MhxwRo',
		title: "Soul Fire'd",
		color: 'green',
	},
	{
		id: 'FQgc8dib',
		title: 'Diagonal Walls',
		color: 'green',
	},
	{
		id: 'WhbRG4iK',
		title: 'Falling Leaves',
		color: 'green',
	},
	{
		id: 'jawg7zT1',
		title: 'Cave Dust',
		color: 'green',
	},
	{
		id: 'gPCdW0Wr',
		title: 'Make Bubbles Pop',
		color: 'green',
	},
	{
		id: 'rUgZvGzi',
		title: 'Eating Animation',
		color: 'green',
	},
	{
		id: 'G1s2WpNo',
		title: 'Better Third Person',
		color: 'green',
	},
	{
		id: 'H5XMjpHi',
		title: 'First-person Model',
		color: 'green',
	},
	{
		id: 'BVzZfTc1',
		title: '[ETF] Entity Texture Features',
		color: 'green',
	},
	{
		id: '4I1XuqiY',
		title: '[EMF] Entity Model Features',
		color: 'green',
	},
	{
		id: 'MPCX6s5C',
		title: 'Not Enough Animations',
		color: 'green',
	},
	{
		id: 'Ua7DFN59',
		title: "YUNG's API",
		color: 'yellow',
	},
	{
		id: 'QAGBst4M',
		title: 'Puzzles Lib',
		color: 'yellow',
	},
	{
		id: 'yUBXc3AH',
		title: 'LibZ',
		color: 'yellow',
	},
	{
		id: 'lhGA9TYQ',
		title: 'Architectury API',
		color: 'yellow',
	},
	{
		id: 'IYY9Siz8',
		title: 'JamLib',
		color: 'yellow',
	},
	{
		id: 'dQcfqGbl',
		title: 'Cobweb',
		color: 'yellow',
	},
	{
		id: '8FdYDHF5',
		title: 'AutoTag',
		color: 'yellow',
	},
	{
		id: 'ohNO6lps',
		title: 'Forge Config API Port',
		color: 'yellow',
	},
	{
		//! add support for texture packs. mb resources packs
		id: '50dA9Sha',
		title: 'Fresh Animations',
		color: 'green',
	},
];

export const MinecraftModsJson = json.sort((a, b) => a.title.localeCompare(b.title));
