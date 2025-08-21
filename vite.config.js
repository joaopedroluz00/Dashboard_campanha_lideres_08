// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Dashboard_campanha_lideres_08/', // <-- NOME DO REPO
  plugins: [react()],
})
