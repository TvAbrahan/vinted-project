import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // **ESTO ES LO QUE ARREGLA EL PUNTO DE ENTRADA EN GITHUB PAGES**
base: 'https://TvAbrahan.github.io/vinted-project/', 
  
  plugins: [vue()],
})