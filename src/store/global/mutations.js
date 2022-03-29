// export const myMutation = (state) => {

// };

export const toggleDarkMode = (state) => {
  state.darkMode = !state.darkMode;
};

export const toggleLanguage = (state) => {
  state.language = state.language == "es" ? "en" : "es";
};
