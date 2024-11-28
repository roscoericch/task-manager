import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskDetails from '@/components/TaskDetails.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'
import { useTaskStore } from '@/stores/useTaskStore'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// Mocking useRouter and useRoute
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(), // Mock the push method
    replace: vi.fn(), // Mock the replace method
  }),
  useRoute: () => ({
    params: { id: '1' }, // Mock the route parameters
  }),
}))

const vuetify = createVuetify({
  components,
  directives,
})

describe('TaskDetails.vue', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    store.deleteTask = vi.fn()
    store.data = [
      {
        id: 1,
        title: 'Test Task',
        description: 'This is a test task description.',
        due_date: new Date().toISOString(),
        priority: 'High',
        status: 'Pending',
      },
    ]
  })

  it('renders the component', () => {
    const wrapper = mount(TaskDetails, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.find('h1').text()).toBe('Test Task')
    expect(wrapper.find('p').text()).toBe('This is a test task description.')
    expect(wrapper.find('[data-test="edit-btn"]').text()).toContain('Edit')
    expect(wrapper.find('[data-test="delete-btn"]').text()).toContain('Delete')
  })
})
