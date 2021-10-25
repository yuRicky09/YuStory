<template>
  <nav>
    <div class="nav-box">
      <div>
        <router-link class="logo-box" :to="{ name: 'Home' }">
          <img src="@/assets/img/logo.png" alt="logo-img" />
        </router-link>
      </div>
      <ul class="menu">
        <li><router-link :to="{ name: 'Home' }">首頁</router-link></li>
        <li v-if="currentUser">
          <div class="user-center">
            <font-awesome-icon :icon="['fa', 'user-circle']" />
            <span>{{ userName }}</span>
          </div>
        </li>
        <li v-if="!currentUser">
          <router-link :to="{ name: 'Login' }">登入</router-link>
        </li>
        <li v-if="!currentUser">
          <router-link :to="{ name: 'Register' }">註冊</router-link>
        </li>
      </ul>

      <div class="hamburger-box" @click="toggleHamburgerMenu">
        <div class="hamburger" :class="{ active: openMenu }"></div>
      </div>
      <!-- mobile-menu -->
      <transition name="fade-right">
        <ul class="mobile-menu" v-if="openMenu">
          <li><router-link to="#">首頁</router-link></li>
          <li><router-link to="#">登入</router-link></li>
          <li><router-link to="#">註冊</router-link></li>
        </ul>
      </transition>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheNavigation",
  data() {
    return {
      openMenu: false,
    };
  },
  computed: {
    ...mapState("auth", {
      currentUser: (state) => state.currentUser,
      userName: (state) => state.userName,
    }),
  },
  methods: {
    toggleHamburgerMenu() {
      this.openMenu = !this.openMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 3rem;
  height: 10rem;
  overflow: hidden;

  .logo-box {
    display: block;
    cursor: pointer;

    img {
      width: 15rem;
      height: 5rem;
      @media (min-width: $bp-iphone-sm) {
        width: 30rem;
        height: auto;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  .menu {
    display: none;

    @media (min-width: $bp-sm) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    > li {
      padding: 1rem 2rem;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .user-center {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.hamburger-box {
  padding: 1.5rem 0;
  cursor: pointer;

  @media (min-width: $bp-sm) {
    display: none;
  }
  .hamburger {
    width: 3rem;
    height: 3px;
    position: relative;
    background-color: rgba(189, 186, 183, 0.9);
    transition: all 0.5s ease-in;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 3rem;
      height: 3px;
      background-color: rgba(189, 186, 183, 0.9);
      transition: all 0.5s ease-in;
    }

    &::before {
      top: -10px;
    }

    &::after {
      top: 10px;
    }
  }

  .hamburger.active {
    transform: translateX(-30px);
    background-color: transparent;
    &::before {
      transform: translate(30px, 10px) rotate(45deg);
    }

    &::after {
      transform: translate(30px, -10px) rotate(-45deg);
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 25rem;
  background-color: wheat;
}

.fade-right-enter,
.fade-right-leave-to {
  left: -25rem;
}

.fade-right-enter-to,
.fade-right-leave {
  left: 0;
}

.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.4s ease-in;
}
</style>
