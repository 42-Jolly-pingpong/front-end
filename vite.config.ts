import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import EnvironmentPlugin from 'vite-plugin-environment';
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), EnvironmentPlugin('all', { prefix: 'REACT_APP_' })],
	resolve: {
		alias: {
			api: '/src/api',
			src: '/src',
			images: '/images',
			components: '/src/components',
			pages: '/src/pages',
			ts: '/src/ts',
			hooks: '/src/hooks',
		},
	},
});
