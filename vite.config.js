// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ATENÇÃO: troque pelo nome exato do SEU repositório do GitHub
export default defineConfig({
  base: '/Dashboard_campanha_lideres_08/',
  plugins: [react()],
})
