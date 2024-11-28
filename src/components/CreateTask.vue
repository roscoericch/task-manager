<script setup lang="ts">
import { type ITask, PriorityEnum } from '@/types/type'
import { reactive, ref } from 'vue'
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
  status: 'Pending',
  priority: 'Medium',
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
    taskData.priority = 'Medium'
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
      <v-chip-group
        v-model="taskData.priority"
        mandatory
        selected-class="text-primary"
        direction="vertical"
        class="w-full"
        label="Priority"
        data-test="grp-button"
      >
        <p>Priority</p>
        <v-chip
          :key="PriorityEnum.High"
          :text="PriorityEnum.High"
          :value="PriorityEnum.High"
          variant="outlined"
          class="w-full"
          data-test="high-button"
        ></v-chip>
        <v-chip
          :key="PriorityEnum.Medium"
          :text="PriorityEnum.Medium"
          :value="PriorityEnum.Medium"
          variant="outlined"
          class="w-full"
        ></v-chip>
        <v-chip
          :key="PriorityEnum.Low"
          :text="PriorityEnum.Low"
          :value="PriorityEnum.Low"
          variant="outlined"
          class="w-full"
        ></v-chip>
      </v-chip-group>
      <v-row class="w-full mt-2">
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
