import { type ITask, type IFilterQuery, OrderEnum } from '@/types/type'
export const filterAndSortTasks = (
  tasks: ITask[] | null,
  filterQuery: Partial<IFilterQuery> | null,
) => {
  if (!filterQuery || !tasks) return tasks
  return [
    ...tasks
      .sort((a, b) => {
        if (filterQuery?.order === OrderEnum.ascending) {
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        } else if (filterQuery?.order === OrderEnum.descending) {
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
