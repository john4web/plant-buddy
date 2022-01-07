import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AuthService from "@/services/AuthService";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { authRequired: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { authRequired: false },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { authRequired: false },
  },
  {
    path: "/my-garden",
    name: "MyGarden",
    meta: { authRequired: true },
    component: () =>
      import(/* webpackChunkName: "my-garden" */ "@/views/MyGarden.vue"),
  },
  {
    path: "/new-buddy",
    name: "NewBuddy",
    meta: { authRequired: true },
    component: () =>
      import(/* webpackChunkName: "new-buddy" */ "@/views/NewBuddy.vue"),
  },
  {
    path: "/buddy-detail/:id",
    name: "BuddyDetail",
    meta: { authRequired: true },
    component: () =>
      import(/* webpackChunkName: "buddy-detail" */ "@/views/BuddyDetail.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { authRequired: true },
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta: { authRequired: false },
    component: () =>
      import(/* webpackChunkName: "profile" */ "@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.authRequired && !await AuthService.isAuthorized()) {
    next("/login");
  } else if ((to.name === "Login" || to.name === "Register") && await AuthService.isAuthorized()) {
    next("/");
  } else {
    next();
  }
});

export default router;
