// export const myMutation = (state) => {

import { getAuth } from "firebase/auth";

// };

export const setUser = (state) => {
  const auth = getAuth();
  console.log(auth.currentUser);
  // Wrap the vue instance in a Firebase onAuthStateChanged method
  // This stops the execution of the navigation guard 'beforeEach'
  // method until the Firebase initialization ends
  auth.onAuthStateChanged(() => {
    state.user2 = auth.currentUser;
  });
  console.log(state.user2);

  // createApp(App).use(store).use(router).use(i18n).mount("#app");
};

export const signInUser = (state, { user }) => {
  state.user = user;
  state.status = "authenticated";
};

export const logout = (state) => {
  state.user = null;
  state.status = "not-authenticated";
};
