import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";

export const createUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed in
        console.log(userCredential);
        console.log(userCredential.user);

        commit("signInUser", {
          user,
        });
        // updateProfile(auth.currentUser, {
        //   displayName: "Jane Q. User",
        //   photoURL: "https://example.com/jane-q-user/profile.jpg",
        // })
        //   .then(() => {
        //     // Profile updated!
        //     // ...
        //   })
      }
    );

    return { ok: true, message: "success" };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const auth = getAuth();

    await setPersistence(auth, browserLocalPersistence);

    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials);
    console.log(userCredentials.user);

    commit("signInUser", {
      user,
    });

    return { ok: true, message: "success" };
  } catch ({ message, code }) {
    return { ok: false, message };
  }
};

export const logoutUser = async ({ commit }) => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      commit("auth/logout");
    })
    .catch((error) => {
      console.log(error);
    });
};

// export const checkAuthentication = async ({ commit }) => {
//   const idToken = localStorage.getItem("idToken");
//   const refreshToken = localStorage.getItem("refreshToken");

//   if (!idToken) {
//     commit("logout");
//     return { ok: false, message: "There's not token" };
//   }

//   try {
//     const { data } = await authApi.post(":lookup", { idToken });
//     const { displayName, email } = data.users[0];
//     const user = { name: displayName, email };
//     commit("signInUser", { user, idToken, refreshToken });
//     return { ok: true };
//   } catch (error) {
//     commit("logout");
//     return { ok: false, message: error.response.data.error.message };
//   }
// };
