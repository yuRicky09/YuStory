<template>
  <div v-if="myStories.length > 0">
    <story-intro-rect
      v-for="story in myStories"
      :key="story.id"
      :story="story"
    ></story-intro-rect>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "MyStorise",
  components: { StoryIntroRect },
  computed: {
    ...mapGetters("story", ["myStories"]),
  },
};
</script>

<style></style>
