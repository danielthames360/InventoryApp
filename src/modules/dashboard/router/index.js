export default {
  name: "dashboard",
  component: () =>
    import(
      /* webpackChunkName: "dashboard" */ "@/modules/dashboard/layouts/DashboardLayout.vue"
    ),
  children: [],
};
