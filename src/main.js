import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from '@/includes/validation'

import './assets/base.css'
import './assets/main.css'
import { auth } from './includes/firebase'
import i18n from '@/includes/i18n.js'
import { registerSW } from 'virtual:pwa-register'
import progressBar from './includes/progressBar'
import 'nprogress/nprogress.css'
let app
registerSW({
  immediate: true
})

progressBar(router)
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(createPinia())
    app.use(VeeValidatePlugin)
    app.use(router)
    app.use(i18n)
    app.mount('#app')
  }
})
