<template>
  <section class="reply-wrapper">
    <h3>Comment</h3>
    <ul class="reply-list" v-for="reply in replies" :key="reply.id">
      <li class="reply-item">
        <img
          class="user-avatar"
          :src="reply.userProfileImg"
          alt="user-avatar"
        />
        <div class="reply-info">
          <span class="reply-name">{{ reply.userName }}</span>
          <span class="reply-time">{{ createdTime(reply.createdAt) }}</span>
          <p v-html="reply.HTML"></p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { db } from "@/firebase/config";
import moment from "moment";

export default {
  name: "ReplyList",
  props: ["storyId"],
  data() {
    return {
      replies: null,
      unsubscribeId: null,
    };
  },
  methods: {
    createdTime(timestamp) {
      moment.locale("zh-cn");
      return moment(timestamp).format("lll");
    },
  },
  created() {
    const storyRef = db.collection("stories").doc(this.storyId);
    this.unsubscribeId = storyRef.onSnapshot((story) => {
      const replies = [];
      story.data().replies.forEach((reply) => replies.push(reply));
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
  margin-top: 1rem;
  background-color: #fafafa;
  font-size: 1.4rem;

  .reply-list {
    padding: 0.8rem 1rem;

    .reply-item {
      display: flex;
      gap: 1rem;

      &:hover {
        background-color: #f0f0f0;
      }

      .user-avatar {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
      }

      .reply-info {
        padding: 0 4rem 0 0;
        flex: 1;

        > span {
          display: inline-block;
          margin-right: 0.5rem;
          font-size: 1.3rem;
        }

        .reply-name {
          font-weight: 700;
        }

        .reply-time {
          color: var(--color-bg-gray-1);
        }
      }
    }
  }
}
</style>
