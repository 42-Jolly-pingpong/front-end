import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), EnvironmentPlugin('all', { prefix: 'REACT_APP_' })],
	resolve: {
		alias: {
			src: '/src',
			api: '/src/api',
			constants: '/src/constants',
			images: '/images',
			components: '/src/components',
			pages: '/src/pages',
			ts: '/src/ts',
			hooks: '/src/hooks',
			socket: '/src/socket',
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // needed for the Docker Container port mapping to work
		hmr: {
			clientPort: 5173,
		},
		strictPort: true,
		port: 5173, // you can replace this port with any port
	},
});
