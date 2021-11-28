<template>
  <div class="select-type-area">
    <span
      @click="selectOptionOne"
      :class="{ active: itemType === 'optionOne' }"
      >{{ optionOne }}</span
    >
    <span
      @click="selectOptionTwo"
      :class="{ active: itemType === 'optionTwo' }"
      >{{ optionTwo }}</span
    >
  </div>
</template>

<script>
export default {
  name: "SelectTab",
  props: ["optionOne", "optionTwo"],
  data() {
    return {
      itemType: "optionOne",
    };
  },
  methods: {
    selectOptionOne() {
      this.itemType = "optionOne";
      this.$emit("select-option-one");
    },
    selectOptionTwo() {
      this.itemType = "optionTwo";
      this.$emit("select-option-two");
    },
  },
};
</script>

<style lang="scss" scoped>
.select-type-area {
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
