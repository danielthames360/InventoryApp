import { createApp } from "vue";

import i18n from "@/plugins/translations/i18n";

import router from "./router";
import store from "./store";

import App from "./App.vue";

import "@/styles/index.css";
import "@/api/firebase";

createApp(App).use(store).use(router).use(i18n).mount("#app");
