import { createRouter, createWebHashHistory } from "vue-router";

import reports from "@/modules/reports/router";
import sales from "@/modules/sales/router";
import purchases from "@/modules/purchases/router";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    ...reports,
  },
  {
    path: "/sales",
    ...sales,
  },
  {
    path: "/purchases",
    ...purchases,
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
