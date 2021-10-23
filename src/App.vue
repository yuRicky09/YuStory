<template>
  <div>
    <the-navigation></the-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";

export default {
  name: "App",
  components: { TheNavigation },
};
</script>

<style lang="scss">
@import "../node_modules/modern-normalize/modern-normalize.css";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Quicksand:wght@300;400;500;600;700&display=swap");

:root {
  --color-gray-1: #292929;
  --color-gray-2: #757575;
  --color-bg-dark-1: #191919;
  --color-bg-dark-2: #303030;
  --color-bg-gray-1: #f2f2f2;
}

* {
  font-family: "Quicksand", "Noto Sans TC", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
  list-style: none;
  text-decoration: none;
}

a {
  color: #000;
}

img {
  max-width: 100%;
}
</style>
