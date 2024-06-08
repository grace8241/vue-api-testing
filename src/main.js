import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'bootstrap/dist/css/bootstrap.css'
//import "bootstrap"

import { mdi } from 'vuetify/lib/iconsets/mdi';
import { fa } from 'vuetify/lib/iconsets/fa';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.use(router)

app.use(vuetify, {
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi, fa,
      },
		}
})

app.mount('#app')
