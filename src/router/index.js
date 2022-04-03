import { createRouter, createWebHashHistory } from "vue-router";

import auth from "@/modules/auth/router";
import user from "@/modules/user/router";
import dashboard from "@/modules/dashboard/router";

import {
  isAuthenticated,
  isAuthenticatedForLogin,
  isAuthenticatedAndConfirmed
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
    path: "/user",
    beforeEnter: [isAuthenticated],
    ...user,
  },
  {
    path: "/dashboard",
    beforeEnter: [isAuthenticatedAndConfirmed],
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
