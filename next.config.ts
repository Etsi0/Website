import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
/**
 * @type {import('next').NextConfig}
 * */
type TODO = any;
const nextConfig = {
	images: {
		remotePatterns: [
			{
				// Modrinth (Minecraft)
				protocol: 'https' as const,
				hostname: 'cdn.modrinth.com',
			},
			{
				// Spotify
				protocol: 'https' as const,
				hostname: 'i.scdn.co',
			},
		],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

	webpack: (config: TODO, { dev }: { dev: TODO }) => {
		if (dev) {
			// Disable cache in development
			config.cache = false;
		}

		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule: TODO) => rule.test?.test?.('.svg'));

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			}
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [remarkGfm],
	},
});

export default withMDX(nextConfig);
