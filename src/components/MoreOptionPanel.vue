<template>
  <ul class="more-option">
    <template v-if="type === 'story'">
      <li v-if="storyUserId === userId">
        <router-link to="#">編輯故事</router-link>
      </li>
      <li v-if="storyUserId === userId" @click="show = true">
        <router-link to="#">刪除故事</router-link>
      </li>
    </template>
    <template v-if="type === 'draft'">
      <li v-if="storyUserId === userId">
        <router-link to="#">編輯草稿</router-link>
      </li>
      <li v-if="storyUserId === userId" @click="show = true">
        <router-link to="#">刪除草稿</router-link>
      </li>
    </template>
    <li v-if="storyUserId !== userId">
      <router-link to="#">檢舉故事</router-link>
    </li>
    <base-modal message="確定要刪除此篇故事嗎?" :show="show">
      <template #action>
        <button class="modal-action-btn" @click="deleteStory">確定</button>
        <button class="modal-action-btn ghost" @click="show = false">
          取消
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
    };
  },
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
  },
  methods: {
    async deleteStory() {
      if (this.type === "story") {
        this.$store.dispatch("story/deleteStory", this.storyId);
      } else if (this.type === "draft") {
        await this.$store.dispatch("story/deleteDraft", this.storyId);
        this.show = false;
      }
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

    a {
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
</style>
