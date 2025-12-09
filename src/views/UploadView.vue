<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { activeUser } from '../assets/utils/auth'

const router = useRouter()
const title = ref('')
const price = ref('')
const description = ref('')
const images = ref([]) // Guardará las imágenes en Base64

// Función para procesar las imágenes
const handleImageUpload = (e) => {
  const files = e.target.files
  if (images.value.length + files.length > 4) {
    alert("Máximo 4 imágenes")
    return
  }

  for (let file of files) {
    const reader = new FileReader()
    reader.onload = (event) => {
      images.value.push(event.target.result) // Convierte imagen a texto
    }
    reader.readAsDataURL(file)
  }
}

const submitProduct = () => {
  if (!activeUser.value) return

  // 1. Obtener productos subidos anteriormente por usuarios
  const localProducts = JSON.parse(localStorage.getItem('user_products') || '[]')

  // 2. Crear el nuevo producto (Igual que tu estructura JS)
  const newProduct = {
    id: Date.now(), // ID único basado en tiempo
    title: title.value,
    price: parseFloat(price.value),
    description: description.value,
    imagenes: images.value,
    uploader: activeUser.value.name, // Quién lo subió
    category: "usuario"
  }

  // 3. Guardar
  localProducts.push(newProduct)
  localStorage.setItem('user_products', JSON.stringify(localProducts))
  
  alert("¡Producto subido localmente!")
  router.push('/')
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-8 bg-white shadow mt-10 rounded">
    <h1 class="text-2xl font-bold mb-6 text-[#007782]">Subir Producto</h1>
    
    <form @submit.prevent="submitProduct" class="flex flex-col gap-4">
      <input v-model="title" type="text" placeholder="Título del artículo" class="border p-2 rounded" required />
      <input v-model="price" type="number" step="0.01" placeholder="Precio €" class="border p-2 rounded" required />
      <textarea v-model="description" placeholder="Descripción" class="border p-2 rounded h-32"></textarea>
      
      <div class="border-2 border-dashed p-4 text-center">
        <p class="text-gray-500 mb-2">Sube hasta 4 fotos ({{ images.length }}/4)</p>
        <input type="file" multiple @change="handleImageUpload" accept="image/*" :disabled="images.length >= 4" />
      </div>

      <div class="flex gap-2">
        <img v-for="(img, index) in images" :key="index" :src="img" class="w-20 h-20 object-cover rounded border" />
      </div>

      <button type="submit" class="bg-[#007782] text-white py-3 rounded font-bold hover:bg-[#00606b]">
        Publicar ahora
      </button>
    </form>
  </div>
</template>