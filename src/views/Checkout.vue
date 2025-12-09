<template>
  <div class="max-w-xl mx-auto my-10 p-8 bg-white shadow rounded-lg border">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Finalizar Pedido</h2>
    
    <div v-if="product" class="flex gap-4 p-4 bg-gray-50 rounded mb-6">
      <img :src="product.imagenes[0]" class="w-20 h-20 object-cover rounded" />
      <div>
        <p class="font-bold">{{ product.title }}</p>
        <p class="text-[#007782] font-bold">{{ product.price }} €</p>
      </div>
    </div>

    <form @submit.prevent="processFakePayment" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Número de tarjeta</label>
        <input type="text" placeholder="#### #### #### ####" class="w-full border p-2 rounded" required />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <input type="text" placeholder="MM/AA" class="border p-2 rounded" required />
        <input type="text" placeholder="CVV" class="border p-2 rounded" required />
      </div>
      
      <button type="submit" class="w-full bg-[#007782] text-white py-3 rounded-lg font-bold hover:bg-[#00606b]">
        Pagar {{ product?.price }} € (Simulación)
      </button>
    </form>

    <div v-if="showSuccess" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-lg text-center shadow-xl">
        <div class="text-5xl mb-4">✅</div>
        <h3 class="text-xl font-bold">¡Pago realizado con éxito!</h3>
        <p class="text-gray-600 my-2">Este es un recibo de mentira.</p>
        <button @click="$router.push('/')" class="mt-4 text-[#007782] font-bold">Volver al inicio</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '../data/products'

const route = useRoute()
const showSuccess = ref(false)
const product = products.find(p => p.id === Number(route.params.id))

const processFakePayment = () => {
  // Simular carga de 1 segundo
  setTimeout(() => {
    showSuccess.value = true
  }, 1000)
}
</script>