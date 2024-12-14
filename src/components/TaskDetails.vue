<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { decryptId } from '@/lib/utils'
import EditTask from './EditTask.vue'
import CloseIcon from './icons/IconClose.vue'
import BackIcon from './icons/IconBack.vue'
const store = useTaskStore()
const { deleteTask } = store
const { data } = storeToRefs(store)
const { params } = useRoute()
const { push, replace, back } = useRouter()
const dialog = ref(false)
const editDialog = ref(false)
const snackbar = ref(false)
const sucessSnackbar = ref(false)
const taskData = computed((): Partial<ITask> => {
  const current = data.value.find((e) => e.id.toString() === decryptId(params.id.toString()))
  if (current)
    return {
      ...current,
    }
  else {
    snackbar.value = true
    replace('/')
    return {}
  }
})
function handleDelete() {
  if (!taskData?.value?.id) return
  deleteTask(taskData?.value?.id)
  dialog.value = false
  push({ name: 'home' })
}
</script>
<template>
  <main class="bg-white px-[5%] py-[2%] flex flex-col gap-4 w-full">
    <header class="flex flex-col md:flex-row justify-between items-center w-full">
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
      <div class="flex items-center w-fit justify-start md:justify-end gap-4">
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
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Type</h6>
          <p>Task</p>
        </span>
        <v-divider class="my-2 md:hidden"></v-divider>
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Priority</h6>
          <p class="capitalize">{{ taskData.priority }}</p>
        </span>
      </div>
      <v-divider></v-divider>
      <div class="grid grid-cols-1 md:grid-cols-2 shadow-sm">
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Status</h6>
          <p class="capitalize">{{ taskData.status }}</p>
        </span>
        <v-divider class="my-2 md:hidden"></v-divider>
        <span class="px-4">
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Due Date</h6>
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
    <v-snackbar close-delay="4000" close-on-content-click v-model="snackbar">
      Task does not exist

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="(snackbar = false)"> Close </v-btn>
      </template>
    </v-snackbar>
  </main>
  <v-dialog v-model="editDialog" width="500">
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
      <v-btn
        variant="plain"
        position="absolute"
        class="top-[1%] right-[0px]"
        @click="(editDialog = false)"
        color="error"
        density="compact"
        :ripple="false"
      >
        <template v-slot:default> <CloseIcon class="" /> </template
      ></v-btn>
      <EditTask @success="(sucessSnackbar = true)" @close="(editDialog = false)" />
    </v-card>
  </v-dialog>
  <v-snackbar close-delay="8000" close-on-content-click v-model="sucessSnackbar">
    Task Updated Successfully
  </v-snackbar>
</template>
