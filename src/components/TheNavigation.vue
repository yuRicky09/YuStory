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
          <router-link :to="{ name: 'Home' }">歡迎{{ userName }}</router-link>
        </li>
        <li v-if="!currentUser">
          <router-link :to="{ name: 'Login' }">登入</router-link>
        </li>
        <li v-if="!currentUser">
          <router-link :to="{ name: 'Register' }">註冊</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheNavigation",
  computed: {
    ...mapState("auth", {
      currentUser: (state) => state.currentUser,
      userName: (state) => state.userName,
    }),
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
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      margin-right: 1rem;
      max-width: 30rem;
      object-fit: cover;
      object-position: center;
    }
  }

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;

    > li {
      padding: 1rem 2rem;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
