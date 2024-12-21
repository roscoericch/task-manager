import type { ComputedRef } from 'vue'
import { useTaskStore } from './useTaskStore'
import { storeToRefs } from 'pinia'
import tasks from '@/constants/task.json'

export function useFetch(url: string, query?: IRequestQuery) {
  const store = useTaskStore()
  const { refreshTask, updateLoadingState, updateErrorState } = store
  const { data } = storeToRefs(store)

  async function fetchData(): Promise<void> {
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
      refreshTask(tasks as ITask[])
    } finally {
      updateLoadingState(false)
    }
  }
  watch(query || {}, fetchData, { deep: true, immediate: true })

  return { fetchData }
}
