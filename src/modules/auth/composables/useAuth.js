import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () => {
  const store = useStore();

  const signInUser = async (user) => {
    return await store.dispatch("auth/signInUser", user);
  };

  const createUser = async (user) => {
    return await store.dispatch("auth/createUser", user);
  };

  const signInWithGoogle = async () => { 
    return await store.dispatch("auth/signInWithGoogle");
  };

  const signInWithFacebook = async () => {
    return await store.dispatch("auth/signInWithFacebook");
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

    signInUser,
    createUser,
    signInWithGoogle,
    signInWithFacebook,
    checkAuthStatus,
    logout,
  };
};

export default useAuth;
