<template>
  <div class="container">
    <main>
      <article v-if="stories">
        <story-intro-rect
          v-for="story in stories"
          :story="story"
          :key="story.id"
        ></story-intro-rect>
      </article>
    </main>
    <aside></aside>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "Stories",
  components: { StoryIntroRect },
  computed: {
    stories() {
      return this.$store.state.story.stories;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 144rem;
}
</style>
