export type statusType = 'Pending' | 'In Progress' | 'Completed'
export type priorityType = 'Low' | 'Medium' | 'High'

export interface ITask {
  title: string
  description: string
  status: statusType
  priority: priorityType
  due_date: string
  id: number
}

export interface IRequestQuery {
  page: number
}

export interface IFilterQuery {
  status: statusType
  priority: priorityType
  search: string
  order: OrderEnum
}

export enum PriorityEnum {
  High = 'High',
  Low = 'Low',
  Medium = 'Medium',
}

export enum StatusEnum {
  Pending = 'Pending',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export enum OrderEnum {
  ascending = 'ascending',
  descending = 'descending',
}
