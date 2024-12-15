import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EditTask from '@/components/EditTask.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'
import { useTaskStore } from '@/stores/useTaskStore'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
  useRoute: () => ({
    params: { id: '1' },
  }),
}))

vi.mock('@/lib/utils', () => ({
  decryptId: vi.fn().mockImplementation((id: string) => {
    return `1`
  }),
}))

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('EditTask.vue', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    store.updateTask = vi.fn()
    store.data = [
      {
        id: 1,
        title: 'Existing Task',
        description: 'This is an existing task description.',
        due_date: new Date().toISOString().split('T')[0],
        priority: 'high',
        status: 'pending',
      },
    ]
  })

  it('renders the component', () => {
    const wrapper = mount(EditTask, {
      global: {
        plugins: [vuetify],
      },
      props: {
        id: 1,
      },
    })

    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('validates and submits the form', async () => {
    const wrapper = mount(EditTask, {
      global: {
        plugins: [vuetify],
      },
      props: {
        id: 1,
      },
    })

    // Set values for the form fields
    const vm = wrapper.vm as any
    vm.taskData.title = 'test'
    vm.taskData.description = 'test'
    vm.taskData.status = 'pending'
    vm.taskData.priority = 'test'
    vm.taskData.due_date = '12/12/25'

    await wrapper.find('form').trigger('submit.prevent')

    expect(store.updateTask).toHaveBeenCalled()
  })
})
