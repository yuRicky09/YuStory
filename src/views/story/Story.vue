<template>
  <div class="container">
    <article class="story-wrapper">
      <div class="top">
        <story-header
          v-if="currentAuthor"
          :currentAuthor="currentAuthor"
          :title="currentStory.storyTitle"
          :createdAt="currentStory.createdAt"
        ></story-header>
        <story-content :storyHTML="currentStory.storyHTML"></story-content>
        <aside-user-info></aside-user-info>
      </div>
      <section class="story-content"></section>
    </article>
    <section>這邊會是尾部 點讚 收藏</section>
    <div>
      <section>顯示留言</section>
      <section>留言組件</section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StoryHeader from "@/components/story/StoryHeader.vue";
import StoryContent from "@/components/story/StoryContent.vue";
import AsideUserInfo from "@/components/story/AsideUserInfo.vue";

export default {
  name: "Story",
  props: ["id"],
  components: { StoryHeader, StoryContent, AsideUserInfo },
  data() {
    return {
      showEditor: false,
    };
  },
  computed: {
    ...mapState("story", {
      currentStory: (state) => state.currentStory,
      currentAuthor: (state) => state.currentAuthor,
    }),
  },
  methods: {
    async fetchCurrentStoryAndAuthor() {
      this.$store.dispatch("story/fetchCurrentStory", this.id);
    },
  },
  async created() {
    this.fetchCurrentStoryAndAuthor();
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 103rem;
  padding: 5rem 1rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;

  @media (min-width: $bp-md) {
    font-size: 1.6rem;
  }
}
</style>
