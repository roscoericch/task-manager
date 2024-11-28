<script setup lang="ts">
import { PriorityEnum, StatusEnum } from '@/types/type'
import TaskTable from './TaskTable.vue'
import { useTaskStore } from '@/stores/useTaskStore'
const store = useTaskStore()
const { filterQuery } = store
</script>
<template>
  <div class="flex flex-col md:flex-row justify-between items-stretch gap-2 md:gap-2">
    <v-text-field
      v-model="filterQuery.search"
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search Tasks"
      variant="solo"
      hide-details
      single-line
      color="primary"
    ></v-text-field>
    <v-select
      label="Priority"
      clearable
      v-model="filterQuery.priority"
      :items="[PriorityEnum.High, PriorityEnum.Low, PriorityEnum.Medium, null]"
      variant="solo"
      color="primary"
    ></v-select>
    <v-select
      label="Status"
      clearable
      v-model="filterQuery.status"
      :items="[StatusEnum.Completed, StatusEnum.Pending, StatusEnum.InProgress, null]"
      variant="solo"
      color="primary"
    ></v-select>
  </div>
  <TaskTable />
</template>
