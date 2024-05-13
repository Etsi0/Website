/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				// Modrinth (Minecraft)
				protocol: 'https',
				hostname: 'cdn.modrinth.com',
			},
			{
				// Spotify
				protocol: 'https',
				hostname: 'i.scdn.co',
			},
		],
	},
};

module.exports = nextConfig;
