<template>
  <div class="heart">
    <font-awesome-icon
      :icon="['far', 'heart']"
      class="action-icon"
      title="喜歡"
      @click="like"
      v-if="!liked && userId"
    />
    <font-awesome-icon
      :icon="['fa', 'heart']"
      class="action-icon liked"
      title="取消喜歡"
      @click="unlike"
      v-if="liked && userId"
    />
    <span v-if="currentStory.hearts.length > 0">
      {{ currentStory.hearts.length }}
    </span>
  </div>
</template>

<script>
import { db, arrayUnion, arrayRemove } from "@/firebase/config";

export default {
  name: "HeartIcon",
  props: ["currentStory"],
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    liked() {
      return this.currentStory.hearts.includes(this.userId);
    },
  },
  methods: {
    async like() {
      try {
        await db
          .collection("stories")
          .doc(this.currentStory.id)
          .update({
            hearts: arrayUnion(this.userId),
          });
      } catch (err) {
        console.log(err);
      }
    },
    async unlike() {
      try {
        await db
          .collection("stories")
          .doc(this.currentStory.id)
          .update({
            hearts: arrayRemove(this.userId),
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.heart {
  display: flex;
  align-items: center;

  &:hover svg,
  &:hover span {
    background-color: rgba(249, 24, 128, 0.1);
    box-shadow: 0 0 10px rgba(249, 24, 128, 0.1);
    color: rgb(249, 24, 128);
    border-radius: 50%;
  }

  &:active svg,
  &:active span {
    background-color: rgba(249, 24, 128, 0.15);
    box-shadow: 0 0 10px rgba(249, 24, 128, 0.15);
  }

  .liked {
    color: rgb(249, 24, 128);
  }
}
</style>
