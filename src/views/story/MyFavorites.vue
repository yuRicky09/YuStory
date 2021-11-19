<template>
  <div class="container">
    <div class="favorite-header">
      <h2>
        My Favorites
      </h2>
    </div>
    <div v-if="myFavoriteStories.length > 0">
      <story-intro-rect
        v-for="story in myFavoriteStories"
        :key="story.id"
        :story="story"
      ></story-intro-rect>
    </div>
    <div v-else class="story-empty">
      <p>尚未有任何收藏</p>
    </div>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "MyFavorites",
  components: { StoryIntroRect },
  computed: {
    myFavoriteStories() {
      return this.$store.getters["auth/myFavoriteStories"];
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
      url("~@/assets/img/favorites-bg.jpg")
    );
  }
}
</style>
