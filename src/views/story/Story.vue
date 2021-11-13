<template>
  <div class="container">
    <main class="left-side" v-if="currentAuthor && currentStory">
      <article>
        <story-header
          :currentAuthor="currentAuthor"
          :story="currentStory"
        ></story-header>
        <div ref="contentStartLine">
          <story-content :storyHTML="currentStory.HTML"></story-content>
        </div>
      </article>
      <story-footer></story-footer>
      <reply-list :storyId="id"></reply-list>
      <reply-editor
        :story="currentStory"
        :userProfileImg="userProfileImg"
        :userName="userName"
      ></reply-editor>
    </main>
    <div class="right-side" v-if="currentAuthor && currentStory">
      <aside-user-info
        v-if="currentAuthor"
        :currentAuthor="currentAuthor"
      ></aside-user-info>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import StoryHeader from "@/components/story/StoryHeader.vue";
import StoryContent from "@/components/story/StoryContent.vue";
import StoryFooter from "@/components/story/StoryFooter.vue";
import AsideUserInfo from "@/components/story/AsideUserInfo.vue";
import ReplyEditor from "@/components/story/ReplyEditor.vue";
import ReplyList from "@/components/story/ReplyList.vue";

export default {
  name: "Story",
  props: ["id"],
  components: {
    StoryHeader,
    StoryContent,
    AsideUserInfo,
    StoryFooter,
    ReplyEditor,
    ReplyList,
  },
  computed: {
    ...mapState("story", {
      currentStory: (state) => state.currentStory,
      currentAuthor: (state) => state.currentAuthor,
    }),
    ...mapState("auth", {
      userProfileImg: (state) => state.userProfileImg,
      userName: (state) => state.userName,
    }),
  },
  created() {
    // 於vuex中dispatch getCurrentAuthor時會同時dispatch getCurrentStory
    this.$store.dispatch("story/getCurrentAuthor", this.id);
  },
  beforeDestroy() {
    this.$store.commit("story/clearCurrentStory");
  },
  watch: {
    currentStory(newValue) {
      document.title = newValue.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 80vh;
  max-width: 103rem;
  padding: 5rem 2.5rem;
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
    column-gap: 3rem;
  }

  .left-side {
    @media (min-width: $bp-lg) {
      display: block;
      flex-basis: 80rem;
    }
  }

  .right-side {
    display: none;
    position: relative;

    @media (min-width: $bp-lg) {
      display: block;
      flex-basis: 18%;
    }
  }
}
</style>
