<script setup lang="ts">
import IconUp from './icons/IconUp.vue'
import IconDown from './icons/IconDown.vue'
import { ref } from 'vue'
import { PriorityEnum, StatusEnum, OrderEnum } from '@/types/type'
import TaskTable from './TaskTable.vue'
import { useTaskStore } from '@/stores/useTaskStore'
const store = useTaskStore()
const { filterQuery } = store
const tab = ref('')
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
    <v-btn-toggle class="border-b border-[#b6b4b4] shadow-sm mt-2" v-model="filterQuery.order">
      <v-btn color="primary" class="w-[50%]" :value="OrderEnum.ascending">
        <IconUp />
      </v-btn>

      <v-btn color="primary" class="w-[50%]" :value="OrderEnum.descending">
        <IconDown />
      </v-btn>
    </v-btn-toggle>
  </div>
  <v-card class="border-b border-[#b6b4b4]">
    <v-tabs v-model="tab" slider-color="#0a79b5" color="#0a79b5">
      <v-tab :value="''">All</v-tab>
      <v-tab :value="'assigned'">Assigned to you</v-tab>
      <v-tab :value="'created'">Created by you</v-tab>
    </v-tabs>
  </v-card>
  <TaskTable :tag="tab" />
</template>
