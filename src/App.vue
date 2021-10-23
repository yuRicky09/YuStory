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
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

:root {
  --color-gray-1: #292929;
  --color-gray-2: #757575;
  --color-bg-dark-1: #191919;
  --color-bg-dark-2: #1f2937;
  --color-bg-dark-3: #303030;
  --color-bg-gray-1: #f2f2f2;
}

html {
  font-size: 62.5%;
}

* {
  font-family: "Quicksand", sans-serif;
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

.container {
  max-width: 1440px;
  margin: auto;
}

input {
  width: 100%;
  padding: 10px 15px 10px 25px;
  border: 2px solid #e2e2e2;
  border-radius: 3px;
}

input:focus {
  outline: none;
  border: 2px solid #727171;
}

button {
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  color: #fff;
  background-color: var(--color-bg-dark-2);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
    transform: translateY(-2px) scale(1.05);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
}

::placeholder {
  font-size: 14px;
  color: var(--color-gray-2);
}
</style>
