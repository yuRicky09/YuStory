<template>
  <div class="sidebox">
    <div class="sidebox-header">{{ title }}</div>
    <div class="sidebox-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBox",
  props: ["title"],
};
</script>

<style lang="scss" scoped>
.sidebox {
  box-shadow: 0 10px 20px var(--color-layout);

  .sidebox-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: var(--color-bg-dark-3);
    padding: 1rem 2rem;
    font-size: 1.6rem;
    text-align: center;
    color: #fff;
  }

  .sidebox-body {
    padding: 12px 7px;
  }
}
</style>
