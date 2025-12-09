<template>
  <div class="container-vinted">
    <div class="grid">
      <div 
        v-for="p in filteredProducts" 
        :key="p.id"
        class="card"
        @click="$router.push(`/producto/${p.id}`)"
      >
        <div class="image-wrapper">
          <img :src="p.imagenes[0]" class="img-vinted" />
        </div>

        <div class="info">
          <span class="price-vinted">{{ p.price }} €</span>
          <h4 class="title-vinted">{{ p.title }}</h4>
          <span class="meta-vinted">Visto en la app</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { products as staticProducts } from '../data/products.js'
import { categories } from '../data/categories.js'

// Estados
const selectedCategory = ref(null)
const search = ref("")
const userProducts = ref([])

// Cargamos los productos del usuario al montar el componente
onMounted(() => {
  const saved = localStorage.getItem('user_products')
  if (saved) {
    userProducts.value = JSON.parse(saved)
  }
})

// Filtrado combinado
const filteredProducts = computed(() => {
  // 1. Combinar productos estáticos con los subidos por usuarios
  const allProducts = [...staticProducts, ...userProducts.value]

  // 2. Filtrar la lista total por categoría y búsqueda
  const base = allProducts.filter(item => {
    const matchCategory = selectedCategory.value 
      ? item.category === selectedCategory.value 
      : true
      
    const matchSearch = item.title
      .toLowerCase()
      .includes(search.value.toLowerCase())
      
    return matchCategory && matchSearch
  })

  // 3. Eliminar duplicados (por título)
  const unique = []
  const titles = new Set()

  for (const product of base) {
    if (!titles.has(product.title)) {
      unique.push(product)
      titles.add(product.title)
    }
  }

  return unique
})
</script>

<style scoped>
/* Contenedor para centrar la tienda pero mantener alineación izquierda */
.container-vinted {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.grid {
  display: grid;
  /* 'auto-fill' permite que las tarjetas mantengan su tamaño y dejen espacio al final */
  /* Ajustamos a 150px para un look más estilizado y vertical */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
  gap: 25px; 
  width: 100%;
}

.card {
  cursor: pointer;
  background: white;
  display: flex;
  flex-direction: column;
  width: 100%; 
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.02); /* Pequeño efecto de zoom al pasar el mouse */
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3; /* El estándar vertical de Vinted */
  overflow: hidden;
  border-radius: 8px; /* Bordes un poco más suaves para tarjetas grandes */
  background: #f2f2f2;
}

.img-vinted {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.price-vinted {
  font-weight: bold;
  font-size: 18px; /* Precio más grande */
  color: #111;
}

.title-vinted {
  font-size: 13px;
  color: #717171;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Corta el texto con '...' si es largo */
}

.meta-vinted {
  font-size: 15px; /* Texto más legible */
  color: #999;
}

/* Optimización para móviles */
@media (max-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>