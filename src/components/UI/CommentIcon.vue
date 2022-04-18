<template>
  <div class="comment-icon">
    <a href="#" @click.prevent="moveToReplyEditor">
      <font-awesome-icon
        class="action-icon"
        :icon="['far', 'comment']"
        title="留言"
      />
      <span v-if="replyNum">{{ replyNum }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "CommentIcon",
  computed: {
    replyNum() {
      return this.$store.state.story.replyNum;
    },
  },
  methods: {
    moveToReplyEditor() {
      document.querySelector("#reply").scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-icon {
  a {
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover svg,
    &:hover span,
    &:active svg,
    &:hover span {
      background-color: rgba(29, 155, 240, 0.1);
      color: rgb(29, 155, 240);
      box-shadow: 0 0 10px rgba(29, 155, 240, 0.1);
      border-radius: 50%;
    }

    &:active svg,
    &:active span {
      background-color: rgba(29, 155, 240, 0.1);
      box-shadow: 0 0 10px rgba(29, 155, 240, 0.1);
    }
  }
}
</style>
