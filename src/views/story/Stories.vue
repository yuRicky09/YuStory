<template>
  <div class="container">
    <main class="left-side">
      <article class="story-list" v-if="stories">
        <story-intro-rect
          v-for="story in stories"
          :story="story"
          :key="story.id"
        ></story-intro-rect>
      </article>
    </main>
    <aside class="right-side"></aside>
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
  margin: auto;

  .left-side {
    max-width: 75rem;
  }

  .right-side {
    display: none;

    @media (min-width: $bp-lg) {
      display: block;
      max-width: 35rem;
    }
  }
}
</style>
