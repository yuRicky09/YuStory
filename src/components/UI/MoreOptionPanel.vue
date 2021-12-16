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
    <li v-if="type === 'story' && authorId !== userId" @click="showReportModal">
      <span>檢舉故事</span>
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
    <!-- 作者可任意刪除自己文章下的任意留言， 回文者只能刪除自己的回文 -->
    <template v-if="type === 'reply'">
      <li
        v-if="userId === authorId || userId === replyUserId"
        @click="deleteReply"
      >
        <span>刪除留言</span>
      </li>
      <li v-if="userId !== replyUserId" @click="showReportModal">
        <span>檢舉留言</span>
      </li>
    </template>
    <base-modal
      message="確定要刪除此篇故事嗎?"
      :show="show"
      @close-modal="show = false"
    >
      <template #action>
        <button class="btn modal-action-btn ghost" @click="cancelDelete">
          取消
        </button>
        <button class="btn modal-action-btn delete" @click="deleteStory">
          刪除
        </button>
      </template>
    </base-modal>
    <report-modal
      v-if="showReport"
      @close-report-modal="showReport = false"
      @report="report"
    ></report-modal>
  </ul>
</template>

<script>
import { db } from "@/firebase/config";
import ReportModal from "@/components/UI/ReportModal.vue";

export default {
  name: "MoreOptionPenel",
  props: ["authorId", "storyId", "type", "replyUserId", "replyId"],
  components: { ReportModal },
  data() {
    return {
      show: false,
      panelInvisible: false,
      showReport: false,
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
  },
  methods: {
    async deleteStory() {
      // 因有監聽realtime update，所以刪除後的變動會被監聽的callback執行，這邊不用再透過vuex存取任何變動。
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

        // 在story頁面刪除文章的話，跳轉到所有文章頁面
        if (this.$route.name === "Story") {
          this.$router.replace({ name: "Stories", query: { page: 1 } });
        } else {
          this.$emit("close-option-panel");
          this.successfullyDeleted();
        }
      } catch (err) {
        console.log(err.message);
        this.$emit("close-option-panel");
        this.failedToDelete();
      }
    },
    async deleteReply() {
      try {
        this.panelInvisible = true;

        await db
          .collection("stories")
          .doc(this.currentStory.id)
          .collection("replies")
          .doc(this.replyId)
          .delete();

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
    showReportModal() {
      this.panelInvisible = true;
      this.showReport = true;
    },
    report(reasone) {
      this.$notify({
        text: `已收到檢舉，將會依照${reasone}此理由查證是否有違規之舉。`,
      });
      this.showReport = false;
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
  box-shadow: 0 5px 10px var(--color-shadow);
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
