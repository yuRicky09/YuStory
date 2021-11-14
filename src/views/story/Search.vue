<template>
  <div v-if="matchingStories.length > 0">
    <story-intro-rect
      v-for="story in matchingStories"
      :key="story.id"
      :story="story"
    ></story-intro-rect>
  </div>
  <div v-else>
    <p>查無目標</p>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "Search",
  props: ["search", "type"],
  components: { StoryIntroRect },
  data() {
    return {
      matchingStories: null,
    };
  },
  computed: {
    storires() {
      return this.$store.state.story.stories;
    },
  },
  methods: {
    matchingItems() {
      const regex = new RegExp(this.search, "gi");
      if (this.type === "title" || this.type === "userName") {
        this.matchingStories = this.storires.filter((story) => {
          return regex.test(story[this.type]);
        });
      } else if (this.type === "tags") {
        this.matchingStories = this.storires.filter((story) => {
          const { tags } = story;
          for (let tag of tags) {
            return regex.test(tag);
          }
        });
      }
    },
  },
  watch: {
    search: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.matchingItems();
        }
      },
    },
  },
};
</script>

<style></style>
