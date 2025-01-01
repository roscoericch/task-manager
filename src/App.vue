<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LogoIcon from '@/components/icons/IconLogo.vue'
import { useFetch } from './stores/useQueryStore'
const apiStore = useFetch('https://run.mocky.io/v3/df9d0d32-8e68-40cd-8d62-8ebb4b1b71e7')
const { fetchData } = apiStore
onMounted(() => {
  fetchData()
})
</script>

<template>
  <header class="w-full px-[5%] flex justify-between items-center sticky top-0 bg-white z-50">
    <RouterLink class="hover:text-[#0c4fd4] flex items-center gap-1" to="/">
      <LogoIcon />
      <h2 data-test="app-title" class="font-[800] text-[18px]">Task Mananger</h2>
    </RouterLink>
  </header>
  <RouterView />
</template>
