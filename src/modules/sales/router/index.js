export default {
  name: "sales",
  component: () =>
    import(
      /* webpackChunkName: "sales" */ "@/modules/sales/views/SalesView.vue"
    ),
  children: [],
};
