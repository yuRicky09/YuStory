<template>
  <div class="mobile-menu-contanier">
    <div class="hamburger-box" @click="toggleMobileMenu">
      <div class="hamburger" :class="{ active: isMenuOpen }"></div>
    </div>

    <div class="backdrop" v-show="isMenuOpen" @click="isMenuOpen = false"></div>

    <transition name="fade-right">
      <ul class="mobile-menu" v-show="isMenuOpen" @click="closeMenu($event)">
        <router-link
          v-if="currentUser"
          class="mobile-link link-hover"
          :to="{
            name: 'Users',
            params: { userId: currentUser.uid },
            query: { page: 1 },
          }"
        >
          <div class="mobile-menu-header">
            <div>
              <img
                class="mobile-user-avatar"
                v-if="userProfileImg"
                :src="userProfileImg"
                alt="user-avatar"
              />
            </div>
            <div class="mobile-user-info">
              <span>{{ userName }}</span>
              <span>{{ userEmail }}</span>
            </div>
          </div>
        </router-link>
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
          <router-link :to="{ name: 'Stories', query: { page: 1 } }"
            ><font-awesome-icon :icon="['fa', 'list-ul']" fixed-width />
            <span>所有故事</span></router-link
          >
        </li>

        <template v-if="currentUser">
          <li class="mobile-link">
            <router-link :to="{ name: 'CreateStory' }"
              ><font-awesome-icon :icon="['fa', 'pencil-alt']" fixed-width />
              <span>撰寫故事</span></router-link
            >
          </li>
          <li class="mobile-link">
            <router-link :to="{ name: 'MyStories', query: { page: 1 } }"
              ><font-awesome-icon :icon="['fa', 'book']" fixed-width />
              <span>我的故事</span></router-link
            >
          </li>
          <li class="mobile-link">
            <router-link :to="{ name: 'MyFavorites', query: { page: 1 } }"
              ><font-awesome-icon :icon="['fa', 'bookmark']" fixed-width />
              <span>我的收藏</span></router-link
            >
          </li>
          <li
            class="logout"
            @click="
              showModal = true;
              isMenuOpen = false;
            "
          >
            <div>
              <font-awesome-icon :icon="['fa', 'sign-out-alt']" fixed-width />
              <span>登出</span>
            </div>
          </li>
        </template>
      </ul>
    </transition>
    <base-modal
      :show="showModal"
      message="確定要登出嗎?"
      @close-modal="closeModal"
    >
      <template #action>
        <button class="btn modal-action-btn ghost" @click="closeModal">
          取消
        </button>
        <button class="btn modal-action-btn" @click="userLogout">登出</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal.vue";
import { mapState } from "vuex";

export default {
  name: "MenuMobile",
  components: { BaseModal },
  props: {
    currentUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      showModal: false,
    };
  },
  computed: {
    ...mapState("auth", {
      userName: (state) => state.userName,
      userEmail: (state) => state.userEmail,
      userProfileImg: (state) => state.userProfileImg,
    }),
  },
  methods: {
    toggleMobileMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu(e) {
      if (e.target.closest(".mobile-link")) this.isMenuOpen = false;
    },
    closeModal() {
      this.showModal = false;
    },
    async userLogout() {
      try {
        this.showModal = false;
        await this.$store.dispatch("auth/userLogout");
        this.$router.push({ name: "Login" });
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-menu-contanier {
  display: block;

  @media (min-width: $bp-md) {
    display: none;
  }
}
.hamburger-box {
  padding: 1.5rem 0;
  cursor: pointer;
  position: relative;
  z-index: var(--z-index-20);

  .hamburger {
    width: 3rem;
    height: 3px;
    position: relative;
    background-color: var(--color-dark-1);
    transition: all 0.5s ease-in;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 3rem;
      height: 3px;
      background-color: var(--color-dark-1);
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
  z-index: var(--z-index-200);
  top: 0;
  left: 0;
  height: 100%;
  width: 25rem;
  background-color: var(--color-dark-2);
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
</style>
