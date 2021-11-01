<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: ["message", "show"],
};
</script>

<style lang="scss" scoped>
.message-box {
  position: fixed;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: 200;

  @media (min-width: $bp-lg) {
    left: 30%;
    width: 40%;
  }

  .content {
    h2 {
      background-color: var(--color-bg-dark-3);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      padding: 1.5rem 0;
    }

    p {
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.6rem;
      font-weight: 600;
      padding: 7rem 0;

      @media (min-width: $bp-lg) {
        font-size: 2.5rem;
      }
    }
  }

  .modal-action {
    text-align: center;
    margin: 2rem 0;
  }
}

.zoom-in-enter-active {
  animation: zoom-in 0.3s ease-out;
}

.zoom-in-leave-active {
  animation: zoom-in 0.3s ease-out reverse;
}
</style>
