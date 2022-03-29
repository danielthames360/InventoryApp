import { createI18n } from "vue-i18n/index";

import validations from "./messages/validations";
import auth from "./messages/auth";
import dashboard from "./messages/dashboard";

const messages = {
  es: {
    ...validations["es"],
    ...auth["es"],
    ...dashboard["es"],
  },
  en: {
    ...validations["en"],
    ...auth["en"],
    ...dashboard["en"],
  },
};
console.log(messages);

export default createI18n({
  //window.navigator.language.split('-')[0] it uses the default browser language
  locale: window.navigator.language.split("-")[0],
  fallbackLocale: "en",
  messages,
  allowComposition: true, // you need to specify that!
  //  legacy: false,
});
