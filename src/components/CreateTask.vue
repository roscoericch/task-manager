<script setup lang="ts">
import { priorityVariant } from '@/constants'
import { useTaskStore } from '@/stores/useTaskStore'
const emit = defineEmits<{
  (e: 'close'): void
}>()
const min = new Date().toISOString().split('T')[0]
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
const taskData = reactive<Omit<ITask, 'id'>>({
  title: '',
  description: '',
  status: 'pending',
  priority: '',
  due_date: new Date().toISOString().split('T')[0],
})
const { createTask, data } = useTaskStore()
const handleSubmit = async () => {
  const valid = form.value?.checkValidity()

  if (valid) {
    createTask({
      ...taskData,
      id: data.length + 1,
      due_date: new Date(taskData.due_date).toISOString().split('T')[0],
    })
    taskData.title = ''
    taskData.description = ''
    taskData.priority = ''
    taskData.due_date = new Date().toISOString().split('T')[0]

    form.value?.reset()
    emit('close')
  }
}
</script>

<template>
  <form ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="taskData.title"
      label="Title"
      :rules="rules.title"
      variant="outlined"
    ></v-text-field>
    <v-textarea
      v-model="taskData.description"
      label="Description"
      :rules="rules.description"
      rows="3"
      variant="outlined"
    ></v-textarea>
    <div class="grid grid-cols-1 md:grid-cols-2 items-start justify-between md:gap-8 w-full">
      <v-select
        :items="priorityVariant"
        v-model="taskData.priority"
        item-title="label"
        item-value="key"
        color="primary"
        label="Priority"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :disabled="item.raw.disabled"></v-list-item>
        </template>
      </v-select>
      <v-row class="w-full mx-auto mt-2">
        <label htmlFor="date">Due Date</label>
        <input
          class="w-full border border-b-slate-500"
          v-model="taskData.due_date"
          id="date"
          type="date"
          :min="min"
          :rules="rules.due_date"
        />
      </v-row>
    </div>
    <v-btn type="submit" color="primary" block class="mt-4"> Create Task </v-btn>
  </form>
</template>
