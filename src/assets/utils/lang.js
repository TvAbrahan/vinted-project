import { ref } from 'vue'

export const currentLang = ref(localStorage.getItem('lang') || 'es')

export const translations = {
  es: { 
    search: "Buscar artículos...",
    welcome: "Hola" 
  },
  en: { 
    search: "Search items...",
    welcome: "Hello"
  }
}

export const switchLang = (lang) => {
  currentLang.value = lang
  localStorage.setItem('lang', lang)
}

// Llama a switchLang al cargar para inicializar la reactividad
switchLang(currentLang.value)