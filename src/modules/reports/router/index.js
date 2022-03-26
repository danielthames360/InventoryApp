export default {
  name: "reports",
  component: () =>
    import(
      /* webpackChunkName: "reports" */ "@/modules/reports/views/ReportsView.vue"
    ),
  children: [],
};
