import type { NextConfig } from 'next';
import nextMdx from '@next/mdx'

const withMdx = nextMdx({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: ['remark-gfm'],
	},
});

const nextConfig: NextConfig = withMdx({
	images: {
		remotePatterns: [
			{
				// Modrinth (Minecraft)
				protocol: 'https',
				hostname: 'cdn.modrinth.com',
			}
		],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	turbopack: {
		rules: {
			'*.svg': {
				loaders: [
					{
						loader: '@svgr/webpack',
					},
				],
				as: '*.js',
			},
		},
	},
});

export default nextConfig;
