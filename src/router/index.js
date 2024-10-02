import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import store from '@/store' 
import FirebaseSignUp from '@/views/FirebaseSignUp.vue'
import FirebaseSignIn from '@/views/FirebaseSignIn.vue'
import FirebaseSignOut from '@/views/FirebaseSignOut.vue'
import AddBookView from '@/views/AddBookView.vue'
import BookList from '@/components/BookList.vue'
import GetBookCount from '@/views/GetBookCount.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/GetAllBook',
    name: 'GetAllBook',
    component: GetAllBookAPI
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCount
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/books',
    name: 'Books',
    component: BookList,
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
