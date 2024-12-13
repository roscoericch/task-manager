import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'
import { Order } from '@/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterAndSortTasks = (
  tasks: ITask[] | null,
  filterQuery: Partial<IFilterQuery> | null,
) => {
  if (!filterQuery || !tasks) return tasks
  return [
    ...tasks
      .sort((a, b) => {
        if (filterQuery?.order === Order.ascending) {
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        } else if (filterQuery?.order === Order.descending) {
          return new Date(b.due_date).getTime() - new Date(a.due_date).getTime()
        } else return 0
      })
      .filter(
        (task) =>
          (task.title.toLowerCase().includes(filterQuery.search?.toLowerCase() || '') ||
            task.description.toLowerCase().includes(filterQuery.search?.toLowerCase() || '')) &&
          task.status.toLowerCase().includes(filterQuery.status?.toLowerCase() || '') &&
          task.priority.toLowerCase().includes(filterQuery.priority?.toLowerCase() || ''),
      ),
  ]
}
export function evaluateTasks(type: statusType | 'overdue', tasks: ITask[]): number {
  switch (type) {
    case 'pending':
      return tasks.filter((task) => task.status === 'pending').length
    case 'completed':
      return tasks.filter((task) => task.status === 'completed').length
    case 'in progress':
      return tasks.filter((task) => task.status === 'in progress').length
    case 'overdue':
      return tasks.filter((task) => new Date(task.due_date) < new Date()).length
    default:
      return 0
  }
}

export function styleStatus(status: statusType): string {
  switch (status) {
    case 'completed':
      return 'success'
    case 'in progress':
      return 'primary'
    case 'pending':
      return 'warning'
    default:
      return ''
  }
}

export function encryptId(id: string) {
  return btoa(id)
}

export function decryptId(id: string) {
  return atob(id)
}
