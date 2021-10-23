<template>
  <div>
    <div v-if="show" class="layout" @click="$emit('close-modal')"></div>
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
.layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
}

.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  .content {
    width: 50rem;
    min-height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      width: 100%;
      flex: 1 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-bg-dark-3);
      color: #fff;
    }

    p {
      width: 100%;
      flex: 3 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      font-size: 2rem;
      font-weight: 600;
    }
  }
}

.fade-in-enter,
.fade-in-leave-to {
  transform: scale(0.95) translate(-50%, -50%);
  opacity: 0;
}

.fade-in-enter-to,
.fade-in-leave {
  transform: scale(1);
  opacity: 1;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.5s ease;
}
</style>
