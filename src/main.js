import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'



// Initialize Vue app
const vueApp = createApp(App)
vueApp.use(PrimeVue, { theme: { preset: Aura } })
vueApp.use(router)
vueApp.use(store)
vueApp.mount('#app')

