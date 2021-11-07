<template>
  <div>
    <the-navigation></the-navigation>
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
import TheFooter from "@/components/TheFooter.vue";
import { auth } from "@/firebase/config";

export default {
  name: "App",
  components: { TheNavigation, TheFooter },
  created() {
    this.$store.dispatch("story/getAllStories");
    // 有任何auth state change都將觸發(包括註冊 null => new user)
    auth.onAuthStateChanged((user) => {
      this.$store.commit("auth/getCurrentUser", user);
      if (user) {
        // 獲取現在user的資料與草稿
        this.$store.dispatch("auth/getUserData", user.uid);
        this.$store.dispatch("story/getAllDrafts", user.uid);
      }
    });
  },
};
</script>

<style></style>
