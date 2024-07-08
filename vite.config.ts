import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost.pem')),
    },
    proxy: {
      '/proxy': {
        target: 'http://localhost:3000/proxy',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    },
  },

})
