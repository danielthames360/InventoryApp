import { createI18n } from "vue-i18n/index.mjs";
import language from "./getLanguage";

import confirmation from "./messages/confirmation";
import validations from "./messages/validations";
import modal from "./messages/modal";
import auth from "./messages/auth";
import dashboard from "./messages/dashboard";

const messages = {
  es: {
    ...confirmation["es"],
    ...validations["es"],
    ...modal["es"],
    ...auth["es"],
    ...dashboard["es"],
  },
  en: {
    ...confirmation["en"],
    ...validations["en"],
    ...modal["en"],
    ...auth["en"],
    ...dashboard["en"],
  },
};
console.log(messages);

export default createI18n({
  //window.navigator.language.split('-')[0] it uses the default browser language
  locale: language,
  fallbackLocale: "en",
  messages,
  allowComposition: true, // you need to specify that!
  //  legacy: false,
});
