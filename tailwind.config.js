/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx,json}',
		'./src/SVGs/**/*.{js,ts,jsx,tsx,mdx,json}',
	],
	theme: {
		extend: {
			colors: {
				body: 'var(--body-color)',
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
				main: {
					lighter: 'var(--main-color-lighter)',
					DEFAULT: 'var(--main-color)',
					darker: 'var(--main-color-darker)',
				},
				input: 'var(--input-color)',
				text: {
					lighter: 'var(--text-color-lighter)',
					DEFAULT: 'var(--text-color)',
					darker: 'var(--text-color-darker)',
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
};
