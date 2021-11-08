<template>
  <div class="container">
    <div class="left-side">
      <article>
        <story-header
          v-if="currentAuthor && currentStory"
          :currentAuthor="currentAuthor"
          :story="currentStory"
        ></story-header>
        <div ref="contentStartLine">
          <story-content
            v-if="currentStory"
            :storyHTML="currentStory.HTML"
          ></story-content>
        </div>
      </article>
      <section>這邊會是尾部 點讚 收藏</section>
      <div>
        <section>顯示留言</section>
        <section>留言組件</section>
      </div>
    </div>
    <div class="right-side">
      <aside-user-info
        v-if="currentAuthor"
        :currentAuthor="currentAuthor"
      ></aside-user-info>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/config";
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
      currentStory: null,
      currentAuthor: null,
    };
  },
  methods: {
    // 目前覺得當前文章的內容與使用者只會用於此組件與他的子組件，簡單的父傳子並不需要大量共享，所以先存於data有需要再改存vuex
    async fetchCurrentStory() {
      try {
        const res = await db
          .collection("stories")
          .doc(this.id)
          .get();

        const currentStory = res.data();
        this.currentStory = currentStory;
        return currentStory.userId;
      } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
      }
    },
    async fetchCurrentAuthor(userId) {
      try {
        const res = await db
          .collection("users")
          .doc(userId)
          .get();
        const user = res.data();
        this.currentAuthor = user;
      } catch (err) {
        console.log(err.message);
        throw new Error(err.message);
      }
    },
  },
  async created() {
    const userId = await this.fetchCurrentStory();
    this.fetchCurrentAuthor(userId);
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
