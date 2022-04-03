import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
  onAuthStateChanged,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const auth = getAuth();

    await setPersistence(auth, browserLocalPersistence);

    const { displayName, photoURL } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    commit("signInUser", { user: { email, displayName, photoURL } });

    return { ok: true, message: "success" };
  } catch ({ message, code }) {
    return { ok: false, message, code };
  }
};

export const createUser = async ({ commit }, user) => {
  const { email, name, password } = user;
  try {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);

    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: name,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    });

    commit("signInUser", { user: { email, displayName: name } });

    setInternalUser({ id: auth.currentUser.uid, email: email });

    return { ok: true, message: "success" };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInWithGoogle = async ({ commit }) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, browserLocalPersistence);

  try {
    const response = await signInWithPopup(auth, provider);
    if (response.user) {
      commit("signInUser", {
        user: {
          email: response.user.email,
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
        },
      });

      setInternalUser({ id: response.user.uid, email: response.user.email });

      return { ok: true, message: "success" };
    } else {
      return { ok: true, message: "error" };
    }
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInWithFacebook = async ({ commit }) => {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  await setPersistence(auth, browserLocalPersistence);

  try {
    const response = await signInWithPopup(auth, provider);
    if (response.user) {
      commit("signInUser", {
        user: {
          email: response.user.email,
          displayName: response.user.displayName,
          photoURL: response.user.photoURL,
        },
      });

      setInternalUser({ id: response.user.uid, email: response.user.email });

      return { ok: true, message: "success" };
    } else {
      return { ok: true, message: "error" };
    }
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const logout = async ({ commit }) => {
  const auth = getAuth();
  const resp = await new Promise((resolve) => {
    signOut(auth)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
  if (resp) {
    commit("logout");
    return { ok: true };
  } else {
    return { ok: false };
  }
};

export const checkAuthentication = async ({ commit }) => {
  const auth = getAuth();
  let localUser = null;
  const resp = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        localUser = { displayName, email, photoURL };
        resolve(true);
      } else {
        resolve(false);
      }
      unsubscribe();
    });
  });

  if (resp) {
    commit("signInUser", {
      user: localUser,
    });
    return { ok: true };
  } else {
    return { ok: false };
  }
};

export const checkConfirmation = async () => {
  const auth = getAuth();
  const db = getFirestore();
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return false;

  const { isConfirmed } = docSnap.data();
  return isConfirmed;
};

const setInternalUser = async (user) => {
  const db = getFirestore();

  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "users", user.id), {
      isConfirmed: false,
      email: user.email,
    });
  }
};
