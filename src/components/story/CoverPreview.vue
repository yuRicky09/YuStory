<template>
  <div>
    <div class="backdrop" @click="$emit('close-cover')"></div>
    <div class="cover-wrapper">
      <img :src="storyCoverURL" alt="story-cover" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CoverPreview",
  props: ["storyCoverURL"],
};
</script>

<style lang="scss" scoped>
.cover-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80rem;
  height: 40rem;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 5px 10px var(--color-layout);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
