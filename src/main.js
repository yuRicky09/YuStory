import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase/config";
import Notifications from "vue-notification";
import AOS from "aos";
import "aos/dist/aos.css";

import BaseCard from "@/components/UI/BaseCard.vue";
import BaseModal from "@/components/UI/BaseModal.vue";
import BaseSpinner from "@/components/UI/BaseSpinner.vue";

import "@/validation.js";
import "@/assets/scss/main.scss";
import "@/fontAwesome.js";

Vue.config.productionTip = false;

Vue.component("base-card", BaseCard);
Vue.component("base-modal", BaseModal);
Vue.component("base-spinner", BaseSpinner);

Vue.use(Notifications);
AOS.init({
  offset: 0,
  duration: 400,
  once: true,
  easing: "ease-in-out",
});

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
