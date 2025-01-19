import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "./stores/auth";
import Home from "./components/Home.vue";
import ConsoleGames from "./components/ConsoleGames.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import REPedia from "./components/PediaMain.vue";
import Account from "./components/Account.vue";
import Admin from "./components/Admin.vue";

const routes: RouteRecordRaw[] = [
  { 
    path: "/", 
    component: Home,
    meta: { requiresAuth: true }
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: { requiresAuth: true }
  },
  {
    path: "/console/:console",
    component: ConsoleGames,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/REPedia",
    name: "RaugEmuPedia",
    component: REPedia
  },
  {
    path: "/compte",
    name: "account",
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("./components/PasswordRequestReset.vue")
  },
  {
    path: "/update-password",
    name: "UpdatePassword",
    component: () => import("./components/PasswordUpdate.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // List of routes accessible without auth
  const publicPages = ['/login', '/register', '/about', '/reset-password', '/update-password'];
  
  // If user is not authenticated and tries to access a protected route
  if (!isAuthenticated && !publicPages.includes(to.path)) {
    // If they're not already heading to login, send them there
    if (to.path !== '/login') {
      next('/login');
      return;
    }
  }
  
  // If user is authenticated and tries to access login/register
  if (isAuthenticated && ['/login', '/register'].includes(to.path)) {
    next('/');
    return;
  }

  next();
});

export default router;