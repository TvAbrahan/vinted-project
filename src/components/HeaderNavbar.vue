<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { activeUser, logout, loadSession } from '../assets/utils/auth'
// Importamos la lógica de idioma
import { currentLang, translations, switchLang } from '../assets/utils/lang' 

const router = useRouter()
const searchQuery = ref('')

// Al montar el componente, cargamos la sesión activa y el idioma guardado
onMounted(() => {
  loadSession()
})

const handleLogout = () => {
  logout()
  router.push('/')
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/', query: { search: searchQuery.value } })
  }
}
</script>

<template>
  <header class="bg-white shadow w-full sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between gap-4 py-4">
      
      <router-link to="/">
        <img src="../assets/img/logo.f29f72cb.svg" alt="logo" class="h-8 min-w-[100px]" />
      </router-link>

      <div class="relative w-full md:flex-1 md:max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" 
             fill="none" viewBox="0 0 24 24" 
             stroke-width="1.5" stroke="currentColor" 
             class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          :placeholder="translations[currentLang].search"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007782] focus:outline-none transition-all"
        />
      </div>

      <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
        
        
        <div v-if="!activeUser" class="flex items-center gap-2 border border-[#007782] p-1.5 px-3 rounded-lg text-sm">
          <router-link to="/login" class="text-[#007782] hover:text-[#00606b] font-medium transition">Login</router-link>
          <span class="text-gray-300">|</span>
          <router-link to="/register" class="text-[#007782] hover:text-[#00606b] font-medium transition">Register</router-link>
        </div>

        <div v-else class="flex items-center gap-3">
          <span class="hidden lg:block text-sm text-gray-600">Hola, <b>{{ activeUser.name }}</b></span>
          <button @click="handleLogout" class="text-red-500 text-xs hover:underline">Salir</button>
        </div>

        <router-link 
          to="/subir" 
          class="bg-[#007782] text-white px-5 py-2 rounded-lg hover:bg-[#00606b] whitespace-nowrap text-sm font-semibold transition-colors inline-block text-center"
        >
          Vender ahora
        </router-link>

          <select @change="e => switchLang(e.target.value)" class="text-xs  focus:ring-[#007782] focus:outline-none">
          <option value="es" :selected="currentLang === 'es'">ES</option>
          <option value="en" :selected="currentLang === 'en'">EN</option>
        </select>
      </div>
    </div>

    <div class="hidden md:block border-t border-gray-100">
      <nav class="max-w-7xl mx-auto px-4">
        <ul class="flex justify-center lg:justify-start gap-6 py-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Mujer</li>
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Hombre</li>
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Niños</li>
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Hogar</li>
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Electrónica</li>
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Deportes</li>
          <li class="hover:text-[#007782] cursor-pointer border-b-2 border-transparent hover:border-[#007782] transition-all">Otras</li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* Ocultar scrollbar pero mantener funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>