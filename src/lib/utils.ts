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
