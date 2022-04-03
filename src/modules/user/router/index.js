export default {
  name: "user",
  component: () =>
    import(
      /* webpackChunkName: "ConfirmationView" */ "@/modules/user/views/ConfirmationView.vue"
    ),
  children: [],
};
