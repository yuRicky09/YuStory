<template>
  <header>
    <div class="nav-box">
      <div>
        <router-link class="logo-box" :to="{ name: 'Home' }">
          <img src="@/assets/img/logo.png" alt="logo-img" />
        </router-link>
      </div>
      <nav>
        <ul class="menu">
          <li><router-link to="#">所有故事</router-link></li>
          <li v-if="currentUser">
            <div
              class="user-center-backdrop"
              v-show="userCenterIsOpen"
              @click="userCenterIsOpen = false"
            ></div>
            <div
              class="user-avatar"
              @click="userCenterIsOpen = !userCenterIsOpen"
            >
              <font-awesome-icon
                :icon="['fa', 'user-circle']"
                size="2x"
                class="user-icon"
              />
              <span>{{ userName }}</span>
              <!-- user center interface -->
              <div class="user-center" v-show="userCenterIsOpen" @click.stop="">
                <div class="user-center-header">
                  <div>
                    <font-awesome-icon
                      :icon="['fa', 'user-circle']"
                      size="3x"
                    ></font-awesome-icon>
                  </div>
                  <div class="user-info">
                    <span>{{ userName }}</span>
                    <span>{{ userEmail }}</span>
                  </div>
                </div>
                <div class="user-center-action">
                  <ul>
                    <li>
                      <router-link to="#"
                        ><font-awesome-icon
                          :icon="['fa', 'user-edit']"
                          fixed-width
                        /><span>編輯會員</span></router-link
                      >
                    </li>
                    <li>
                      <router-link to="#"
                        ><font-awesome-icon
                          :icon="['fa', 'pencil-alt']"
                          fixed-width
                        /><span>撰寫故事</span></router-link
                      >
                    </li>
                    <li>
                      <router-link to="#"
                        ><font-awesome-icon
                          :icon="['fa', 'book']"
                          fixed-width
                        /><span>我的故事</span></router-link
                      >
                    </li>
                    <li>
                      <router-link to="#"
                        ><font-awesome-icon
                          :icon="['fa', 'bookmark']"
                          fixed-width
                        /><span>我的收藏</span></router-link
                      >
                    </li>
                    <li @click="showModal = true">
                      <div>
                        <font-awesome-icon
                          :icon="['fa', 'sign-out-alt']"
                          fixed-width
                        /><span>登出</span>
                      </div>
                    </li>
                    <base-modal
                      :show="showModal"
                      message="確定要登出嗎?"
                      @close-modal="closeModal"
                    >
                      <template #action>
                        <div class="modal-action">
                          <button @click="userLogout">確定</button>
                          <button class="ghost" @click="closeModal">
                            取消
                          </button>
                        </div>
                      </template>
                    </base-modal>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li v-if="!currentUser">
            <router-link :to="{ name: 'Login' }">登入</router-link>
          </li>
          <li v-if="!currentUser">
            <router-link :to="{ name: 'Register' }">註冊</router-link>
          </li>
        </ul>
      </nav>

      <div class="hamburger-box" @click="toggleHamburgerMenu">
        <div class="hamburger" :class="{ active: menuIsOpen }"></div>
      </div>

      <!-- mobile-menu -->
      <div class="backdrop" v-show="menuIsOpen"></div>
      <transition name="fade-right">
        <ul class="mobile-menu" v-show="menuIsOpen" @click="closeMenu($event)">
          <li @click="menuIsOpen = false">
            <router-link :to="{ name: 'Home' }"
              ><font-awesome-icon :icon="['fa', 'home']" fixed-width />
              <span>首頁</span></router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'Login' }"
              ><font-awesome-icon :icon="['fa', 'sign-in-alt']" fixed-width />
              <span>登入</span></router-link
            >
          </li>
          <li>
            <router-link to="#"
              ><font-awesome-icon :icon="['fa', 'bookmark']" fixed-width />
              <span>收藏</span></router-link
            >
          </li>
          <li>
            <router-link to="#"
              ><font-awesome-icon :icon="['fa', 'list-ul']" fixed-width />
              <span>所有故事</span></router-link
            >
          </li>
          <li>
            <router-link to="#"
              ><font-awesome-icon :icon="['fa', 'book']" fixed-width />
              <span>我的故事</span></router-link
            >
          </li>
          <li>
            <router-link to="#"
              ><font-awesome-icon :icon="['fa', 'pencil-alt']" fixed-width />
              <span>撰寫故事</span></router-link
            >
          </li>
          <li class="logout">
            <router-link :to="{ name: 'Register' }"
              ><font-awesome-icon :icon="['fa', 'sign-out-alt']" fixed-width />
              <span>登出</span></router-link
            >
          </li>
        </ul>
      </transition>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheNavigation",
  data() {
    return {
      menuIsOpen: false,
      userCenterIsOpen: false,
      showModal: false,
    };
  },
  computed: {
    ...mapState("auth", {
      currentUser: (state) => state.currentUser,
      userName: (state) => state.userName,
      userEmail: (state) => state.userEmail,
    }),
  },
  methods: {
    toggleHamburgerMenu() {
      this.menuIsOpen = !this.menuIsOpen;
      this.$emit("toggle-mobile-menu", this.menuIsOpen);
    },
    windowSizeChange() {
      if (window.innerWidth > 640) {
        this.menuIsOpen = false;
      }
    },
    closeMenu(e) {
      if (!e.target.classList.contains("mobile-menu")) this.menuIsOpen = false;
    },
    closeModal() {
      this.showModal = false;
    },
    userLogout() {
      this.$store.dispatch("auth/userLogout");
    },
  },
  created() {
    window.onresize = this.windowSizeChange;
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

  .logo-box {
    display: block;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    img {
      width: 15rem;
      height: 5rem;
      position: relative;
      top: 3px;

      @media (min-width: $bp-iphone-sm) {
        width: 27rem;
        height: auto;
        object-fit: cover;
        object-position: center;
      }

      @media (min-width: $bp-lg) {
        width: 30rem;
      }
    }
  }

  .menu {
    display: none;

    @media (min-width: $bp-md) {
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

  .user-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;

    .user-icon {
      margin-right: 1rem;
    }

    .user-center {
      position: absolute;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      top: 150%;
      right: 0;
      width: 28rem;
      z-index: 20;

      .user-center-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem 1rem;
        border-bottom: 1px solid var(--color-bg-gray-1);

        .user-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          span {
            margin-bottom: 0.5rem;
          }
        }
      }

      .user-center-action {
        padding: 2rem 0;
        li {
          padding: 1rem 2rem;

          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          a {
            display: block;
            svg {
              margin-right: 1.5rem;
            }
          }
        }
      }
    }
  }

  .user-center-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
  }
}

.hamburger-box {
  padding: 1.5rem 0;
  cursor: pointer;
  position: relative;
  z-index: 20;

  @media (min-width: $bp-md) {
    display: none;
  }
  .hamburger {
    width: 3rem;
    height: 3px;
    position: relative;
    background-color: var(--color-bg-dark-1);
    transition: all 0.5s ease-in;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 3rem;
      height: 3px;
      background-color: var(--color-bg-dark-1);
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
  z-index: 20;
  top: 0;
  left: 0;
  height: 100%;
  width: 25rem;
  background-color: var(--color-bg-dark-2);
  display: flex;
  flex-direction: column;

  li {
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 1.8rem;

    &:hover,
    &:active,
    a.router-link-exact-active {
      background-color: #ada4a425;
    }

    svg {
      margin: 0 2rem;
    }

    a {
      display: block;
      width: 100%;
      padding: 2.5rem 0;
      text-align: start;
    }
  }

  li.logout {
    border-top: 1px solid gray;
    margin-top: auto;
  }
}

.fade-right-enter,
.fade-right-leave-to {
  transform: translateX(-25rem);
}

.fade-right-enter-to,
.fade-right-leave {
  transform: translateX(0rem);
}

.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.3s ease-out;
}

::selection {
  user-select: none;
}

.modal-action {
  text-align: center;
  padding: 2rem 0;

  button {
    margin: 0 1rem;
  }
}
</style>
