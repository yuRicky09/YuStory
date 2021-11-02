<template>
  <div class="container">
    <div class="left-side">
      <aside-user-info :currentAuthor="currentAuthor"></aside-user-info>
    </div>
    <div class="right-side">
      <article>
        <story-header
          :currentAuthor="currentAuthor"
          :title="currentStory.storyTitle"
          :createdAt="currentStory.createdAt"
        ></story-header>
        <div ref="contentStartLine">
          <story-content :storyHTML="currentStory.storyHTML"></story-content>
        </div>
      </article>
      <section>這邊會是尾部 點讚 收藏</section>
      <div>
        <section>顯示留言</section>
        <section>留言組件</section>
      </div>
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
      scrollHeight: null,
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
    await this.fetchCurrentStoryAndAuthor();
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 103rem;
  padding: 5rem 1rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;

  @media (min-width: $bp-md) {
    font-size: 1.6rem;
  }

  @media (min-width: $bp-lg) {
    flex-direction: row;
    justify-content: center;
  }

  .left-side {
    display: none;
    position: relative;

    @media (min-width: $bp-lg) {
      display: block;
      flex-basis: 18%;
    }
  }

  .right-side {
    @media (min-width: $bp-lg) {
      display: block;
      flex-basis: 80rem;
    }
  }
}
</style>
