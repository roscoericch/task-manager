import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const data = ref<ITask[]>([])
  const filterQuery = reactive<Partial<IFilterQuery>>({ status: '', priority: '' })
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  function updateTask(updatedTask: ITask) {
    const index = data.value.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) {
      data.value[index] = { ...updatedTask }
    }
  }
  function refreshTask(tasks: ITask[]) {
    data.value = Array.isArray(tasks) ? [...tasks] : []
  }
  function deleteTask(taskId: number) {
    data.value = data.value.filter((e) => e.id !== taskId)
  }
  function updateFilterQuery(filter: Partial<IFilterQuery>) {
    filterQuery.priority = filter.priority
    filterQuery.status = filter.status
    filterQuery.order = filter.order
    filterQuery.search = filter.search
  }
  function createTask(task: ITask) {
    data.value.push(task)
  }
  function updateLoadingState(state: boolean) {
    isLoading.value = state
  }
  function updateErrorState(errordata: string | null) {
    error.value = errordata
  }
  return {
    updateTask,
    deleteTask,
    refreshTask,
    createTask,
    updateFilterQuery,
    updateLoadingState,
    updateErrorState,
    data,
    filterQuery,
    isLoading,
    error,
  }
})
