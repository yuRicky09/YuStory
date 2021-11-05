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
  padding: 2px 5px;
  margin: 0 5px;
  border-radius: 15px;
  background-color: #969696;
  color: #fff;
}
</style>
