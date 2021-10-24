<template>
  <div class="backdrop">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: "BaseSpinner",
};
</script>

<style lang="scss" scoped>
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 6rem;
    height: 6rem;
    border: 10px solid var(--color-bg-gray-1);
    border-top-color: var(--color-bg-white-1);
    border-bottom-color: var(--color-bg-white-1);
    border-radius: 50%;
    position: relative;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
