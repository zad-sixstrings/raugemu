import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from './components/Home.vue'
import ConsoleGames from './components/ConsoleGames.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import About from './components/About.vue'
import Account from './components/Account.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/console/:console',
    component: ConsoleGames,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/compte',
    name: 'account',
    component: Account,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  console.log('Navigating to:', to.path)
  next()
})

export default router