<template>
  <span class="tag">
    <slot></slot>
    {{ tagName }}
  </span>
</template>

<script>
export default {
  name: "BaseTag",
  props: ["tagName"],
};
</script>

<style lang="scss" scoped>
.tag {
  font-size: 1.2rem;
  display: inline-block;
  padding: 0.5rem;
  margin: 0 0.5rem;
  border-radius: 15px;
  background-color: var(--color-bg-gray-2);
}
</style>
