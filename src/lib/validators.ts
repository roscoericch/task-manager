export const create_task_rules: Readonly<Record<string, Array<(v: any) => boolean | string>>> = {
  title: [
    (v: string) => !!v || 'Title is required',
    (v: string) => v.length <= 50 || 'Title must be less than 50 characters',
  ],
  description: [
    (v: string) => !!v || 'Description is required',
    (v: string) => v.length <= 500 || 'Description must be less than 500 characters',
  ],
  priority: [(v: string) => !!v || 'Priority is required'],
  due_date: [
    (v: Nullable<Date>) => !!v || 'Due date is required',
    (v: Nullable<Date>) => {
      if (!v) return 'Due date is required'
      const selected = new Date(v)
      const today = new Date()
      return selected > today || 'Due date must not be in the past'
    },
  ],
}
