import store from "@/store";

const isAuthenticated = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");
  if (!ok) next({ name: "login" });
  else next();
};

const isAuthenticatedAndConfirmed = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");
  if (!ok) next({ name: "login" });

  const isConfirmed = await store.dispatch("auth/checkConfirmation");
  if (!isConfirmed) next({ name: "user" });
  else next();
};

const isAuthenticatedForLogin = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");
  if (ok) next({ name: "reports" });
  else next();
};

export {
  isAuthenticated,
  isAuthenticatedForLogin,
  isAuthenticatedAndConfirmed,
};
