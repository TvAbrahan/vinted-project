<script setup>
import { useRoute } from 'vue-router'
import HeaderNavbar from './components/HeaderNavbar.vue'
import ImageFont from './components/ImageFont.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">

    <HeaderNavbar />

    <div v-if="route.name === 'home'">
      <ImageFont />
    </div>

    <main class="flex-1 p-4"> 
      <RouterView />
    </main>
    
    <Footer />
    
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
