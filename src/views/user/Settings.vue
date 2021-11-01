<template>
  <div class="container">
    <div class="setting-wrapper">
      <div class="setting-navbar">
        <ul class="setting-menu">
          <li><h2>帳號設定</h2></li>
          <li>
            <router-link :to="{ name: 'Profile' }"
              ><font-awesome-icon
                :icon="['fa', 'home']"
                fixed-width
              />首頁</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'EditAccount' }"
              ><font-awesome-icon
                :icon="['fa', 'user-edit']"
                fixed-width
              />編輯帳號</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'EditAvatar' }"
              ><font-awesome-icon
                :icon="['fa', 'camera']"
                fixed-width
              />設定頭像</router-link
            >
          </li>
        </ul>
      </div>
      <div class="setting-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1024px;
  margin: auto;

  .setting-wrapper {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    min-height: calc(100vh - 200px);

    @media (min-width: $bp-lg) {
      flex-direction: row;
      margin: 3rem 4rem;
    }

    .setting-navbar {
      padding: 1rem;

      border-bottom: 1px solid #000;

      @media (min-width: $bp-lg) {
        min-width: 15rem;
        border-bottom: 0px;
      }

      .setting-menu {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        @media (min-width: $bp-lg) {
          flex-direction: column;
          align-items: stretch;
        }

        li > h2 {
          margin-right: 1rem;
          font-size: 1.6rem;

          @media (min-width: $bp-lg) {
            font-size: 2rem;
            width: 100%;
            padding: 1.5rem;
            padding-left: 2.5rem;
            margin-right: 0;
            border: 1px solid var(--color-bg-gray-1);
          }
        }

        li > a {
          font-size: 1.4rem;
          color: #0000008a;
          padding: 1rem 0 0.8rem;
          margin: 0 1rem;
          display: inline-block;
          position: relative;
          transition: all 0.15s ease-in;

          @media (min-width: $bp-sm) {
            padding: 1.5rem;
          }

          @media (min-width: $bp-lg) {
            width: 100%;
            margin: 0;
            padding: 2rem 1.5rem;
            font-size: 1.6rem;
          }

          &:hover {
            color: #000;
          }

          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #000;
            transform: scale(0);
            transition: all 0.15s ease-in;
          }

          &:hover::after {
            transform: scale(1);
          }

          > svg {
            display: none;

            @media (min-width: $bp-iphone-sm) {
              display: inline-block;
            }

            @media (min-width: $bp-lg) {
              margin-right: 1rem;
            }
          }
        }

        li > a.router-link-exact-active {
          background-color: whitesmoke;
          color: #000;
        }
      }
    }

    .setting-content {
      padding: 1rem 5rem;
      flex: 1;
    }
  }
}
</style>
