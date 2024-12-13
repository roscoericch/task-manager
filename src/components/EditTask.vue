<script setup lang="ts">
import { useTaskStore } from '@/stores/useTaskStore'
import { storeToRefs } from 'pinia'
import { priorityVariant, statusVariant } from '@/constants'
import { decryptId } from '@/lib/utils'
const emit = defineEmits<{
  (e: 'close'): void
}>()
const route = useRoute()
const store = useTaskStore()
const { updateTask } = store
const { data } = storeToRefs(store)
const snackbar = ref(false)
const initialTaskData: Omit<ITask, 'due_date'> & { due_date: Nullable<Date> } = {
  title: '',
  description: '',
  due_date: null,
  priority: '',
  status: '',
  id: 1,
}

const taskData = reactive<Omit<ITask, 'due_date'> & { due_date: Nullable<Date> }>(initialTaskData)

const updateTaskData = () => {
  const current = data.value.find((e) => e.id.toString() === decryptId(route.params.id.toString()))
  if (current) {
    taskData.title = current.title
    taskData.description = current.description
    taskData.due_date = new Date(current.due_date)
    taskData.priority = current.priority
    taskData.status = current.status
    taskData.id = current.id
    Object.assign(taskData, {
      ...current,
      due_date: new Date(current.due_date),
    })
  } else {
    snackbar.value = true
    emit('close')
    Object.assign(taskData, initialTaskData)
  }
}

// Call updateTaskData to initialize taskData
updateTaskData()
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
const validateForm = () => {
  const errors: string[] = []
  const titleError = rules.title
    .map((rule) => rule(taskData?.title!))
    .find((error) => error !== true)
  if (titleError) errors.push(titleError)

  const descriptionError = rules.description
    .map((rule) => rule(taskData?.description!))
    .find((error) => error !== true)
  if (descriptionError) errors.push(descriptionError)

  const priorityError = rules.priority
    .map((rule) => rule(taskData?.priority!))
    .find((error) => error !== true)
  if (priorityError) errors.push(priorityError)

  const dueDateError = rules.due_date
    .map((rule) => rule(taskData?.due_date!))
    .find((error) => error !== true)
  if (dueDateError) errors.push(dueDateError)
  return errors.length === 0 ? true : false
}
const handleSubmit = async () => {
  const valid = validateForm()
  if (valid && taskData) {
    updateTask({
      ...taskData,
      due_date: new Date(taskData.due_date!).toISOString().split('T')[0],
    })
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
    <v-messages v-if="!form?.value?.checkValidity()" :value="rules.title" />
    <v-textarea
      v-model="taskData.description"
      label="Description"
      :rules="rules.description"
      rows="3"
      variant="outlined"
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
        ></v-date-input>
        <v-messages v-if="!form?.value?.checkValidity()" :value="rules.due_date" />
      </span>
    </div>
    <v-btn :disabled="!validateForm()" type="submit" color="primary" block class="mt-4">
      Update Task
    </v-btn>
  </form>
</template>
