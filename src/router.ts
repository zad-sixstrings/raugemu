import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "./components/Home.vue";
import ConsoleGames from "./components/ConsoleGames.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import About from "./components/About.vue";
import Account from "./components/Account.vue";
import Admin from "./components/Admin.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      requiresAuth: true, // If you're using navigation guards
    },
  },
  {
    path: "/console/:console",
    component: ConsoleGames,
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/compte",
    name: "account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("./components/PasswordRequestReset.vue"),
  },
  {
    path: "/update-password",
    name: "UpdatePassword",
    component: () => import("./components/PasswordUpdate.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  console.log("Navigating to:", to.path);
  next();
});

export default router;
