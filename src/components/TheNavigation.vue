<template>
  <nav>
    <div class="nav-box">
      <div>
        <router-link class="logo-box" :to="{ name: 'Home' }">
          <img src="@/assets/logo.png" alt="logo-img" />
        </router-link>
      </div>
      <ul class="menu">
        <li><router-link :to="{ name: 'Home' }">首頁</router-link></li>
        <li><router-link :to="{ name: 'Login' }">登入</router-link></li>
        <li><router-link :to="{ name: 'Register' }">註冊</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavigation",
};
</script>

<style lang="scss" scoped>
.nav-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  padding: 20px 30px;
  height: 100px;
  overflow: hidden;

  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      margin-right: 10px;
      width: 300px;
      object-fit: cover;
      object-position: center;
    }
  }

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;

    > li {
      padding: 10px 20px;
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
