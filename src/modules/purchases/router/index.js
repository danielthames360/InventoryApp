export default {
  name: "purchases",
  component: () =>
    import(
      /* webpackChunkName: "purchases" */ "@/modules/purchases/views/PurchasesView.vue"
    ),
  children: [],
};
