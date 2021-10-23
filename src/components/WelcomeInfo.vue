<template>
  <div class="welcome-box">
    <div class="welcome-img">
      <img src="@/assets/welcome.jpg" alt="welcome-img" />
    </div>
    <div class="welcome-content">
      <div>
        <h2>WELCOME!</h2>
        <p>快來與他人分享自己的特殊回憶吧</p>
        <router-link to="#">前往註冊</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeInfo",
};
</script>

<style lang="scss" scoped>
.welcome-box {
  display: flex;
  flex-direction: column;
  height: 70vh;

  @media (min-width: 768px) {
    flex-direction: row;
  }
  .welcome-img {
    flex-basis: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .welcome-content {
    flex-basis: 50%;
    background-color: var(--color-bg-dark-2);
    color: #fff;

    @media (min-width: 768px) {
    }

    div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h2 {
        font-size: 48px;
        margin: 20px;
      }

      p {
        margin: 20px;
      }

      a {
        color: inherit;
        display: block;
        margin: 20px;
        align-self: flex-end;
        padding-right: 100px;
      }
    }
  }
}
</style>
