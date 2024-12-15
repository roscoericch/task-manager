// CreateTask.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateTask from '@/components/CreateTask.vue'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'
import { useTaskStore } from '@/stores/useTaskStore'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')
describe('CreateTask.vue', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    store.createTask = vi.fn()
  })

  it('renders the component', () => {
    const wrapper = mount(CreateTask, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('validates and submits the form', async () => {
    const wrapper = mount(CreateTask, {
      global: {
        plugins: [vuetify],
      },
    })
    const vm = wrapper.vm as any
    vm.taskData.title = 'test'
    vm.taskData.description = 'test'
    vm.taskData.status = 'pending'
    vm.taskData.priority = 'test'
    vm.taskData.due_date = '12/12/25'

    await wrapper.find('form').trigger('submit.prevent')
    expect(store.createTask).toHaveBeenCalled()
  })
})
