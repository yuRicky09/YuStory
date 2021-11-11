<template>
  <span class="tag" :class="{ big: big, rect: rect }">
    <slot></slot>
    {{ tagName }}
  </span>
</template>

<script>
export default {
  name: "BaseTag",
  props: ["tagName", "big", "rect"],
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
}

.tag.big {
  padding: 5px 10px;
  font-size: 1.4rem;
}

.tag.rect {
  padding: 0.7rem 1.8rem;
  border-radius: 5px;
}
</style>
