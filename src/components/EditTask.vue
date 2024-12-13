<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { priorityVariant, statusVariant } from '@/constants'
const route = useRoute()
const router = useRouter()
const store = useTaskStore()
const { updateTask } = store
const { data } = storeToRefs(store)
const snackbar = ref(false)
const taskData = computed((): ITask | undefined => {
  const current = data.value.find((e) => e.id.toString() === route.params.id.toString())
  if (current)
    return {
      ...current,
    }
  else {
    snackbar.value = true
    router.replace('/')
    // return {
    //   title: '',
    //   description: '',
    //   due_date: new Date().toISOString().split('T')[0],
    //   priority: "High",
    //   status:"Completed",
    //   id: 1,
    // }
  }
})
const min = new Date(taskData?.value?.due_date ?? '').toISOString().split('T')[0]
const form = ref<HTMLFormElement | null>(null)
const rules = {
  title: [
    (v: string) => !!v || 'Title is required',
    (v: string) => v.length <= 50 || 'Title must be less than 50 characters',
  ],
  description: [
    (v: string) => !!v || 'Description is required',
    (v: string) => v.length <= 500 || 'Description must be less than 500 characters',
  ],
  priority: [(v: string) => !!v || 'Priority is required'],
  due_date: [
    (v: string) => !!v || 'Due date is required',
    (v: string) => {
      const selected = new Date(v)
      const today = new Date()
      return selected >= today || 'Due date must not be in the past'
    },
  ],
}
const handleSubmit = async () => {
  const valid = form.value?.checkValidity()
  if (valid && taskData.value) {
    updateTask({
      ...taskData?.value,
      due_date: new Date(taskData.value.due_date).toISOString().split('T')[0],
    })
    form.value?.reset()
  }
}
</script>

<template>
  <form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="taskData?.title"
      label="Title"
      variant="outlined"
      :rules="rules.title"
    ></v-text-field>
    <v-textarea
      v-model="taskData?.description"
      label="Description"
      variant="outlined"
      rows="3"
      :rules="rules.description"
    ></v-textarea>
    <div class="grid grid-cols-1 md:grid-cols-2 items-start justify-between gap-8 w-full">
      <div>
        <v-select
          :items="priorityVariant"
          v-model="taskData?.priority"
          item-title="label"
          item-value="key"
          color="primary"
          label="Priority"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :disabled="item.raw.disabled"></v-list-item>
          </template>
        </v-select>
        <v-select
          :items="statusVariant"
          v-model="taskData?.status"
          item-title="label"
          item-value="key"
          color="primary"
          label="Status"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :disabled="item.raw.disabled"></v-list-item>
          </template>
        </v-select>
      </div>
      <v-row class="w-full mt-2">
        <label htmlFor="date">Due Date</label>
        <input
          class="w-full border border-b-slate-500"
          v-model="taskData?.due_date"
          id="date"
          type="date"
          :min="min"
          :rules="rules.due_date"
        />
      </v-row>
    </div>
    <v-btn type="submit" color="primary" block class="mt-4">Update Task </v-btn>
  </form>
  <v-snackbar close-delay="4000" close-on-content-click v-model="snackbar">
    Task does not exist

    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="(snackbar = false)"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
