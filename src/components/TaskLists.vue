<script setup lang="ts">
import CreateTask from './CreateTask.vue'
import TaskTable from './TaskTable.vue'
import AddIcon from './icons/IconAdd.vue'
import CloseIcon from './icons/IconClose.vue'
import { filterPriorityVariant, filterStatusVariant } from '@/constants'
import { useTaskStore } from '@/stores/useTaskStore'
const store = useTaskStore()
const { filterQuery } = store
const dialog = ref(false)
const snackbar = ref(false)
</script>
<template>
  <div class="flex flex-col md:flex-row justify-between gap-2 md:gap-[2rem] items-stretch">
    <div class="flex justify-between w-full gap-2">
      <v-text-field
        v-model="filterQuery.search"
        density="compact"
        label="Search Tasks"
        variant="solo"
        color="primary"
        single-line
      ></v-text-field>
      <v-select
        :items="filterPriorityVariant"
        v-model="filterQuery.priority"
        item-title="label"
        item-value="key"
        label="Priority"
        density="compact"
        color="primary"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :disabled="item.raw.disabled"></v-list-item>
        </template>
      </v-select>
      <v-select
        :items="filterStatusVariant"
        v-model="filterQuery.status"
        item-title="label"
        item-value="key"
        color="primary"
        label="Status"
        density="compact"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :disabled="item.raw.disabled"></v-list-item>
        </template>
      </v-select>
    </div>
    <div>
      <v-btn block height="40" color="primary" @click="(dialog = true)">
        <template v-slot:prepend>
          <AddIcon class="" />
        </template>
        Add Task
      </v-btn>
    </div>
  </div>
  <TaskTable />
  <v-dialog v-model="dialog" width="500">
    <v-card class="px-[5%] py-[7%] relative" rounded="lg">
      <v-btn
        variant="plain"
        position="absolute"
        class="top-[1%] right-[0px]"
        @click="(dialog = false)"
        color="error"
        density="compact"
        :ripple="false"
      >
        <template v-slot:default> <CloseIcon class="" /> </template
      ></v-btn>
      <CreateTask @success="(snackbar = true)" @close="(dialog = false)" />
    </v-card>
  </v-dialog>
  <v-snackbar close-delay="8000" close-on-content-click v-model="snackbar">
    Task Created Successfully
  </v-snackbar>
</template>
