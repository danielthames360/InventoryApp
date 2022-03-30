import { createRouter, createWebHashHistory } from "vue-router";

import auth from "@/modules/auth/router";
import dashboard from "@/modules/dashboard/router";

import {
  isAuthenticated,
  isAuthenticatedForLogin,
} from "../modules/auth/router/authGuard";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    beforeEnter: [isAuthenticatedForLogin],
    ...auth,
  },
  {
    path: "/dashboard",
    beforeEnter: [isAuthenticated],
    ...dashboard,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
