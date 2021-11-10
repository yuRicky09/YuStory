<template>
  <span class="tag one-line" :class="{ big: big }">
    <slot></slot>
    {{ tagName }}
  </span>
</template>

<script>
export default {
  name: "BaseTag",
  props: ["tagName", "big"],
};
</script>

<style lang="scss" scoped>
.tag {
  font-size: 1.2rem;
  display: inline-block;
  padding: 3px 7px;
  margin: 0 6px;
  border-radius: 15px;
  background-color: #969696;
  color: #fff;
  max-width: 20rem;
}

.tag.big {
  padding: 5px 10px;
  font-size: 1.4rem;
}
</style>
