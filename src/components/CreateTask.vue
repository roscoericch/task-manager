<script setup lang="ts">
import { priorityVariant } from '@/constants'
import { useTaskStore } from '@/stores/useTaskStore'
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()
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
    (v: Nullable<Date>) => !!v || 'Due date is required',
    (v: Nullable<Date>) => {
      if (!v) return 'Due date is required'
      const selected = new Date(v)
      const today = new Date()
      return selected > today || 'Due date must not be in the past'
    },
  ],
}
const taskData = reactive<Omit<ITask, 'id' | 'due_date'> & { due_date: Nullable<Date> }>({
  title: '',
  description: '',
  status: 'pending',
  priority: '',
  due_date: null,
})
const { createTask, data } = useTaskStore()
const validateForm = () => {
  const errors: string[] = []
  const titleError = rules.title.map((rule) => rule(taskData.title)).find((error) => error !== true)
  if (titleError) errors.push(titleError)

  const descriptionError = rules.description
    .map((rule) => rule(taskData.description))
    .find((error) => error !== true)
  if (descriptionError) errors.push(descriptionError)

  const priorityError = rules.priority
    .map((rule) => rule(taskData.priority))
    .find((error) => error !== true)
  if (priorityError) errors.push(priorityError)

  const dueDateError = rules.due_date
    .map((rule) => rule(taskData.due_date))
    .find((error) => error !== true)
  if (dueDateError) errors.push(dueDateError)
  return errors.length === 0 ? true : false
}
const handleSubmit = async () => {
  const valid = validateForm()
  if (valid) {
    createTask({
      ...taskData,
      id: data.length + 1,
      due_date: new Date(taskData.due_date!).toISOString().split('T')[0],
    })
    taskData.title = ''
    taskData.description = ''
    taskData.priority = ''
    taskData.due_date = null
    form.value?.reset()
    emit('close')
    emit('success')
  }
}
</script>

<template>
  <form role="form" ref="form" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="taskData.title"
      label="Title"
      :rules="rules.title"
      variant="outlined"
      color="primary"
      data-testid="title"
    ></v-text-field>
    <v-messages v-if="!form?.value?.checkValidity()" :value="rules.title" />
    <v-textarea
      v-model="taskData.description"
      label="Description"
      :rules="rules.description"
      rows="3"
      variant="outlined"
      color="primary"
      data-testid="description"
    ></v-textarea>
    <v-messages v-if="!form?.value?.checkValidity()" :value="rules.description" />
    <div class="grid grid-cols-1 md:grid-cols-2 items-start justify-between md:gap-8 w-full">
      <span>
        <v-select
          :items="priorityVariant"
          v-model="taskData.priority"
          item-title="label"
          item-value="key"
          color="primary"
          label="Priority"
          variant="outlined"
          density="compact"
          data-testid="priority"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :disabled="item.raw.disabled"></v-list-item>
          </template>
        </v-select>
        <v-messages v-if="!form?.value?.checkValidity()" :value="rules.priority" />
      </span>
      <span>
        <v-date-input
          label="Select a date"
          prepend-icon=""
          v-model="taskData.due_date"
          prepend-inner-icon="$calendar"
          variant="outlined"
          color="primary"
          density="compact"
          :rules="rules.due_date"
          id="date"
          data-testid="date"
        ></v-date-input>
        <v-messages v-if="!form?.value?.checkValidity()" :value="rules.due_date" />
      </span>
    </div>
    <v-btn
      data-testid="submit-button"
      :disabled="!validateForm()"
      type="submit"
      color="primary"
      block
      class="mt-4"
    >
      Create Task
    </v-btn>
  </form>
</template>
