import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from './components/Home.vue'
import ConsoleGames from './components/ConsoleGames.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  {
    path: '/console/:console',
    component: ConsoleGames,
    props: true  // Ensures that the console name from the URL is passed as a prop to ConsoleGames
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
