<template>
  <div>
    <div v-if="show" class="backdrop" @click="$emit('close-modal')"></div>
    <transition name="fade-in">
      <div v-if="show" class="message-box">
        <base-card>
          <div class="content">
            <h2>訊息</h2>
            <p>{{ message }}</p>
          </div>
          <slot></slot>
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
  z-index: 20;

  @media (min-width: $bp-lg) {
    top: 30vh;
    left: 30%;
    width: 40%;
    z-index: 20;
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
}

.fade-in-enter-active {
  animation: fade-in 0.5s linear;
}

.fade-in-leave-active {
  animation: fade-in 0.5s linear reverse;
}

@keyframes fade-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
