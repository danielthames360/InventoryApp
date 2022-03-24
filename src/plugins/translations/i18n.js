import { createI18n } from "vue-i18n/index";

import dashboard from "../translations/messages/dashboard";

const messages = {
  es: {
    ...dashboard["es"],
  },
  en: {
    ...dashboard["en"],
  },
};

export default createI18n({
  //window.navigator.language.split('-')[0] it uses the default browser language
  locale: "es",
  fallbackLocale: "en",
  messages,
});
