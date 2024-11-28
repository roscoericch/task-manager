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
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('[data-test="grp-button"]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').text()).toBe('Create Task')
  })

  it('validates and submits the form', async () => {
    const wrapper = mount(CreateTask, {
      global: {
        plugins: [vuetify],
      },
    })

    await wrapper.find('input').setValue('Test Task')
    await wrapper.find('textarea').setValue('This is a test description.')
    await wrapper.find('[data-test="high-button"]').trigger('click')
    await wrapper.find('input[type="date"]').setValue(new Date().toISOString().split('T')[0])

    await wrapper.find('form').trigger('submit.prevent')
    expect(store.createTask).toHaveBeenCalled()
  })
})
