<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
const store = useTaskStore()
const { deleteTask } = store
const { data } = storeToRefs(store)
const { params } = useRoute()
const { push, replace } = useRouter()
const dialog = ref(false)
const snackbar = ref(false)
const taskData = computed((): ITask => {
  const current = data.value.find((e) => e.id.toString() === params.id.toString())
  if (current)
    return {
      ...current,
    }
  else {
    snackbar.value = true
    replace('/')
    return {
      title: '',
      description: '',
      due_date: '',
      priority: 'High',
      status: 'Pending',
      id: 1,
    }
  }
})
function handleEdit() {
  push({ name: 'edit', params: { id: taskData.value.id } })
}
function handleDelete() {
  deleteTask(taskData.value.id)
  dialog.value = false
  push({ name: 'home' })
}
</script>
<template>
  <main class="bg-white px-[5%] py-[2%] flex flex-col gap-4">
    <header class="flex flex-col md:flex-row justify-between items-center w-full">
      <span class="w-full">
        <h1 class="text-[18px] md:text-3xl font-bold text-gray-800 capitalize">
          {{ taskData.title }}
        </h1>
      </span>
      <div class="flex items-center w-full justify-start md:justify-end gap-4">
        <v-btn data-test="edit-btn" theme="primary" color="primary" @click="handleEdit">Edit</v-btn>
        <v-btn
          data-test="delete-btn"
          color="primary"
          style=""
          theme="primary"
          @click="(dialog = true)"
          >Delete</v-btn
        >
      </div>
    </header>
    <div class="flex flex-col gap-2">
      <span>
        <h2 class="text-2xl font-bold text-gray-800 capitalize">Details</h2>
        <p>{{ taskData.description }}</p>
      </span>
      <v-divider class="mt-2"></v-divider>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <span>
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Type</h6>
          <p>Task</p>
        </span>
        <v-divider class="my-2 md:hidden"></v-divider>
        <span>
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Priority</h6>
          <p>{{ taskData.priority }}</p>
        </span>
      </div>
      <v-divider></v-divider>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <span>
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Status</h6>
          <p>{{ taskData.status }}</p>
        </span>
        <v-divider class="my-2 md:hidden"></v-divider>
        <span>
          <h6 class="text-[18px] font-[400] text-gray-800 capitalize">Due Date</h6>
          <p>{{ taskData.due_date }}</p>
        </span>
      </div>
      <v-divider></v-divider>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps2">Delete Task?</div>
          <p class="text-[16px]">This task will be permanently deleted and cannot be recovered</p>
        </v-card-title>
        <v-card-text class="!px-[3%]"> are you sure you want to delete this task? </v-card-text>
        <template v-slot:actions>
          <v-btn color="primary" text="Cancel" @click="(dialog = false)"></v-btn>
          <v-btn
            data-test="confirm-btn"
            color="primary"
            text="Delete"
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
</template>
