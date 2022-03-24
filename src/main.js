import { createApp } from "vue";
import i18n from "@/plugins/translations/i18n";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.css";

createApp(App).use(store).use(router).use(i18n).mount("#app");
