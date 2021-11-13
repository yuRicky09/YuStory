<template>
  <ul class="more-option" :class="{ panelInvisible: panelInvisible }">
    <template v-if="type === 'story' && authorId === userId">
      <li>
        <router-link :to="{ name: 'EditStory', params: { storyId: storyId } }"
          >編輯故事</router-link
        >
      </li>
      <li @click="showModal">
        <span>刪除故事</span>
      </li>
    </template>
    <li v-if="type === 'story' && authorId !== userId">
      <router-link to="#">檢舉故事</router-link>
    </li>
    <template v-if="type === 'draft' && authorId === userId">
      <li>
        <router-link :to="{ name: 'EditDraft', params: { draftId: storyId } }"
          >編輯草稿</router-link
        >
      </li>
      <li @click="showModal">
        <span>刪除草稿</span>
      </li>
    </template>
    <template v-if="type === 'reply'">
      <li
        v-if="userId === authorId || userId === replyUserId"
        @click="deleteReply"
      >
        <span>刪除留言</span>
      </li>
      <li v-if="userId !== replyUserId">
        <router-link to="#">檢舉留言</router-link>
      </li>
    </template>
    <base-modal
      message="確定要刪除此篇故事嗎?"
      :show="show"
      @close-modal="show = false"
    >
      <template #action>
        <button class="modal-action-btn ghost" @click="cancelDelete">
          取消
        </button>
        <button class="modal-action-btn delete" @click="deleteStory">
          刪除
        </button>
      </template>
    </base-modal>
  </ul>
</template>

<script>
import { db } from "@/firebase/config";

export default {
  name: "MoreOptionPenel",
  props: ["authorId", "storyId", "type", "replyUserId", "replyId"],
  data() {
    return {
      show: false,
      panelInvisible: false,
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    notifyText() {
      if (this.type === "story") {
        return "故事";
      } else if (this.type === "draft") {
        return "草稿";
      } else {
        return "留言";
      }
    },
    currentStory() {
      return this.$store.state.story.currentStory;
    },
    replies() {
      return this.currentStory.replies;
    },
  },
  methods: {
    async deleteStory() {
      // 因有監聽realtime update，所以刪除後的變動會被監聽的callback執行，不用透過vuex存取任何變動。
      try {
        if (this.type === "story") {
          await db
            .collection("stories")
            .doc(this.storyId)
            .delete();
        } else if (this.type === "draft") {
          await db
            .collection("drafts")
            .doc(this.storyId)
            .delete();
        }
        this.$emit("close-option-panel");
        this.successfullyDeleted();
      } catch (_) {
        this.$emit("close-option-panel");
        this.failedToDelete();
      }
    },
    async deleteReply() {
      try {
        this.panelInvisible = true;

        const updatedReplies = this.replies.filter(
          // (reply) => reply.id !== this.replyId
          (reply) => {
            console.log(reply, reply.id);
            console.log(this.replyId);
            return reply.id !== this.replyId;
          }
        );
        const storyRef = db.collection("stories").doc(this.currentStory.id);
        await storyRef.update({
          replies: updatedReplies,
        });

        this.$emit("close-option-panel");
        this.successfullyDeleted();
      } catch (err) {
        console.log(err);
        this.$emit("close-option-panel");
        this.failedToDelete();
      }
    },
    cancelDelete() {
      this.show = false;
      this.$emit("close-option-panel");
    },
    successfullyDeleted() {
      this.$notify({
        text: `${this.notifyText}已成功刪除`,
        type: "success",
      });
    },
    failedToDelete() {
      this.$notify({
        text: "很抱歉刪除失敗，請您再嘗試一次",
        type: "error",
      });
    },
    showModal() {
      this.panelInvisible = true;
      this.show = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.more-option {
  position: relative;
  width: 10rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 10px var(--color-layout);
  transition: all 0.2s ease-out;

  &::before {
    content: "";
    position: absolute;
    width: 0px;
    height: 0px;
    border: 5px solid transparent;
    border-top-color: #fff;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  li {
    text-align: center;

    a,
    span {
      display: block;
      padding: 0.5rem;
      cursor: pointer;
      font-size: 1.4rem;

      @media (min-width: $bp-md) {
        padding: 1.2rem 1rem;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
  }

  user-select: none;
}

.more-option.panelInvisible {
  opacity: 0;
}
</style>
