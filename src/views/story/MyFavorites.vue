<template>
  <div class="container">
    <div class="favorite-header">
      <h2>
        My Favorites
      </h2>
    </div>
    <template v-if="myFavoriteStories.length > 0">
      <story-intro-rect
        v-for="story in currentPageFavoriteStories"
        :key="story.id"
        :story="story"
      ></story-intro-rect>
      <pagination
        :totalItems="myFavoriteStories.length"
        :page="currentPage"
        :itemPerPage="itemPerPage"
      ></pagination>
    </template>
    <div v-else class="story-empty">
      <p>尚未有任何收藏</p>
    </div>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";

export default {
  name: "MyFavorites",
  components: { StoryIntroRect, Pagination },
  mixins: [paginationMixin],
  computed: {
    myFavoriteStories() {
      return this.$store.getters["auth/myFavoriteStories"];
    },
    currentPageFavoriteStories() {
      return this.myFavoriteStories.slice(
        this.pageFirstIndex,
        this.pageLastIndex
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 102rem;
  margin: auto;
  padding: 6rem 2rem;

  .favorite-header {
    h2 {
      font-size: 2.6rem;

      @media (min-width: $bp-md) {
        font-size: 3.6rem;
      }
    }
  }

  .story-empty {
    background-image: (
      linear-gradient(to left bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),
      url("~@/assets/img/my-favorite-bg.jpg")
    );
  }
}
</style>
