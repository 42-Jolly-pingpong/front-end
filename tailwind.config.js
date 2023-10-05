/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FDCE02',
					50: '#FFFFFF',
					100: '#FFFDF5',
					200: '#FFF5CC',
					300: '#FEEDA4',
					400: '#FEE67B',
					500: '#FEDE53',
					600: '#FDD62A',
					700: '#FDCE02',
					800: '#C5A102',
					900: '#8E7301',
					950: '#725D01',
				},
			},
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
				welcome: 'welcome 20s ease-in-out infinite',
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
