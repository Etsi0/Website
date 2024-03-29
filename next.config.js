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
		],
	},
};

module.exports = nextConfig;
