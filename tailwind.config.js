/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				welcome: {
					'0%, 100%': {
						backgroundPosition: 'left top',
					},
					'25%': {
						backgroundPosition: 'right bottom',
					},
					'50%': {
						backgroundPosition: 'left bottom',
					},
					'75%': {
						backgroundPosition: 'right top',
					},
				},
			},
			animation: {
				welcome: 'welcome 15s ease-in-out infinite',
			},
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('@tailwindcss/typography'),
		require('daisyui'),
		require('flowbite/plugin'),
	],
};
