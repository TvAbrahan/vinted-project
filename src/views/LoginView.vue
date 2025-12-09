<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit" class="btn-submit">Entrar</button>
      </form>
      <router-link to="/register" class="link">¿No tienes cuenta? Crea una gratis</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { activeUser } from '../assets/utils/auth' 

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem('vinted_users') || '[]')
  const userFound = users.find(u => u.email === email.value && u.password === password.value)

  if (userFound) {
    localStorage.setItem('active_session', JSON.stringify(userFound))
    activeUser.value = userFound // Actualizas el estado global
    router.push('/')
  } else {
    alert("Credenciales incorrectas")
  }
}
</script>

<style scoped>
/* Copia los mismos estilos de RegisterView para que sean consistentes */
.auth-page { display: flex; justify-content: center; align-items: center; min-height: 80vh; background: #f8f8f8; }
.auth-card { background: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }
h2 { color: #111; margin-bottom: 20px; }
input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.btn-submit { width: 100%; background: #007782; color: white; border: none; padding: 14px; font-weight: bold; cursor: pointer; border-radius: 4px; }
.link { display: block; margin-top: 20px; color: #007782; text-decoration: none; font-size: 14px; }
</style>