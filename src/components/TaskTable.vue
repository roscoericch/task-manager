<script setup lang="ts">
import SearchIcon from './icons/IconSearch.vue'
import { computed, onMounted, defineProps, ref } from 'vue'
import { useFetch } from '@/stores/useQueryStore'
import { useRouter } from 'vue-router'
import { type IRequestQuery } from '@/types/type'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { filterAndSortTasks } from '@/utility/utils'
import { watch } from 'vue'
const router = useRouter()
const { tag } = defineProps<{ tag: string }>()
const page = ref(1)
const query = computed<IRequestQuery>(() => ({ page: page.value, tag }))
const apiStore = useFetch('https://run.mocky.io/v3/dbd7063e-9fd2-440e-ba74-1b0387a2d5b0', query)
const { fetchData } = apiStore
const store = useTaskStore()
const { data, isLoading, error } = storeToRefs(store)
const snackbar = ref(false)
watch(error, (newValue) => {
  snackbar.value = Boolean(newValue)
})
const { filterQuery } = store
const filteredData = computed(() => {
  if (!filterQuery) return data.value
  return filterAndSortTasks(data.value, filterQuery)
})

onMounted(() => {
  fetchData()
})
</script>
<template>
  <v-progress-circular
    class="mx-auto my-[20%]"
    v-if="isLoading"
    indeterminate
    model-value="20"
    data-test="loader"
  ></v-progress-circular>
  <v-table
    v-if="!isLoading"
    class="shadow-sm border border-[#efefee] rounded-[6px] relative"
    height="450px"
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-left">Title</th>
        <th class="text-left">Description</th>
        <th class="text-left">Status</th>
        <th class="text-left">Priority</th>
        <th class="text-left">Due Date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="task in filteredData"
        :key="task.id"
        @click="router.push(`/view/${task.id}`)"
        class="cursor-pointer hover:bg-gray-50"
      >
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>
          <v-chip>{{ task.status }}</v-chip>
        </td>
        <td>
          <v-chip>{{ task.priority }}</v-chip>
        </td>
        <td>{{ task.due_date }}</td>
      </tr>
    </tbody>
    <SearchIcon
      v-if="!isLoading && filteredData?.length === 0"
      class="absolute top-[40%] right-[45%]"
    />
  </v-table>
  <v-pagination
    color="primary"
    v-model="page"
    :length="15"
    :total-visible="5"
    class="md:my-4 w-[80%] mx-auto"
    next-icon="mdi-menu-right"
    prev-icon="mdi-menu-left"
    v-if="filteredData && filteredData.length > 5"
  ></v-pagination>
  <v-snackbar close-delay="4000" close-on-content-click v-model="snackbar">
    {{ error }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="(snackbar = false)"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
