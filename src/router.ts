import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from './components/Home.vue'
import ConsoleGames from './components/ConsoleGames.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/console/:console',
    component: ConsoleGames,
    props: true,
    // Remove the requiresAuth meta field
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Remove or modify the authentication guard to only apply to protected routes
// which you'll add in the future
router.beforeEach((to, _from, next) => {
  console.log('Navigating to:', to.path)
  next()
})

export default router