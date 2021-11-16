<template>
  <section class="asideUserInfo" :class="{ show: showAsideUserInfo }">
    <div class="user-info">
      <img :src="currentAuthor.profileImg" alt="user-avatar" />
      <h4>{{ currentAuthor.name }}</h4>
    </div>
    <div class="user-bio">
      <p>{{ currentAuthor.bio }}</p>
    </div>
    <div class="action-icons">
      <heart-icon :currentStory="currentStory"></heart-icon>
      <comment-icon :currentStory="currentStory"></comment-icon>
      <bookmark :currentStory="currentStory"></bookmark>
    </div>
  </section>
</template>

<script>
import CommentIcon from "@/components/UI/CommentIcon.vue";
import Bookmark from "@/components/UI/Bookmark.vue";
import HeartIcon from "@/components/UI/HeartIcon.vue";

export default {
  name: "AsideUserInfo",
  components: { CommentIcon, Bookmark, HeartIcon },
  props: ["currentAuthor", "currentStory"],
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
  top: 13rem;
  opacity: 0;
  transition: all 0.3s ease-out;

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

  .action-icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}

.asideUserInfo.show {
  opacity: 1;
}
</style>
