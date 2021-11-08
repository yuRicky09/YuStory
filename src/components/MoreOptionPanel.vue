<template>
  <ul class="more-option" :class="{ panelInvisible: panelInvisible }">
    <template v-if="type === 'story'">
      <li v-if="storyUserId === userId">
        <router-link :to="{ name: 'EditStory', params: { storyId: storyId } }"
          >編輯故事</router-link
        >
      </li>
      <li v-if="storyUserId === userId" @click="showModal">
        <span>刪除故事</span>
      </li>
    </template>
    <template v-if="type === 'draft'">
      <li v-if="storyUserId === userId">
        <router-link :to="{ name: 'EditDraft', params: { draftId: storyId } }"
          >編輯草稿</router-link
        >
      </li>
      <li v-if="storyUserId === userId" @click="showModal">
        <span>刪除草稿</span>
      </li>
    </template>
    <li v-if="storyUserId !== userId">
      <router-link to="#">檢舉故事</router-link>
    </li>
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
export default {
  name: "MoreOptionPenel",
  props: ["storyUserId", "storyId", "type"],
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
      return this.type === "story" ? "故事" : "草稿";
    },
  },
  methods: {
    async deleteStory() {
      try {
        await this.$store.dispatch("story/deleteStory", {
          type: this.type,
          storyId: this.storyId,
        });

        this.$notify({
          text: `${this.notifyText}已成功刪除`,
          type: "success",
        });
        this.$emit("close-option-panel");
      } catch (err) {
        this.$notify({
          text: "很抱歉刪除失敗，請您再嘗試一次",
          type: "error",
        });
      }
    },
    cancelDelete() {
      this.show = false;
      this.$emit("close-option-panel");
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
  width: 11rem;
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
      padding: 0.8rem 0.5rem;

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
