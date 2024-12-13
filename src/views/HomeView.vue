<script setup lang="ts">
import TaskLists from '@/components/TaskLists.vue'
import PendingIcon from '@/components/icons/IconPause.vue'
import CompletedIcon from '@/components/icons/IconCheck.vue'
import ProgressIcon from '@/components/icons/IconClock.vue'
import OverdueIcon from '@/components/icons/IconCancel.vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { evaluateTasks } from '@/lib/utils'
const store = useTaskStore()
const { data } = storeToRefs(store)
const pending = computed(() => {
  return evaluateTasks('pending', data.value)
})
const inProgress = computed(() => {
  return evaluateTasks('in progress', data.value)
})
const completed = computed(() => {
  return evaluateTasks('completed', data.value)
})
const overdue = computed(() => {
  return evaluateTasks('overdue', data.value)
})
</script>

<template>
  <main class="bg-white px-[5%] py-[2%] flex flex-col gap-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <v-card class="px-4 py-2">
        <span class="flex items-center justify-between">
          <p class="text-[16px] font-[500]">Pending</p>
          <PendingIcon />
        </span>
        <strong class="text-[25px] font-[800]">{{ pending }}</strong>
      </v-card>
      <v-card class="px-4 py-2">
        <span class="flex items-center justify-between">
          <p class="text-[16px] font-[500]">In Progress</p>
          <ProgressIcon />
        </span>
        <strong class="text-[25px] font-[800]">{{ inProgress }}</strong>
      </v-card>
      <v-card class="px-4 py-2">
        <span class="flex items-center justify-between">
          <p class="text-[16px] font-[500]">Completed</p>
          <CompletedIcon />
        </span>
        <strong class="text-[25px] font-[800]">{{ completed }}</strong>
      </v-card>
      <v-card class="px-4 py-2">
        <span class="flex items-center justify-between">
          <p class="text-[16px] font-[500]">Overdue</p>
          <OverdueIcon />
        </span>
        <strong class="text-[25px] font-[800]">{{ overdue }}</strong>
      </v-card>
    </div>
    <TaskLists />
  </main>
</template>
