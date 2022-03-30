import { createStore } from "vuex";

import global from "./global";
import auth from "../modules/auth/store";

export default createStore({
  modules: {
    global,
    auth,
  },
});
