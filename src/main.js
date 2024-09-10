import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI8amjnBQeGx-PG2f3jJg9UcNLrCkHym0",
  authDomain: "efolio4.firebaseapp.com",
  projectId: "efolio4",
  storageBucket: "efolio4.appspot.com",
  messagingSenderId: "492013215501",
  appId: "1:492013215501:web:5ba60429210317322f5a44",
  measurementId: "G-B6XFFZJ8YV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Vue app
const vueApp = createApp(App)
vueApp.use(PrimeVue, { theme: { preset: Aura } })
vueApp.use(router)
vueApp.use(store)
vueApp.mount('#app')

