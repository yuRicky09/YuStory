<template>
  <div>
    <the-navigation></the-navigation>
    <router-view></router-view>
    <the-footer></the-footer>
    <portal-target name="modal-destination" multiple></portal-target>
    <notifications classes="my-notification" />
    <base-spinner v-if="isLoading"></base-spinner>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
import TheFooter from "@/components/TheFooter.vue";
import { auth } from "@/firebase/config";
import { PortalTarget } from "portal-vue";

export default {
  name: "App",
  components: { TheNavigation, TheFooter, PortalTarget },
  data() {
    return {
      unsubscribeStoryId: null,
      unsubscribeDraftId: null,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.story.isLoading;
    },
  },
  created() {
    // 有任何auth state change都將觸發(包括註冊 null => new user)
    auth.onAuthStateChanged((user) => {
      this.$store.commit("auth/getCurrentUser", user);
      if (user) {
        // 獲取現在user的資料與草稿
        this.$store.dispatch("auth/getUserData", user.uid);
        this.$store.dispatch("story/getAllDrafts", user.uid);
      }
    });
    this.$store.dispatch("story/getAllStories");
  },
  beforeDestroy() {
    this.$store.dispatch("story/unsubscribeAll");
  },
};
</script>

<style lang="scss">
.vue-notification-template.my-notification {
  margin: 20px 5px;
  padding: 22px 24px;
  font-size: 14px;
  color: #ffffff;
  font-weight: 700;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &.success {
    background: #68cd86;
    border-left-color: #4caf4f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
</style>
