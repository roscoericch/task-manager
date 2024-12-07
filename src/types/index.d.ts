declare type statusType = 'Pending' | 'In Progress' | 'Completed'
declare type priorityType = 'Low' | 'Medium' | 'High'
declare type orderType = 'ascending' | 'descending'

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
