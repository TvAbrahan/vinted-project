<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Ya no necesitamos importar nada de utils aquí si solo guardamos,
// pero es buena práctica para mantener el mismo flujo.

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  // 1. Traer la lista actual de usuarios
  const users = JSON.parse(localStorage.getItem('vinted_users') || '[]')
  
  // 2. Validar si ya existe
  if (users.find(u => u.email === email.value)) {
    alert("Este correo ya está registrado.")
    return
  }

  // 3. Crear el nuevo objeto de usuario
  const newUser = { 
    name: name.value, 
    email: email.value, 
    password: password.value 
  }

  // 4. Guardar en la "BD" (LocalStorage)
  users.push(newUser)
  localStorage.setItem('vinted_users', JSON.stringify(users))
  
  alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.")
  
  // 5. Redirigir al Login
  router.push('/login')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Crea tu cuenta</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="name" type="text" placeholder="Nombre completo" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit" class="btn-submit">Registrarse</button>
      </form>
      <router-link to="/login" class="link">¿Ya tienes cuenta? Inicia sesión</router-link>
    </div>
  </div>
</template>

<style scoped>
.auth-page { display: flex; justify-content: center; align-items: center; min-height: 80vh; background: #f8f8f8; }
.auth-card { background: white; padding: 40px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; max-width: 400px; text-align: center; }
h2 { color: #111; margin-bottom: 10px; }
input { width: 100%; padding: 12px; margin: 10px 0; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.btn-submit { width: 100%; background: #007782; color: white; border: none; padding: 14px; font-weight: bold; cursor: pointer; border-radius: 4px; margin-top: 10px; }
.link { display: block; margin-top: 20px; color: #007782; text-decoration: none; font-size: 14px; }
</style>