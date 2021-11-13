<template>
  <section class="reply-wrapper" v-if="replies.length > 0">
    <h4 class="heading">Comment</h4>
    <ul class="reply-list">
      <reply-item
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
      ></reply-item>
    </ul>
  </section>
</template>

<script>
import { db } from "@/firebase/config";
import ReplyItem from "@/components/story/ReplyItem";

export default {
  name: "ReplyList",
  props: ["storyId"],
  data() {
    return {
      replies: [],
      unsubscribeId: null,
      showPanel: false,
    };
  },
  components: { ReplyItem },
  created() {
    //! 明天將監聽移至上層story， 當story doc有任何更動就執行getCurrentStory來更新 抱持資料是最新的
    const storyRef = db.collection("stories").doc(this.storyId);
    this.unsubscribeId = storyRef.onSnapshot((doc) => {
      const replies = [];
      const story = doc.data();

      if (story.replies === undefined) return;
      story.replies.forEach((reply) => replies.push(reply));
      this.replies = replies;
    });
  },
  beforeDestroy() {
    this.unsubscribeId();
  },
};
</script>

<style lang="scss" scoped>
.reply-wrapper {
  margin: 1rem 0 2rem;
  background-color: #fafafa;
  font-size: 1.4rem;

  .heading {
    color: #fff;
    font-size: 2rem;
    background-color: var(--color-bg-dark-2);
    padding: 1rem 2rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}
</style>
