import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskTable from '@/components/TaskTable.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'
import { useTaskStore } from '@/stores/useTaskStore'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// Mocking the useFetch function
vi.mock('@/stores/useQueryStore', () => ({
  useFetch: () => ({
    fetchData: vi.fn(),
  }),
}))
global.ResizeObserver = require('resize-observer-polyfill')
const vuetify = createVuetify({
  components,
  directives,
})

describe('TaskTable.vue', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    store.data = [
      {
        id: 1,
        title: 'Test Task 1',
        description: 'Description for task 1',
        status: 'Pending',
        priority: 'High',
        due_date: '2023-12-31',
      },
      {
        id: 2,
        title: 'Test Task 2',
        description: 'Description for task 2',
        status: 'Completed',
        priority: 'Medium',
        due_date: '2023-11-30',
      },
    ]
    store.isLoading = false
    store.error = null
  })

  it('renders the component', () => {
    const wrapper = mount(TaskTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        tag: '', // Pass any required props
      },
    })

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(true)
  })

  it('displays tasks correctly', () => {
    const wrapper = mount(TaskTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        tag: '', // Pass any required props
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2) // Expecting 2 tasks to be rendered

    expect(rows[0].text()).toContain('Test Task 1')
    expect(rows[0].text()).toContain('Description for task 1')
    expect(rows[0].text()).toContain('Pending')
    expect(rows[0].text()).toContain('High')
    expect(rows[0].text()).toContain('2023-12-31')

    expect(rows[1].text()).toContain('Test Task 2')
    expect(rows[1].text()).toContain('Description for task 2')
    expect(rows[1].text()).toContain('Completed')
    expect(rows[1].text()).toContain('Medium')
    expect(rows[1].text()).toContain('2023-11-30')
  })

  it('shows loading spinner when loading', async () => {
    store.isLoading = true
    const wrapper = mount(TaskTable, {
      global: {
        plugins: [vuetify],
      },
      props: {
        tag: '', // Pass any required props
      },
    })

    expect(wrapper.find('[data-test="loader"]').exists()).toBe(true)
    expect(wrapper.find('table').exists()).toBe(false)
  })
})
