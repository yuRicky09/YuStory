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
      <search-bar></search-bar>
      <menu-desktop :current-user="currentUser"></menu-desktop>
      <menu-mobile :current-user="currentUser"> </menu-mobile>
    </div>
    <div class="hold-space"></div>
  </header>
</template>

<script>
import SearchBar from "@/components/UI/SearchBar.vue";
import MenuDesktop from "@/components/navigation/MenuDesktop.vue";
import MenuMobile from "@/components/navigation/MenuMobile.vue";

export default {
  name: "TheNavigation",
  components: { SearchBar, MenuDesktop, MenuMobile },
  data() {
    return {
      isMenuOpen: false,
      isUserCenterOpen: false,
      showModal: false,
      sticky: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    stickNavBar() {
      this.sticky = window.pageYOffset > 150 ? true : false;
    },
  },
  created() {
    window.addEventListener("scroll", this.stickNavBar);
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
}

.nav-box.sticky {
  position: fixed;
  width: 100%;
  z-index: var(--z-index-100);
  height: 8rem;
  background-color: rgba(255, 255, 255, 0.8);
}

.nav-box.sticky + .hold-space {
  padding-top: 10rem;
}

::selection {
  user-select: none;
}
</style>
