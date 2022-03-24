import { createRouter, createWebHashHistory } from "vue-router";

import dashboard from "@/modules/dashboard/router";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    ...dashboard,
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "NoPageFound" */ "@/modules/shared/pages/NoPageFound.vue"
  //     ),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
