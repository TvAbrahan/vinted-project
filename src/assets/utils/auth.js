import { ref } from 'vue'

// Estado reactivo del usuario
export const activeUser = ref(null)

// Función para cargar la sesión al iniciar la app
export const loadSession = () => {
  const session = localStorage.getItem('active_session')
  if (session) {
    activeUser.value = JSON.parse(session)
  }
}

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('active_session')
  activeUser.value = null
  window.location.reload() // Refresca para limpiar estados
}