import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
	// Configure `pageExtensions` to include markdown and MDX files
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	// Optionally, add any other Next.js config below
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

const withMDX = createMDX({
	// Add markdown plugins here, as desired
	options: {
		remarkPlugins: [remarkGfm],
	},
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);