<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { decryptId } from '@/lib/utils'
import EditTask from './EditTask.vue'
import CloseIcon from './icons/IconClose.vue'
import BackIcon from './icons/IconBack.vue'
import { toast } from 'vue3-toastify'
import { useFetch } from '@/stores/useQueryStore'
const store = useTaskStore()
const { deleteTask } = store
const { data } = storeToRefs(store)
const apiStore = useFetch()
const { fetchDataById } = apiStore
const { params } = useRoute()
const { push, back } = useRouter()
const dialog = ref(false)
const editDialog = ref(false)
const taskData = reactive<Partial<ITask>>({})

function handleDelete() {
  if (!taskData?.id) return
  deleteTask(taskData?.id)
  toast.success('Task Deleted Succesfully', {
    onClose: () => {
      push({ name: 'home' })
    },
  })
  dialog.value = false
}

onMounted(async () => {
  const current = await fetchDataById(decryptId(params.id.toString()))
  Object.assign(taskData, current)
})
</script>
<template>
  <main class="bg-white px-[2%] md:px-[5%] py-[2%] flex flex-col gap-4 w-full">
    <header class="flex flex-row justify-between items-center w-full">
      <v-btn
        variant="tonal"
        class="text-[12px]"
        @click="back"
        density="comfortable"
        :ripple="false"
      >
        <template v-slot:prepend> <BackIcon class="" /> </template>
        Back
      </v-btn>
      <div class="flex items-center w-fit justify-end gap-4">
        <v-btn
          data-test="edit-btn"
          theme="primary"
          color="primary"
          density="comfortable"
          @click="(editDialog = true)"
          >Edit</v-btn
        >
        <v-btn
          data-test="delete-btn"
          color="error"
          style=""
          theme="primary"
          density="comfortable"
          @click="(dialog = true)"
          >Delete</v-btn
        >
      </div>
    </header>
    <div class="flex flex-col gap-2">
      <span class="px-4">
        <h1 class="text-[18px] md:text-3xl font-bold text-gray-800 capitalize">
          {{ taskData.title }}
        </h1>
        <p>{{ taskData.description }}</p>
      </span>
      <v-divider class="mt-2"></v-divider>
      <div class="grid grid-cols-1 md:grid-cols-2 shadow-sm">
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Type:</h6>
          <p>Task</p>
        </span>
        <v-divider class="my-2 md:hidden"></v-divider>
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Priority:</h6>
          <p class="capitalize">{{ taskData.priority }}</p>
        </span>
      </div>
      <v-divider></v-divider>
      <div class="grid grid-cols-1 md:grid-cols-2 shadow-sm">
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Status:</h6>
          <p class="capitalize">{{ taskData.status }}</p>
        </span>
        <v-divider class="my-2 md:hidden"></v-divider>
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Due Date:</h6>
          <p class="capitalize">{{ taskData.due_date }}</p>
        </span>
      </div>
      <v-divider></v-divider>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <v-card rounded="lg">
        <v-card-title class="">
          <div class="text-h5 text-medium-emphasis ps2">Delete Task</div>
          <p class="text-[16px]">This task will be permanently deleted and cannot be recovered</p>
        </v-card-title>
        <v-card-text class="!px-[3%]"> are you sure you want to delete this task? </v-card-text>
        <template v-slot:actions>
          <v-btn color="primary" text="Cancel" @click="(dialog = false)"></v-btn>
          <v-btn
            data-test="confirm-btn"
            text="Delete"
            variant="tonal"
            color="error"
            @click="handleDelete"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </main>
  <v-dialog v-model="editDialog" width="500">
    <v-card class="px-[5%] pt-[2%] pb-[5%] relative" rounded="lg">
      <div class="flex justify-between items-center pb-4">
        <v-title class="text-[18px] font-[800]">Edit Task</v-title>
        <v-btn
          variant="plain"
          class="self-end inline px-0 min-w-[24px] my-auto"
          @click="(editDialog = false)"
          color="error"
          density="compact"
          :ripple="false"
        >
          <template v-slot:default> <CloseIcon class="" /> </template
        ></v-btn>
      </div>
      <EditTask @close="(editDialog = false)" />
    </v-card>
  </v-dialog>
</template>
