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
