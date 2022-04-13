<template>
  <span @click="$emit('set-selected-tab', text)">{{ text }}</span>
</template>

<script>
export default {
  name: "BaseTab",
  props: ["text"],
};
</script>

<style lang="scss" scoped>
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
  background-color: var(--color-dark-2);
  color: #fff;
}
</style>
