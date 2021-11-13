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
      <reply-list :story="currentStory"></reply-list>
      <reply-editor></reply-editor>
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
import { db } from "@/firebase/config";
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
  data() {
    return {
      unsubscribeCurrenyStoryId: null,
    };
  },
  computed: {
    ...mapState("story", {
      currentStory: (state) => state.currentStory,
      currentAuthor: (state) => state.currentAuthor,
    }),
  },
  async created() {
    // 於vuex中dispatch getCurrentAuthor時會同時dispatch getCurrentStory
    await this.$store.dispatch("story/getCurrentAuthor", this.id);

    // 在獲取完currentAuthor與currentStory後，同時監聽currentStory同步每次的更新
    const storyRef = db.collection("stories").doc(this.id);
    this.unsubscribeCurrenyStoryId = storyRef.onSnapshot((doc) => {
      const story = { ...doc.data(), id: doc.id };
      this.$store.commit("story/setCurrentStory", story);
    });
  },
  beforeDestroy() {
    this.$store.commit("story/clearCurrentStory");
    this.unsubscribeCurrenyStoryId();
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
