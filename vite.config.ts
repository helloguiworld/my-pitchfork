import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    host: true,
    port: 80,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost.pem')),
    // },
    proxy: {
      '/proxy': {
        target: 'http://localhost:3000/proxy',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
      },
    },
  },

})
