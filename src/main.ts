import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import App from './App.vue'
import router from './router'
import './index.css'
import { PrimaryTheme } from './theme/LightTheme'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VDateInput } from 'vuetify/labs/VDateInput'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
const vuetify = createVuetify({
  components: {
    VDateInput,
    ...components,
  },
  directives,
  theme: {
    defaultTheme: 'PrimaryTheme',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes: {
      PrimaryTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
} as ToastContainerOptions)

app.mount('#app')
