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
        priority: 'High',
        status: 'Pending',
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

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('[data-test="grp-button"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="status-button"]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Update Task')
  })

  it('validates and submits the form', async () => {
    const wrapper = mount(EditTask, {
      global: {
        plugins: [vuetify],
      },
      props: {
        id: 1, // Pass the ID of the task to edit
      },
    })

    // Set values for the form fields
    await wrapper.find('input').setValue('Updated Task Title')
    await wrapper.find('textarea').setValue('Updated task description.')
    await wrapper.find('[data-test="high-button"]').trigger('click')
    await wrapper.find('[data-test="pendingstatus-button"]').trigger('click')
    await wrapper.find('input[type="date"]').setValue(new Date().toISOString().split('T')[0])

    await wrapper.find('form').trigger('submit.prevent')

    expect(store.updateTask).toHaveBeenCalled()
  })
})
