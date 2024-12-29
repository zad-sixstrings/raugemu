import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from './components/Home.vue'
import ConsoleGames from './components/ConsoleGames.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import { useAuthStore } from './stores/auth'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/console/:console',
    component: ConsoleGames,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router