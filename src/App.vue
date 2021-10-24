<template>
  <div>
    <the-navigation></the-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
import { auth } from "./firebase/config";

export default {
  name: "App",
  components: { TheNavigation },
  created() {
    // 有任何auth state change都將觸發(包括註冊 null => new user)
    auth.onAuthStateChanged((user) => {
      this.$store.commit("auth/getCurrentUser", user);
      if (user) {
        this.$store.dispatch("auth/getUserData", user.uid);
      }
    });
  },
};
</script>

<style></style>
