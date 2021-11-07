<template>
  <ul class="more-option">
    <template v-if="type === 'story'">
      <li v-if="storyUserId === userId">
        <router-link to="#">編輯故事</router-link>
      </li>
      <li v-if="storyUserId === userId">
        <router-link to="#">刪除故事</router-link>
      </li>
    </template>
    <template v-if="type === 'draft'">
      <li v-if="storyUserId === userId">
        <router-link to="#">編輯草稿</router-link>
      </li>
      <li v-if="storyUserId === userId">
        <router-link to="#">刪除草稿</router-link>
      </li>
    </template>
    <li v-if="storyUserId !== userId">
      <router-link to="#">檢舉故事</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MoreOptionPenel",
  props: ["storyUserId", "type"],
  computed: {
    userId() {
      return this.$store.state.auth.userId;
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
