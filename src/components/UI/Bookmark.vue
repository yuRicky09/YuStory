<template>
  <span class="bookmark">
    <font-awesome-icon
      :icon="['far', 'bookmark']"
      @click="addToFavorites"
      v-if="!favorited && userId && userId !== story.userId"
    />
    <font-awesome-icon
      :icon="['fa', 'bookmark']"
      @click="removeFromFavorites"
      v-if="favorited && userId && userId !== story.userId"
    />
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Bookmark",
  props: ["story"],
  computed: {
    ...mapState("auth", {
      userId: (state) => state.userId,
      favorites: (state) => state.favorites,
    }),
    // 判斷此故事id key值，為true則顯示已收藏mark，反之顯示未收藏。
    favorited() {
      return this.favorites[`${this.story.id}`] ? true : false;
    },
  },
  methods: {
    async addToFavorites() {
      try {
        await this.$store.dispatch("auth/addToFavorites", this.story.id);
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
        await this.$store.dispatch("auth/removeFromFavorites", this.story.id);
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
  > svg {
    width: 2.5rem;
    height: 2.5rem;
    margin: 3px;
    padding: 4px;
    cursor: pointer;
  }
}
</style>
