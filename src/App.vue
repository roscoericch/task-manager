<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AddIcon from './components/icons/IconAdd.vue'
import LogoIcon from '@/components/icons/IconLogo.vue'
</script>

<template>
  <header class="w-full px-[5%] flex justify-between items-center sticky top-0 bg-white z-50">
    <RouterLink class="hover:text-[#0c4fd4] flex items-center gap-1" to="/">
      <LogoIcon />
      <h2 class="font-[800] text-[18px]">Task Mananger</h2>
    </RouterLink>
    <nav class="flex items-center gap-4">
      <RouterLink class="hover:text-[#0c4fd4]" to="/create">
        <span class="flex items-center gap-2">
          <p class="hidden md:inline">Create Task</p>
          <AddIcon class="border border-b-slate-400 shadow-sm rounded-[6px]" />
        </span>
      </RouterLink>
      <v-avatar color="info">
        <v-img
          alt="Avatar"
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        ></v-img>
      </v-avatar>
    </nav>
  </header>

  <RouterView />
</template>
