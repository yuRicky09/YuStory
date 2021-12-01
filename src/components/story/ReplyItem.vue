<template>
  <li class="reply-item">
    <router-link
      class="to-author-link"
      :to="{
        name: 'Users',
        params: { userId: reply.userId },
        query: { page: 1 },
      }"
    >
      <img class="user-avatar" :src="reply.userProfileImg" alt="user-avatar" />
    </router-link>
    <div class="reply-info">
      <span class="reply-name">{{ reply.userName }}</span>
      <span class="reply-time">{{ createdTime(reply.createdAt) }}</span>
      <p v-html="reply.HTML"></p>
    </div>
    <div class="backdrop" @click="showPanel = false" v-if="showPanel"></div>
    <div class="option-panel-position">
      <more-option-panel
        v-if="showPanel"
        :replyId="reply.id"
        :replyUserId="reply.userId"
        :authorId="authorId"
        type="reply"
        @close-option-panel="showPanel = false"
      ></more-option-panel>
    </div>
    <font-awesome-icon
      class="more-option-icon"
      :icon="['fa', 'ellipsis-v']"
      @click="showPanel = true"
      v-if="currentUser"
    ></font-awesome-icon>
  </li>
</template>

<script>
import MoreOptionPanel from "@/components/UI/MoreOptionPanel.vue";
import { timeFormatMixin } from "@/mixins/timeFormatMixin";

export default {
  name: "ReplyItem",
  props: ["reply", "authorId"],
  mixins: [timeFormatMixin],
  components: { MoreOptionPanel },
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.reply-item {
  position: relative;
  display: flex;
  gap: 1rem;
  padding: 1.2rem 1.5rem;

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

  .more-option-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.2rem;
    height: 2.2rem;
    margin: 3px;
    padding: 4px;
    cursor: pointer;
  }

  .backdrop {
    background-color: transparent;
  }

  .option-panel-position {
    position: absolute;
    z-index: 1000;
    transform: translateY(-100%);
    right: -2.6rem;
    top: 0.5rem;
  }
}
</style>
