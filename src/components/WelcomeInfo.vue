<template>
  <div class="welcome-box">
    <div class="welcome-img">
      <img src="@/assets/img/welcome.jpg" alt="welcome-img" />
    </div>
    <div class="welcome-content">
      <div>
        <h2 class="title">WELCOME YUSTORY</h2>
        <h3 class="sub-title">快來與他人分享自己的特殊回憶吧</h3>
        <router-link class="register-link" :to="{ name: 'Register' }">
          <span>
            前往註冊
            <font-awesome-icon
              class="arror-right"
              :icon="['fa', 'long-arrow-alt-right']"
            />
          </span>
        </router-link>
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
  min-height: calc(100vh - 10rem);
  font-size: 1.6rem;

  @media (min-width: $bp-md) {
    flex-direction: row;
  }
  .welcome-img {
    flex-basis: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .welcome-content {
    flex-basis: 50%;
    padding: 2rem 0;
    background-color: var(--color-bg-dark-2);
    color: #fff;

    div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .title {
        font-size: 2rem;
        animation: fade-right 1s ease-out forwards;

        @media (min-width: $bp-md) {
          font-size: 3.5rem;
        }

        @media (min-width: $bp-lg) {
          font-size: 5rem;
        }
      }

      .sub-title {
        font-size: 1.4rem;
        margin: 2rem 0;
        animation: fade-left 1s ease-out forwards;

        @media (min-width: $bp-md) {
          font-size: 2rem;
        }

        @media (min-width: $bp-lg) {
          font-size: 2.5rem;
        }
      }

      .register-link {
        position: relative;
        display: block;
        align-self: flex-end;

        @media (min-width: $bp-md) {
          position: absolute;
          bottom: 10rem;
          right: 13rem;
        }

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #fff;
          transform: scale(0);
          transition: all 0.3s ease-out;
        }

        &:hover::after {
          transform: scale(1);
        }

        span {
          position: relative;
          font-size: 1.6rem;
          font-weight: 500;
          display: block;
          padding: 0.5rem;
          width: 100%;
          height: 100%;
          color: #fff;
          transition: all 0.3s ease-out;
          z-index: 10;

          @media (min-width: $bp-md) {
            font-size: 2.2rem;
            font-weight: 600;
          }

          @media (min-width: $bp-lg) {
            font-size: 2.5rem;
            font-weight: 600;
          }
        }

        &:hover span {
          color: var(--color-bg-dark-2);
        }

        span::before,
        span::after {
          content: "";
          position: absolute;
          top: -20px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #fff;
          opacity: 0;
          transition: all 0.3s ease-out;
        }

        span::after {
          top: unset;
          bottom: -20px;
        }

        &:hover span::before {
          top: -5px;
          opacity: 1;
        }

        &:hover span::after {
          bottom: -5px;
          opacity: 1;
        }
      }

      .arror-right {
        margin-left: 0.8rem;
      }
    }
  }
}
</style>
