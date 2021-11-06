<template>
  <div class="profile-wrapper">
    <div class="profile-title">
      <h3>首頁</h3>
    </div>
    <div class="info">
      <div>
        <img v-if="userProfileImg" :src="userProfileImg" alt="user-avatar" />
        <font-awesome-icon v-else :icon="['fa', 'user-circle']" size="5x" />
      </div>
      <div class="info-content">
        <p>{{ userName }}</p>
        <p>{{ userEmail }}</p>
      </div>
      <div class="action">
        <router-link class="button" :to="{ name: 'EditAccount' }"
          >編輯</router-link
        >
      </div>
    </div>
    <div class="bio">
      <h4>個人簡歷</h4>
      <p v-if="userBio">{{ userBio }}</p>
      <p v-else>尚未設定個人簡歷</p>
    </div>
    <div class="stories">
      <div class="header">
        <h4>我的故事</h4>
        <router-link to="#" class="button">更多</router-link>
      </div>
      <ul v-if="fiveRecordsMyStories.length > 0" class="story-list">
        <my-story-brief
          v-for="story in fiveRecordsMyStories"
          :key="story.id"
          :story="story"
        ></my-story-brief>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MyStoryBrief from "@/components/story/MyStoryBrief.vue";

export default {
  name: "Profile",
  components: { MyStoryBrief },
  computed: {
    ...mapState("auth", {
      userProfileImg: (state) => state.userProfileImg,
      userName: (state) => state.userName,
      userEmail: (state) => state.userEmail,
      userBio: (state) => state.userBio,
    }),
    ...mapGetters("story", ["fiveRecordsMyStories"]),
  },
};
</script>

<style lang="scss" scoped>
.profile-wrapper {
  > div {
    border-bottom: 1px solid var(--color-border);

    &:last-child {
      border-bottom: 0px;
    }
  }

  .profile-title {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-bg-gray-1);
    font-size: 2rem;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
    padding: 1.5rem 0;

    @media (min-width: $bp-md) {
      flex-direction: row;
    }

    > div {
      padding: 1rem;
    }

    img {
      max-width: 7rem;
      height: auto;
      border-radius: 50%;
    }

    .info-content {
      font-size: 1.4rem;

      p:first-of-type {
        font-weight: 600;
        font-size: 1.6rem;
      }

      p {
        margin: 0.5rem 0;
        text-align: center;
        word-break: break-all;
      }
    }
  }
  .action {
    display: none;

    @media (min-width: $bp-md) {
      display: block;
      flex: 1;
      text-align: end;
      margin-right: 2rem;
    }
  }

  .bio,
  .stories {
    padding: 1.5rem 0;
    position: relative;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;

      h4 {
        padding: 1rem;
        font-size: 1.8rem;
      }

      a {
        margin-right: 3rem;
      }
    }
  }

  .bio {
    p {
      padding: 1rem;
      font-size: 1.6rem;
    }
  }

  .story-list {
    background-color: #f2f2f2;
    border-radius: 5px;

    > li:last-child {
      border: none;
    }
  }
}
</style>
