import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskLists from '@/components/TaskLists.vue'
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
describe('TaskLists.vue', () => {
  let store: ReturnType<typeof useTaskStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
    store.filterQuery = {
      search: '',
    }
  })

  it('renders the component', () => {
    const wrapper = mount(TaskLists, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('.v-field__input').exists()).toBe(true)
  })
})
