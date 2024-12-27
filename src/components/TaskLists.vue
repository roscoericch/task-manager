<script setup lang="ts">
import CreateTask from './CreateTask.vue'
import TaskTable from './TaskTable.vue'
import AddIcon from './icons/IconAdd.vue'
import CloseIcon from './icons/IconClose.vue'
import { filterPriorityVariant, filterStatusVariant } from '@/constants'

const route = useRoute()
const router = useRouter()
const filterQuery = reactive<Partial<IFilterQuery>>({
  search: (route.query.search as string) || '',
  priority: (route.query.priority as priorityType) || '',
  order: (route.query.order as orderType) || '',
  status: (route.query.status as statusType) || '',
})
watch(filterQuery, (newValue) => {
  router.replace({
    query: {
      ...route.query,
      search: newValue.search || '',
      priority: newValue.priority || '',
      status: newValue.status || '',
      order: newValue.order || '',
    },
  })
})
const dialog = ref(false)
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
  <TaskTable :filterQuery="filterQuery" />
  <v-dialog v-model="dialog" width="500">
    <v-card class="px-[5%] pt-[2%] pb-[7%]" rounded="lg">
      <div class="flex justify-between items-center pb-4">
        <v-title class="text-[18px] font-[800]">Add Task</v-title>
        <v-btn
          variant="plain"
          class="self-end inline px-0 min-w-[24px]"
          @click="(dialog = false)"
          color="error"
          density="compact"
          :ripple="false"
        >
          <template v-slot:default> <CloseIcon class="" /> </template
        ></v-btn>
      </div>
      <CreateTask @close="(dialog = false)" />
    </v-card>
  </v-dialog>
</template>
