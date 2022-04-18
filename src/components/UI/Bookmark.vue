<template>
  <span class="bookmark">
    <font-awesome-icon
      :icon="['far', 'bookmark']"
      class="action-icon"
      title="收藏"
      @click="addToFavorites"
      v-if="!favorited && userId"
    />
    <font-awesome-icon
      :icon="['fa', 'bookmark']"
      class="action-icon"
      title="取消收藏"
      @click="removeFromFavorites"
      v-else-if="favorited && userId"
    />
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Bookmark",
  props: ["currentStory"],
  computed: {
    ...mapState("auth", {
      userId: (state) => state.userId,
      favorites: (state) => state.favorites,
    }),
    // 判斷此故事id key值，為true則顯示已收藏mark，反之顯示未收藏。
    favorited() {
      return this.favorites[`${this.currentStory.id}`] ? true : false;
    },
  },
  methods: {
    async addToFavorites() {
      try {
        await this.$store.dispatch("auth/addToFavorites", this.currentStory.id);
        this.$notify({
          text: "已將此故事加入我的收藏",
          type: "success",
        });
      } catch (_) {
        this.$notify({
          text: "添加收藏失敗，請再添加一次",
          type: "error",
        });
      }
    },
    async removeFromFavorites() {
      try {
        await this.$store.dispatch(
          "auth/removeFromFavorites",
          this.currentStory.id
        );
        this.$notify({
          text: "已將此故事從我的收藏移除",
        });
      } catch (_) {
        this.$notify({
          text: "移除收藏失敗，請再移除一次",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bookmark {
  display: flex;

  > svg {
    &:hover,
    &:active {
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    }

    &:active {
      background-color: rgba(0, 0, 0, 0.15);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
