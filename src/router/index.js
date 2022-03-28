import { createRouter, createWebHashHistory } from "vue-router";

import auth from "@/modules/auth/router";
import dashboard from "@/modules/dashboard/router";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    ...auth,
  },
  {
    path: "/dashboard",
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
