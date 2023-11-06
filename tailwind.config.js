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
					'0%, 100%': { backgroundPosition: 'left top' },
					'25%': { backgroundPosition: 'right bottom' },
					'50%': { backgroundPosition: 'left bottom' },
					'75%': { backgroundPosition: 'right top' },
				},
				'ani-ping': {
					'0%': { opacity: 0.8 },
					'35%, 100%': { opacity: 0 },
				},

				rotateC1: {
					'0%': { opacity: 1, transform: 'rotate(-44deg)' },
					'35%': { opacity: 1, transform: 'rotate(52deg)' },
					'36%, 100%': { opacity: 0 },
				},

				rotateC2: {
					'0%, 49%': { opacity: 0 },
					'50%': { opacity: 1, transform: 'rotate(44deg)' },
					'85%': { opacity: 1, transform: 'rotate(-52deg)' },
					'86%, 100%': { opacity: 0 },
				},

				rotateC3: {
					'0%, 84%': { opacity: 0 },
					'85%': { opacity: 1, transform: 'rotate(39deg)' },
					'100%': { opacity: 1, transform: 'rotate(-15deg)' },
				},
				rotateC4: {
					'0%, 34%': { opacity: 0 },
					'35%': { opacity: 1, transform: 'rotate(-39deg)' },
					'50%': { opacity: 1, transform: 'rotate(15deg)' },
					'51%, 100%': { opacity: 0 },
				},
			},
			animation: {
				welcome: 'welcome 20s ease-in-out infinite',
				'anim-ping': 'ani-ping 2s linear infinite',
				'anim-pong': 'ani-ping 2s 1s linear infinite',
				'rotate-c1': 'rotateC1 2s linear infinite',
				'rotate-c2': 'rotateC2 2s linear infinite',
				'rotate-c3': 'rotateC3 2s linear infinite',
				'rotate-c4': 'rotateC4 2s linear infinite',
			},
		},
	},
	plugins: [
		// eslint-disable-next-line no-undef
		require('@tailwindcss/typography'),
		require('flowbite/plugin'),
		'prettier-plugin-tailwindcss',
	],
};
