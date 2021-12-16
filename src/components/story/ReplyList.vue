<template>
  <section class="reply-wrapper" v-if="replies && replies.length > 0">
    <h4 class="heading">Comment</h4>
    <ul class="reply-list">
      <reply-item
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
        :authorId="currentStory.userId"
      ></reply-item>
    </ul>
  </section>
</template>

<script>
import { db } from "@/firebase/config";
import ReplyItem from "@/components/story/ReplyItem";

export default {
  name: "ReplyList",
  props: ["currentStory"],
  components: { ReplyItem },
  data() {
    return {
      replies: null,
      showPanel: false,
      unsubscribeStoryRepliesId: null,
    };
  },
  created() {
    // 監聽此story的子集合replies的所有增刪改，使對此文章的留言能即時更新。
    const storyRepliesRef = db
      .collection("stories")
      .doc(this.currentStory.id)
      .collection("replies")
      .orderBy("createdAt", "asc");

    this.unsubscribeStoryRepliesId = storyRepliesRef.onSnapshot((snapshot) => {
      const replies = [];
      snapshot.docs.forEach((doc) => {
        const reply = { ...doc.data(), id: doc.id };
        replies.push(reply);
      });

      this.replies = replies;
    });
  },
  beforeDestroy() {
    this.unsubscribeStoryRepliesId();
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
    background-color: var(--color-dark-2);
    padding: 1rem 2rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}
</style>
