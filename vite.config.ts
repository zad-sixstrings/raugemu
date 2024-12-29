import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  publicDir: 'public',
  base: '/',
  optimizeDeps: {
    include: ['style.css']
  }
})
