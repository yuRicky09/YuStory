<template>
  <div class="backdrop">
    <Spinner />
  </div>
</template>

<script>
import Spinner from "@/assets/SVG/spinner.svg";

export default {
  name: "BaseSpinner",
  components: { Spinner },
};
</script>

<style lang="scss" scoped>
.backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
