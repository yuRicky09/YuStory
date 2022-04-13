<template>
  <span class="tag" :class="[tagClass]">
    <slot></slot>
    {{ tagName }}
  </span>
</template>

<script>
export default {
  name: "BaseTag",
  props: ["tagName", "tagClass"],
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

.tag.home {
  padding: 1.5rem 4rem;
  margin: 0 1rem;
  font-size: 1.6rem;
  border-radius: 0px;
}
</style>
