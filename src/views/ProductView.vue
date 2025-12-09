<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { activeUser } from '../assets/utils/auth' // Asegúrate que esta ruta sea correcta
// Importa tus productos para obtener la información del artículo
import { products as staticProducts } from '../data/products' 

const route = useRoute()
const router = useRouter()
const product = ref(null)
const mainImage = ref('')

// Lógica para combinar productos estáticos y de usuario (copia la lógica de HomeView)
onMounted(() => {
  const allProducts = [...staticProducts];
  
  const userProducts = JSON.parse(localStorage.getItem('user_products') || '[]')
  allProducts.push(...userProducts);

  // Buscar el producto por ID
  const foundProduct = allProducts.find(p => p.id == route.params.id)
  
  if (foundProduct) {
    product.value = foundProduct
    mainImage.value = foundProduct.imagenes[0]
  }
})


const handleBuy = () => {
  if (!activeUser.value) {
    // Si NO está logueado, alertar y redirigir al login
    alert("Debes iniciar sesión para comprar este artículo.");
    router.push('/login');
  } else {
    // Si SÍ está logueado, redirigir a la vista de checkout con el ID del producto
    router.push(`/checkout/${product.value.id}`);
  }
}

// Lógica de `handleBuy` para el botón de compra
</script>

<template>
  <div v-if="product" class="max-w-6xl mx-auto p-4 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-10">

    <div class="md:col-span-7">
      <div class="main-image-container rounded shadow-sm overflow-hidden bg-gray-100 border">
        <img 
          :src="mainImage" 
          class="w-full h-auto object-contain max-h-[600px] mx-auto"
        />
      </div>

      <div class="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        <img 
          v-for="img in product.imagenes"
          :key="img"
          :src="img"
          @click="mainImage = img"
          :class="['w-20 h-24 object-cover rounded cursor-pointer border-2 transition', mainImage === img ? 'border-teal-600' : 'border-transparent']"
        />
      </div>
    </div>

    <div class="md:col-span-5 flex flex-col gap-6">
      
      <div class="bg-white p-6 border rounded-sm shadow-sm">
        <h1 class="text-3xl font-bold text-gray-900">{{ product.price }} €</h1>
        <p class="text-sm text-gray-400 mt-1">IVA incluido (donde corresponda)</p>
        
        <hr class="my-4" />

        <div class="flex flex-col gap-3">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500 uppercase tracking-tight">Título</span>
            <span class="text-gray-900 font-medium">{{ product.title }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500 uppercase">Categoría</span>
            <span class="text-teal-700 font-medium uppercase text-xs">{{ product.category }}</span>
          </div>
          
          <div class="flex justify-between text-sm">
            <span class="text-gray-500 uppercase">Vendedor</span>
            <span class="text-gray-900 font-bold">{{ product.uploader || 'Vinted Store' }}</span>
          </div>
        </div>

        <hr class="my-4" />

        <p class="text-gray-600 text-sm leading-relaxed italic">
          "{{ product.description || 'El vendedor no ha añadido una descripción todavía.' }}"
        </p>
      </div>

      <div class="bg-white p-6 border rounded-sm shadow-sm flex flex-col gap-3">
        <button 
          class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded transition-all" 
          @click="handleBuy"
        >
          Comprar ahora
        </button>
        <button class="w-full border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-bold py-3 rounded transition-all">
          Hacer una oferta
        </button>
      </div>

      <div class="bg-[#f2f2f2] p-4 rounded-sm border border-dashed border-gray-300">
        <p class="text-[11px] text-gray-500">
          <b>Protección al comprador:</b> Si el artículo no llega o no es como se describe, te devolvemos el dinero. 
          <span class="text-teal-600 cursor-pointer underline">Saber más</span>.
        </p>
      </div>

    </div>
  </div>

  <div v-else class="p-20 text-center">
    <p class="text-xl text-gray-500 font-medium">Ups, este artículo ya no está disponible.</p>
    <router-link to="/" class="text-teal-600 font-bold underline mt-4 inline-block">Explorar otros artículos</router-link>
  </div>
</template>

<style scoped>
/* Eliminar scrollbar visual en miniaturas si lo deseas */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>