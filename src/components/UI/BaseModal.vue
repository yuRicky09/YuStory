<template>
  <portal to="modal-destination">
    <div v-if="show" class="backdrop" @click="$emit('close-modal')"></div>
    <transition name="zoom-in">
      <div v-if="show" class="message-box">
        <base-card>
          <div class="content">
            <h2>訊息</h2>
            <p>{{ message }}</p>
          </div>
          <div class="modal-action">
            <slot name="action"></slot>
          </div>
        </base-card>
      </div>
    </transition>
  </portal>
</template>

<script>
import { Portal } from "portal-vue";

export default {
  name: "BaseModal",
  props: ["message", "show"],
  components: { Portal },
};
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 1000;

  @media (min-width: $bp-lg) {
    left: 20%;
    width: 60%;
  }

  @media (min-width: $bp-xl) {
    left: 30%;
    width: 40%;
  }

  .content {
    text-align: center;

    h2 {
      background-color: var(--color-bg-dark-3);
      color: #fff;
      padding: 1.5rem 0;
      font-size: 1.8rem;

      @media (min-width: $bp-md) {
        font-size: 2.8rem;
      }
    }

    p {
      background-color: #fff;
      font-size: 1.6rem;
      font-weight: 600;
      padding: 0 2rem;
      margin: 4rem;

      @media (min-width: $bp-md) {
        font-size: 2.2rem;
        margin: 7rem 0;
      }
    }
  }

  .modal-action {
    text-align: center;
    margin: 2rem 0;
    font-size: 1.4rem;

    @media (min-width: $bp-md) {
      font-size: 1.6rem;
    }
  }
}
</style>
