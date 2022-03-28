import { createI18n } from "vue-i18n/index";

import auth from "./messages/auth";
import dashboard from "./messages/dashboard";

const messages = {
  es: {
    ...auth["es"],
    ...dashboard["es"],
  },
  en: {
    ...auth["en"],
    ...dashboard["en"],
  },
};

export default createI18n({
  //window.navigator.language.split('-')[0] it uses the default browser language
  locale: "es",
  fallbackLocale: "en",
  messages,
  allowComposition: true, // you need to specify that!
  //  legacy: false,
});
