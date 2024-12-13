export const priorityVariant: ReadonlyArray<IOptions> = [
  { key: '', label: 'Select', disabled: true },
  { key: 'high', label: 'High' },
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
]

export const filterPriorityVariant: ReadonlyArray<IOptions> = [
  { key: '', label: 'All' },
  { key: 'high', label: 'High' },
  { key: 'low', label: 'Low' },
  { key: 'medium', label: 'Medium' },
]

export const statusVariant: ReadonlyArray<IOptions> = [
  { key: '', label: 'Select', disabled: true },
  { key: 'pending', label: 'Pending' },
  { key: 'in progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
]

export const filterStatusVariant: ReadonlyArray<IOptions> = [
  { key: '', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'in progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
]

export const Order: Readonly<Record<string, orderType>> = {
  ascending: 'ascending',
  descending: 'descending',
}
