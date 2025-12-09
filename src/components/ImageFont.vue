<script setup>
import banner from '../assets/img/banner-wide-1ca50d3217a3d2402dda712a8e79af381c4bd7cd5cceb0a0b7be17ac2c7522d8.jpg';
</script>

<template>
  <div class="relative w-full h-[650px] overflow-hidden">

    <div
      class="absolute inset-0 bg-cover bg-no-repeat bg-center"
      :style="{ backgroundImage: `url(${banner})` }"
    ></div>

    <div class="absolute inset-0 bg-black/10"></div>

    <div class="relative h-full flex items-center px-10 md:px-20 lg:px-40">
      <div class="bg-white p-6 rounded-lg shadow-md max-w-sm">

        <h2 class="text-xl font-semibold">¿Quieres hacer limpieza de armario?</h2>

        <button class="w-full mt-4 bg-[#007782] hover:bg-[#00606b] text-white font-semibold py-2 rounded-md">
          Vender ya
        </button>

        <button class="w-full mt-3 text-[#007782] font-medium text-sm">
          ¿Cómo funciona?
        </button>

      </div>
    </div>
</div>


</template>
