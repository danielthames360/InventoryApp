export default {
  name: "dashboard",
  component: () =>
    import(
      /* webpackChunkName: "AuthLayout" */ "@/modules/dashboard/layouts/DashboardLayout.vue"
    ),
  children: [
    {
      path: "",
      redirect: "/reports",
    },
    {
      path: "/reports",
      name: "reports",
      component: () =>
        import(
          /* webpackChunkName: "reports" */ "@/modules/reports/views/ReportsView.vue"
        ),
    },
    {
      path: "/sales",
      name: "sales",
      component: () =>
        import(
          /* webpackChunkName: "sales" */ "@/modules/sales/views/SalesView.vue"
        ),
    },
    {
      path: "/purchases",
      name: "purchases",
      component: () =>
        import(
          /* webpackChunkName: "purchases" */ "@/modules/purchases/views/PurchasesView.vue"
        ),
    },
  ],
};
