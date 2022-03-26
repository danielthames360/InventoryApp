import { createStore } from "vuex";

const getDarkMode = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return true;
  } else {
    return false;
  }
};

export default createStore({
  state: {
    darkMode: getDarkMode(),
    language: "es",
  },
  getters: {
    getDarkModeStatus(state) {
      return state.darkMode;
    },
    getLanguage(state) {
      return state.language;
    },
  },
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    toggleLanguage(state) {
      state.language = state.language == "es" ? "en" : "es";
    },
  },
  actions: {},
  modules: {},
});
