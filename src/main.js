import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase/config";

import BaseCard from "@/components/UI/BaseCard.vue";
import BaseModal from "@/components/UI/BaseModal.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

import "@/validation.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/scss/main.scss";

library.add(faUserCircle, faGoogle, faGithub);

Vue.config.productionTip = false;

Vue.component("base-card", BaseCard);
Vue.component("base-modal", BaseModal);
Vue.component("base-spinner", BaseSpinner);
Vue.component("font-awesome-icon", FontAwesomeIcon);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
