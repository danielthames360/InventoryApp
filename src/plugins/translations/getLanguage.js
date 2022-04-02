import store from "@/store";

const currentLanguage = localStorage.getItem("language");
if (!currentLanguage) {
  store.commit(
    "global/setInitialLanguage",
    window.navigator.language.split("-")[0]
  );
} else {
  store.commit("global/setInitialLanguage", currentLanguage);
}

const getLanguage = store.getters["global/getLanguage"];
export default getLanguage;
