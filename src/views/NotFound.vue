<template>
  <div class="not-found">
    <h2><span>404</span> PAGE NOT FOUND</h2>
    <p>很抱歉，查找不到您搜尋的頁面</p>
    <img src="@/assets/img/not-found.jpg" alt="not-found" />
    <router-link :to="{ name: 'Home' }" class="btn">回首頁</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.not-found {
  max-width: 80rem;
  font-size: 1.6rem;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;

  > img {
    max-width: 100%;
    object-fit: cover;
    object-position: center center;
  }

  > h2 {
    font-size: 2.5rem;

    @media (min-width: $bp-md) {
      font-size: 4rem;
    }

    span {
      color: #e74c4cef;
    }
  }
}
</style>
