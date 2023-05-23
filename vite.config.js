import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy:{
      "/api": {
        target: 'https://es.besoccer.com/equipo/america-cali',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/nitter": {
        target: 'https://nitter.net/AmericadeCali/rss',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/nitter/, ""),
      },
      "/america": {
        target: 'https://www.americadecali.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/america/, ""),
      },
    },
  },
  plugins: [react()],
})
