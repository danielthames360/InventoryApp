export default {
  name: "auth",
  component: () =>
    import(
      /* webpackChunkName: "AuthLayout" */ "@/modules/auth/layouts/AuthLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "login",
      component: () =>
        import(
          /* webpackChunkName: "Login" */ "@/modules/auth/views/LoginView.vue"
        ),
    },
  ],
};
