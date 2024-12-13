declare type statusType = 'pending' | 'in progress' | 'completed' | ''
declare type priorityType = 'low' | 'medium' | 'high' | ''
declare type orderType = 'ascending' | 'descending'
declare type Nullable<T> = T | null

declare interface ITask {
  title: string
  description: string
  status: statusType
  priority: priorityType
  due_date: string
  id: number
}

declare interface IRequestQuery {
  page: number
}

declare interface IFilterQuery {
  status: statusType
  priority: priorityType
  search: string
  order: OrderEnum
}

declare interface IRequestQuery {
  page: number
}

declare interface IFilterQuery {
  status: statusType
  priority: priorityType
  search: string
  order: OrderEnum
}

declare interface IOptions {
  key: string
  label: string
  disabled?: boolean
}
