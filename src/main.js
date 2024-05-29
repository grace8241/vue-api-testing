import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { mdi } from 'vuetify/lib/iconsets/mdi';
import { fa } from 'vuetify/lib/iconsets/fa';
// 引入 mdi 和 font-awesome 的 CSS 文件
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css';

const vuetify = createVuetify({
    components,
    directives,
  })
//
const app = createApp(App)

app.use(router)

app.use(vuetify, {
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
        fa,
      },
		}
})

app.mount('#app')
