<template>
  <div class="home">
    <welcome-info></welcome-info>
  </div>
</template>

<script>
import WelcomeInfo from "@/components/WelcomeInfo.vue";

export default {
  name: "Home",
  components: {
    WelcomeInfo,
  },
};
</script>
