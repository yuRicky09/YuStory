<template>
  <nav>
    <ul class="menu">
      <li>
        <router-link
          :to="{ name: 'Stories', query: { page: 1 } }"
          class="regular-nav"
          >Stories</router-link
        >
      </li>

      <li v-if="currentUser">
        <div
          class="user-center-backdrop"
          v-show="isUserCenterOpen"
          @click="closeUserCenter"
        ></div>

        <div class="user-avatar" @click="isUserCenterOpen = !isUserCenterOpen">
          <img
            class="user-avatar-img"
            v-if="userProfileImg"
            :src="userProfileImg"
            alt="user-avatar"
          />
          <span>{{ userName }}</span>

          <!-- user center panel -->
          <div class="user-center" v-show="isUserCenterOpen" @click.stop>
            <router-link
              class="user-center-header link-hover"
              @click.native="closeUserCenter"
              :to="{
                name: 'Users',
                params: { userId: currentUser.uid },
                query: { page: 1 },
              }"
            >
              <div class="user-center-link">
                <img
                  class="user-avatar-img-big"
                  v-if="userProfileImg"
                  :src="userProfileImg"
                  alt="user-avatar"
                />
              </div>
              <div class="user-info">
                <span>{{ userName }}</span>
                <span>{{ userEmail }}</span>
              </div>
            </router-link>

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
                  <router-link :to="{ name: 'MyStories', query: { page: 1 } }"
                    ><font-awesome-icon
                      :icon="['fa', 'book']"
                      fixed-width
                    /><span>我的故事</span></router-link
                  >
                </li>
                <li class="user-center-link">
                  <router-link :to="{ name: 'MyFavorites', query: { page: 1 } }"
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
  </nav>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal.vue";
import { mapState } from "vuex";

export default {
  name: "MenuDesktop",
  components: { BaseModal },
  props: {
    currentUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isUserCenterOpen: false,
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
    closeUserCenter() {
      this.isUserCenterOpen = false;
    },
    closeModal() {
      this.showModal = false;
      this.isUserCenterOpen = false;
    },
    async userLogout() {
      try {
        this.showModal = false;
        this.isUserCenterOpen = false;
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
.menu {
  display: none;

  @media (min-width: $bp-md) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > li {
    padding: 1rem 2rem;
    margin: 0 1rem;

    &:last-child {
      margin: 0;
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
    background-color: var(--color-dark-3);

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
    z-index: var(--z-index-max);
    cursor: default;

    > a {
      display: block;
    }

    .user-center-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem 1rem;
      border-bottom: 1px solid var(--color-gray-1);

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
        cursor: pointer;
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
  z-index: var(--z-index-20);
}
</style>
