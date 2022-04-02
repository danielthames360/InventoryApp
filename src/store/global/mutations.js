// export const myMutation = (state) => {

// };

export const setInitialDarkMode = (state, value) => {
  localStorage.setItem("darkMode", value);
  state.darkMode = value;
};

export const setInitialLanguage = (state, value) => {
  localStorage.setItem("language", value);
  state.language = value;
};

export const toggleDarkMode = (state) => {
  localStorage.setItem("darkMode", !state.darkMode);
  state.darkMode = !state.darkMode;
};

export const toggleLanguage = (state) => {
  state.language = state.language == "es" ? "en" : "es";
  localStorage.setItem("language", state.language);
};
