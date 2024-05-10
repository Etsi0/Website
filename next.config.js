/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.modrinth.com',
			},
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
			},
		],
	},
};

module.exports = nextConfig;
