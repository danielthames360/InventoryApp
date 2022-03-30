import store from "@/store";

const isAuthenticated = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");
  if (ok) next();
  else next({ name: "login" });
};

const isAuthenticatedForLogin = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");
  if (ok) next({ name: "reports" });
  else next();
};

export { isAuthenticated, isAuthenticatedForLogin };
