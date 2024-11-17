import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
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
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
	},
});

export default withMDX(nextConfig);
