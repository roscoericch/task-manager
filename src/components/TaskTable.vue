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
const { filterQuery } = defineProps<{
  filterQuery: Partial<IFilterQuery>
}>()
const router = useRouter()
const route = useRoute()
const query: IRequestQuery = reactive({ page: Number(route.query.page || 1) })
// useFetch()
const store = useTaskStore()
const { data, isLoading, error } = storeToRefs(store)
const snackbar = ref(false)
watch(error, (newValue) => {
  snackbar.value = Boolean(newValue)
})

watch(
  () => query.page,
  (newQuery) => {
    updateQuery('page', newQuery.toString())
  },
)

const filteredData = computed(() => {
  if (!filterQuery) return data.value
  return filterAndSortTasks(data.value, filterQuery)
})

const updateQuery = (key: string, value: string) => {
  router.replace({
    query: {
      ...route.query,
      [key]: value,
    },
  })
}
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
    height="600px"
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
                ? (filterQuery.order = '')
                : (filterQuery.order = Order.ascending)
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
                ? (filterQuery.order = '')
                : (filterQuery.order = Order.descending)
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
        <td class="">{{ task.description.slice(0, 10) }}...</td>
        <td>
          <v-chip class="capitalize" :color="styleStatus(task.status)">{{ task.status }}</v-chip>
        </td>
        <td>
          <v-chip class="capitalize" :color="task.priority">{{ task.priority }}</v-chip>
        </td>
        <td class="w-[100px]">{{ task.due_date }}</td>
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
      <h6 class="text-[16px] font-[600]">No Tasks Available</h6>
    </div>
  </v-table>
  <v-pagination
    color="primary"
    v-model="query.page"
    :length="10"
    :total-visible="5"
    class="md:my-1 w-[80%] mx-auto"
    v-if="filteredData && filteredData.length > 5"
  >
    <template v-slot:prev="arg">
      <v-btn
        :disabled="arg.disabled"
        @click="arg.onClick"
        class="mt-1 text-[1.5rem]"
        variant="plain"
        color="primary"
        width="1rem"
        >&#x2039;</v-btn
      >
    </template>
    <template v-slot:next="arg">
      <v-btn
        :disabled="arg.disabled"
        @click="arg.onClick"
        class="mt-1 text-[1.5rem]"
        variant="plain"
        color="primary"
        width="1rem"
        >&#x203A;</v-btn
      >
    </template>
  </v-pagination>
  <v-snackbar close-delay="4000" close-on-content-click v-model="snackbar">
    {{ error }}

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="(snackbar = false)"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
