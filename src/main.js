import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseCard from "@/components/UI/BaseCard.vue";
import BaseModal from "@/components/UI/BaseModal.vue";

import "@/validation.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUser);

Vue.config.productionTip = false;

Vue.component("base-card", BaseCard);
Vue.component("base-modal", BaseModal);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
