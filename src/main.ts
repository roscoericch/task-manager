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

const app = createApp(App)
const vuetify = createVuetify({
  components,
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
  }
})
app.use(createPinia())
app.use(router)
// app.use(PrimeVue, { theme: 'none' })
app.use(vuetify)

app.mount('#app')
