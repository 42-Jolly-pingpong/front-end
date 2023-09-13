import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
      ts: "/src/ts",
      // '@': path.resolve(__dirname, './src'),
    }
  }
})