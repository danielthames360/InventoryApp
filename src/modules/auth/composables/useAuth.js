import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  const createUser = async (user) => {
    return await store.dispatch("auth/createUser", user);
  };

  const signInUser = async (user) => {
    return await store.dispatch("auth/signInUser", user);
  };

  const checkAuthStatus = async () => {
    return await store.dispatch("auth/checkAuthentication");
  };

  const logout = async () => {
    return await store.dispatch("auth/logout");
  };

  return {
    authStatus: computed(() => store.getters["auth/currentState"]),
    userName: computed(() => store.getters["auth/userName"]),

    checkAuthStatus,
    createUser,
    logout,
    signInUser,
  };
};

export default useAuth;
