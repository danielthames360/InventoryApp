import { createStore } from "vuex";

export default createStore({
  state: {
    darkMode: false,
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
