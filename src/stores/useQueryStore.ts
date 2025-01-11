import type { ComputedRef } from 'vue'
import { useTaskStore } from './useTaskStore'
import { storeToRefs } from 'pinia'
import tasks from '@/constants/task.json'

export function useFetch() {
  const url = 'http://localhost:5000'
  const store = useTaskStore()
  const { refreshTask, updateLoadingState, updateErrorState } = store
  const { data } = storeToRefs(store)

  async function fetchData(query?: IRequestQuery): Promise<void> {
    updateLoadingState(true)
    updateErrorState(null)
    try {
      const queryParams = new URLSearchParams(Object.entries(query || {})).toString()
      const fullUrl = queryParams ? `${url}?${queryParams}` : url
      const response = await fetch(fullUrl)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const result: ITask[] = await response.json()
      if (data.value.length === 0) refreshTask(result)
    } catch (err) {
      updateErrorState((err as Error).message)
      refreshTask(tasks.tasks as ITask[])
    } finally {
      updateLoadingState(false)
    }
  }

  async function fetchDataById(id: string): Promise<ITask | undefined> {
    updateLoadingState(true)
    updateErrorState(null)
    try {
      const response = await fetch(`${url}/tasks/${id}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      // {{ edit_1 }}: Return the parsed JSON response directly
      return await response.json() // Changed to await the response
    } catch (err) {
      updateErrorState((err as Error).message)
      refreshTask(tasks.tasks as ITask[])
    } finally {
      updateLoadingState(false)
    }
  }
  // watch(fetchData, { deep: true, immediate: true })

  return { fetchData, fetchDataById }
}
