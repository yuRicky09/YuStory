<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #fff;
  box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  overflow: hidden;
}
</style>
