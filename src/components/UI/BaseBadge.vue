<template>
  <span class="badge">
    <font-awesome-icon :icon="['fa', 'times']" @click="deleteTag" />
    {{ tagName }}
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: ["tagName"],
  methods: {
    deleteTag() {
      this.$emit("delete-tag", this.tagName);
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  font-size: 1.2rem;
  display: inline-block;
  padding: 0.5rem 0.8rem;
  margin: 0 0.8rem;
  border-radius: 15px;
  background-color: var(--color-bg-gray-2);

  > svg {
    cursor: pointer;
  }
}
</style>
