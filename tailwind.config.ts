import type { Config } from 'tailwindcss';

const config = {
	darkMode: [
		'variant',
		['@media (prefers-color-scheme: dark) { &:not(.light *) }', '&:is(.dark *)'],
	],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/SVGs/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/json/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/lib/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/mdx-components.tsx',
	],
	theme: {
		extend: {
			colors: {
				border: 'hsl(var(--border-color) / <alpha-value>)',
				body: {
					50: 'hsl(var(--body-color-50) / <alpha-value>)',
					100: 'hsl(var(--body-color-100) / <alpha-value>)',
					200: 'hsl(var(--body-color-200) / <alpha-value>)',
					300: 'hsl(var(--body-color-300) / <alpha-value>)',
					400: 'hsl(var(--body-color-400) / <alpha-value>)',
					500: 'hsl(var(--body-color-500) / <alpha-value>)',
				},
				primary: {
					50: 'hsl(var(--primary-color-50) / <alpha-value>)',
					100: 'hsl(var(--primary-color-100) / <alpha-value>)',
					200: 'hsl(var(--primary-color-200) / <alpha-value>)',
					300: 'hsl(var(--primary-color-300) / <alpha-value>)',
					400: 'hsl(var(--primary-color-400) / <alpha-value>)',
					500: 'hsl(var(--primary-color-500) / <alpha-value>)',
					600: 'hsl(var(--primary-color-600) / <alpha-value>)',
					700: 'hsl(var(--primary-color-700) / <alpha-value>)',
					800: 'hsl(var(--primary-color-800) / <alpha-value>)',
					900: 'hsl(var(--primary-color-900) / <alpha-value>)',
					950: 'hsl(var(--primary-color-950) / <alpha-value>)',
				},
				input: 'var(--input-color)',
				text: {
					300: 'hsl(var(--text-color-300) / <alpha-value>)',
					400: 'hsl(var(--text-color-400) / <alpha-value>)',
					500: 'hsl(var(--text-color-500) / <alpha-value>)',
					600: 'hsl(var(--text-color-600) / <alpha-value>)',
					700: 'hsl(var(--text-color-700) / <alpha-value>)',
				},
				warning: {
					lighter: 'var(--warning-color-lighter)',
					DEFAULT: 'var(--warning-color)',
					darker: 'var(--warning-color-darker)',
				},
			},
		},
	},
	plugins: [],
} satisfies Config;

export default config;
