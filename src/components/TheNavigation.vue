<template>
  <header>
    <div class="nav-box" :class="{ sticky: sticky }">
      <h1>
        <router-link class="logo-box" :to="{ name: 'Home' }">
          <img
            src="@/assets/img/logo_transparent.png"
            class="logo-img"
            alt="logo-img"
          />
        </router-link>
      </h1>
      <nav>
        <ul class="menu">
          <li>
            <router-link :to="{ name: 'Stories' }" class="regular-nav"
              >Stories</router-link
            >
          </li>
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
                v-if="!userProfileImg"
              />
              <img
                class="user-avatar-img"
                v-else
                :src="userProfileImg"
                alt="user-avatar"
              />
              <span v-if="!userProfileImg">{{ userName }}</span>
              <!-- user center interface -->
              <div class="user-center" v-show="userCenterIsOpen" @click.stop="">
                <div class="user-center-header">
                  <div>
                    <font-awesome-icon
                      :icon="['fa', 'user-circle']"
                      size="3x"
                      v-if="!userProfileImg"
                    ></font-awesome-icon>
                    <img
                      class="user-avatar-img-big"
                      v-else
                      :src="userProfileImg"
                      alt="user-avatar"
                    />
                  </div>
                  <div class="user-info">
                    <span>{{ userName }}</span>
                    <span>{{ userEmail }}</span>
                  </div>
                </div>
                <div class="user-center-action">
                  <ul @click="closeUserCenter">
                    <li class="user-center-link">
                      <router-link :to="{ name: 'Profile' }"
                        ><font-awesome-icon
                          :icon="['fa', 'user-cog']"
                          fixed-width
                        /><span>我的帳戶</span></router-link
                      >
                    </li>
                    <li class="user-center-link">
                      <router-link :to="{ name: 'CreateStory' }"
                        ><font-awesome-icon
                          :icon="['fa', 'pencil-alt']"
                          fixed-width
                        /><span>撰寫故事</span></router-link
                      >
                    </li>
                    <li class="user-center-link">
                      <router-link to="#"
                        ><font-awesome-icon
                          :icon="['fa', 'book']"
                          fixed-width
                        /><span>我的故事</span></router-link
                      >
                    </li>
                    <li class="user-center-link">
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
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li v-if="!currentUser">
            <router-link class="regular-nav" :to="{ name: 'Login' }"
              >登入</router-link
            >
          </li>
          <li v-if="!currentUser">
            <router-link class="register-nav" :to="{ name: 'Register' }"
              >註冊</router-link
            >
          </li>
        </ul>
      </nav>

      <!-- mobile-menu -->
      <div class="hamburger-box" @click="toggleHamburgerMenu">
        <div class="hamburger" :class="{ active: menuIsOpen }"></div>
      </div>
      <div
        class="backdrop"
        v-show="menuIsOpen"
        @click="menuIsOpen = false"
      ></div>
      <transition name="fade-right">
        <ul class="mobile-menu" v-show="menuIsOpen" @click="closeMenu($event)">
          <div class="mobile-menu-header">
            <div>
              <font-awesome-icon
                :icon="['fa', 'user-circle']"
                size="3x"
                v-if="!userProfileImg"
              ></font-awesome-icon>
              <img
                class="mobile-user-avatar"
                v-else
                :src="userProfileImg"
                alt="user-avatar"
              />
            </div>
            <div class="mobile-user-info">
              <span>{{ userName }}</span>
              <span>{{ userEmail }}</span>
            </div>
          </div>
          <li class="mobile-link">
            <router-link :to="{ name: 'Home' }"
              ><font-awesome-icon :icon="['fa', 'home']" fixed-width />
              <span>首頁</span></router-link
            >
          </li>
          <li class="mobile-link" v-if="currentUser">
            <router-link :to="{ name: 'Profile' }"
              ><font-awesome-icon :icon="['fa', 'user-cog']" fixed-width />
              <span>我的帳戶</span></router-link
            >
          </li>
          <li class="mobile-link" v-if="!currentUser">
            <router-link :to="{ name: 'Login' }"
              ><font-awesome-icon :icon="['fa', 'sign-in-alt']" fixed-width />
              <span>登入</span></router-link
            >
          </li>
          <li class="mobile-link">
            <router-link to="#"
              ><font-awesome-icon :icon="['fa', 'bookmark']" fixed-width />
              <span>收藏</span></router-link
            >
          </li>
          <li class="mobile-link">
            <router-link :to="{ name: 'Stories' }"
              ><font-awesome-icon :icon="['fa', 'list-ul']" fixed-width />
              <span>所有故事</span></router-link
            >
          </li>
          <li class="mobile-link">
            <router-link to="#"
              ><font-awesome-icon :icon="['fa', 'book']" fixed-width />
              <span>我的故事</span></router-link
            >
          </li>
          <li class="mobile-link">
            <router-link :to="{ name: 'CreateStory' }"
              ><font-awesome-icon :icon="['fa', 'pencil-alt']" fixed-width />
              <span>撰寫故事</span></router-link
            >
          </li>
          <li
            v-if="currentUser"
            class="logout"
            @click="
              showModal = true;
              menuIsOpen = false;
            "
          >
            <div>
              <font-awesome-icon :icon="['fa', 'sign-out-alt']" fixed-width />
              <span>登出</span>
            </div>
          </li>
        </ul>
      </transition>
    </div>
    <div class="hold-space"></div>
    <!-- logout modal -->
    <base-modal
      :show="showModal"
      message="確定要登出嗎?"
      @close-modal="closeModal"
    >
      <template #action>
        <button class="modal-action-btn ghost" @click="closeModal">
          取消
        </button>
        <button class="modal-action-btn" @click="userLogout">登出</button>
      </template>
    </base-modal>
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
      sticky: false,
    };
  },
  computed: {
    ...mapState("auth", {
      currentUser: (state) => state.currentUser,
      userName: (state) => state.userName,
      userEmail: (state) => state.userEmail,
      userProfileImg: (state) => state.userProfileImg,
    }),
  },
  methods: {
    toggleHamburgerMenu() {
      this.menuIsOpen = !this.menuIsOpen;
      this.$emit("toggle-mobile-menu", this.menuIsOpen);
    },
    windowSizeChange() {
      if (window.innerWidth >= 768) {
        this.menuIsOpen = false;
      }
    },
    stickyNavBar() {
      window.pageYOffset > 150 ? (this.sticky = true) : (this.sticky = false);
    },
    closeMenu(e) {
      if (e.target.closest(".mobile-link")) this.menuIsOpen = false;
    },
    closeUserCenter(e) {
      if (e.target.closest(".user-center-link")) this.userCenterIsOpen = false;
    },
    closeModal() {
      this.showModal = false;
      this.userCenterIsOpen = false;
    },
    showModalPlease() {
      this.showModal = true;
      console.log(this.showModal);
    },
    async userLogout() {
      try {
        this.showModal = false;
        this.userCenterIsOpen = false;
        await this.$store.dispatch("auth/userLogout");
        this.$router.push({ name: "Login" });
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  created() {
    window.onresize = this.windowSizeChange;
    window.onscroll = this.stickyNavBar;
  },
};
</script>

<style lang="scss" scoped>
.nav-box {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem 3rem;
  height: 10rem;
  transition: all 0.3s ease-out;

  .logo-box {
    display: block;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    .logo-img {
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

      > a {
        font-weight: bold;
      }
    }

    .regular-nav {
      position: relative;

      &::before {
        position: absolute;
        content: "";
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #000;
        transform: scale(0);
        transition: all 0.2s ease-in;
      }

      &:hover::before {
        transform: scale(1);
      }
    }

    .register-nav {
      display: inline-block;
      padding: 1rem 1.5rem;
      border-radius: 3px;
      color: #fff;
      background-color: var(--color-bg-dark-3);

      &:hover {
        opacity: 0.8;
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

    .user-avatar-img,
    .user-avatar-img-big {
      width: 4.5rem;
      height: auto;
      border-radius: 50%;
      margin-right: 1.5rem;
    }

    .user-avatar-img-big {
      width: 6rem;
      margin-right: 0;
    }

    .user-center {
      position: absolute;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      top: 150%;
      right: 0;
      width: 28rem;
      z-index: 1000;

      .user-center-header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem 1rem;
        border-bottom: 1px solid var(--color-bg-gray-1);
        cursor: initial;

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
          &:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          > a,
          > div {
            padding: 1rem 2rem;
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

.nav-box.sticky {
  position: fixed;
  width: 100%;
  z-index: 100;
  height: 8rem;
  background-color: rgba(255, 255, 255, 0.8);
}

.nav-box.sticky + .hold-space {
  padding-top: 105px;
}

// mobile menu
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
  z-index: 120;
  top: 0;
  left: 0;
  height: 100%;
  width: 25rem;
  background-color: var(--color-bg-dark-2);
  display: flex;
  flex-direction: column;

  .mobile-menu-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 2rem 0;

    .mobile-user-avatar {
      width: 7rem;
      border-radius: 50%;
    }

    .mobile-user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow-wrap: break-word;

      span {
        width: 25rem;
        text-align: center;
        overflow-wrap: break-word;
      }
    }
  }

  li {
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 1.6rem;

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
      padding: 1rem 0;
      text-align: start;

      @media (min-width: $bp-sm) {
        padding: 1.5rem 0;
      }
    }
  }

  li.logout {
    cursor: pointer;
    padding: 1.5rem 0;
    border-top: 1px solid gray;
    margin-top: auto;
  }
}

.fade-right-enter-active {
  animation: fade-right-menu 0.3s ease-out;
}

.fade-right-leave-active {
  animation: fade-right-menu 0.3s ease-out reverse;
}

::selection {
  user-select: none;
}
</style>
