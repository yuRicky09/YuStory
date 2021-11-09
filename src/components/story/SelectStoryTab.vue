<template>
  <div class="select-type-area">
    <span @click="selectStory" :class="{ active: itemType === 'story' }"
      >Stories</span
    >
    <span @click="selectDraft" :class="{ active: itemType === 'draft' }"
      >Drafts</span
    >
  </div>
</template>

<script>
export default {
  name: "SelectStoryTab",
  data() {
    return {
      itemType: "story",
    };
  },
  methods: {
    selectStory() {
      this.itemType = "story";
      this.$emit("select-story");
    },
    selectDraft() {
      this.itemType = "draft";
      this.$emit("select-draft");
    },
  },
};
</script>

<style lang="scss" scoped>
.select-type-area {
  margin-top: 1rem;

  span {
    display: inline-block;
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease-out;

    @media (min-width: $bp-md) {
      font-size: 1.6rem;
      padding: 0.8rem 1.5rem;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  span.active {
    background-color: var(--color-bg-dark-2);
    color: #fff;
  }
}
</style>
