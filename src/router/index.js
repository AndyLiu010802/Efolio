import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import store from '@/store' 
import FirebaseSignUp from '@/views/FirebaseSignUp.vue'
import FirebaseSignIn from '@/views/FirebaseSignIn.vue'
import FirebaseSignOut from '@/views/FirebaseSignOut.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/firebaseLogin',
    name: 'firebaseLogin',
    component: FirebaseSignUp
  },
  {
    path: '/firebaseSignin',
    name: 'firebaseSignin',
    component: FirebaseSignIn
  },
  {
    path: '/firebaseSignOut',
    name: 'firebaseSignOut',
    component: FirebaseSignOut
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) { 
        next();
      } else {
        next('/login');
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
