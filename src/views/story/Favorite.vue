<template>
  <div v-if="myFavoriteStories">
    <story-intro-rect
      v-for="story in myFavoriteStories"
      :key="story.id"
      :story="story"
    ></story-intro-rect>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "Favorite",
  components: { StoryIntroRect },
  computed: {
    myFavoriteStories() {
      return this.$store.getters["auth/myFavoriteStories"];
    },
  },
};
</script>

<style></style>
