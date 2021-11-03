<template>
  <section class="asideUserInfo" :class="{ show: showAsideUserInfo }">
    <div class="user-info">
      <img :src="currentAuthor.profileImg" alt="user-avatar" />
      <h4>{{ currentAuthor.name }}</h4>
    </div>
    <div class="user-bio">
      <p>{{ currentAuthor.bio }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "AsideUserInfo",
  props: ["currentAuthor"],
  data() {
    return {
      showAsideUserInfo: false,
    };
  },
  computed: {
    topToHeaderDistance() {
      return this.$store.state.story.topToHeaderDistance;
    },
  },
  methods: {
    // 當滾動距離大於頂端到文章標題底部時秀出用戶側邊資訊欄。
    toggleAsideUserInfoClass() {
      if (this.topToHeaderDistance) {
        window.pageYOffset > this.topToHeaderDistance
          ? (this.showAsideUserInfo = true)
          : (this.showAsideUserInfo = false);
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.toggleAsideUserInfoClass);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.toggleAsideUserInfoClass);
  },
};
</script>

<style lang="scss" scoped>
.asideUserInfo {
  position: sticky;
  top: 15rem;
  opacity: 0;
  transition: all 0.5s ease-in;

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid var(--color-border);

    img {
      width: 12rem;
      height: 12rem;
      border-radius: 5px;
      box-shadow: 0 5px 10px var(--color-layout);
    }

    h4 {
      margin: 1rem 0;
    }
  }

  .user-bio {
    padding: 5px;

    p {
      font-size: 1.4rem;
      color: var(--color-bg-gray-1);
    }
  }
}

.asideUserInfo.show {
  opacity: 1;
}
</style>
