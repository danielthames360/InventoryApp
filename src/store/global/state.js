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

export default () => ({
  darkMode: getDarkMode(),
  language: "es",
});
