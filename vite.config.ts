/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import fs from 'fs'
import path from 'path'

// const DEV_MODE = import.meta.env.VITE_DEV

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'certs', 'localhost.pem')),
  //   },
  //   proxy: {
  //     '/proxy': {
  //       target: 'http://localhost:3000/proxy',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/proxy/, ''),
  //     },
  //   },
  // },
})
