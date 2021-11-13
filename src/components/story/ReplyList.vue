<template>
  <section class="reply-wrapper" v-if="story.replies.length > 0">
    <h4 class="heading">Comment</h4>
    <ul class="reply-list">
      <reply-item
        v-for="reply in story.replies"
        :key="reply.id"
        :reply="reply"
        :authorId="story.userId"
      ></reply-item>
    </ul>
  </section>
</template>

<script>
import ReplyItem from "@/components/story/ReplyItem";

export default {
  name: "ReplyList",
  props: ["story"],
  data() {
    return {
      showPanel: false,
    };
  },
  components: { ReplyItem },
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
