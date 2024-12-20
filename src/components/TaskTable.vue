<script setup lang="ts">
import SearchIcon from './icons/IconSearch.vue'
import IconUp from './icons/IconUp.vue'
import IconDown from './icons/IconDown.vue'
import DotIcons from './icons/IconEllipsis.vue'
import { useFetch } from '@/stores/useQueryStore'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { Order } from '@/constants'
import { encryptId, filterAndSortTasks, styleStatus } from '@/lib/utils'
const router = useRouter()
const route = useRoute()
const page = ref(1)
const query = computed<IRequestQuery>(() => ({ page: page.value }))
// const apiStore = useFetch('https://run.mocky.io/v3/dbd7063e-9fd2-440e-ba74-1b0387a2d5b0', query)
const apiStore = useFetch('https://run.mocky.io/v3/df9d0d32-8e68-40cd-8d62-8ebb4b1b71e7', query)
const { fetchData } = apiStore
const store = useTaskStore()
const { data, isLoading, error } = storeToRefs(store)
const snackbar = ref(false)
watch(error, (newValue) => {
  snackbar.value = Boolean(newValue)
})

const filterQuery = reactive<Partial<IFilterQuery>>({
  search: (route.query.search as string) || '',
  priority: (route.query.priority as priorityType) || '',
  order: (route.query.order as orderType) || '',
  status: (route.query.status as statusType) || '',
})

watch(
  () => route.query,
  (newQuery) => {
    filterQuery.search = (newQuery.search as string) || ''
    filterQuery.priority = (newQuery.priority as priorityType) || ''
    filterQuery.status = (newQuery.status as statusType) || ''
    filterQuery.order = (newQuery.order as orderType) || ''
  },
)

const filteredData = computed(() => {
  if (!filterQuery) return data.value
  return filterAndSortTasks(data.value, filterQuery)
})

const updateQuery = (key: string, value: string) => {
  router.push({
    query: {
      ...route.query,
      [key]: value,
    },
  })
}

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
        <th class="text-left flex flex-col justify-center items-center gap-1">
          <v-btn
            @click="
              filterQuery.order === Order.ascending
                ? updateQuery('order', '')
                : updateQuery('order', Order.ascending)
            "
            theme="primary"
            color="primary"
            class="w-[50%]"
            size="15"
            icon
          >
            <IconUp />
          </v-btn>
          <v-btn
            @click="
              filterQuery.order === Order.descending
                ? updateQuery('order', '')
                : updateQuery('order', Order.descending)
            "
            theme="primary"
            color="primary"
            class="w-[50%]"
            size="15"
            icon
          >
            <IconDown />
          </v-btn>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="task in filteredData"
        :key="task.id"
        @click="router.push(`/view/${encryptId(task.id.toString())}`)"
        class="cursor-pointer hover:bg-gray-50"
      >
        <td>{{ task.title }}</td>
        <td>{{ task.description }}</td>
        <td>
          <v-chip class="capitalize" :color="styleStatus(task.status)">{{ task.status }}</v-chip>
        </td>
        <td>
          <v-chip class="capitalize" :color="task.priority">{{ task.priority }}</v-chip>
        </td>
        <td>{{ task.due_date }}</td>
        <td>
          <DotIcons />
        </td>
      </tr>
    </tbody>
    <div
      v-if="!isLoading && filteredData?.length === 0"
      class="absolute top-[40%] right-[45%] flex flex-col items-center"
    >
      <SearchIcon />
      <h6 class="text-[16px] font-[600]">No Available Tasks</h6>
    </div>
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
