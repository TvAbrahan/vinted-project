import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // **ESTO ES LO QUE ARREGLA EL PUNTO DE ENTRADA EN GITHUB PAGES**
// base: '/vinted-project/', 
  
  plugins: [vue()],
})