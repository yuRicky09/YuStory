import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import story from "./modules/stroy";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    story,
  },
});
