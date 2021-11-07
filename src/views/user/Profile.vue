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
      <div class="select-type-area">
        <span
          @click="itemType = 'Story'"
          :class="{ active: itemType === 'Story' }"
          >Stories</span
        >
        <span
          @click="itemType = 'Draft'"
          :class="{ active: itemType === 'Draft' }"
          >Drafts</span
        >
      </div>
      <ul
        v-if="fiveRecordsMyStories.length > 0 && itemType === 'Story'"
        class="story-list"
      >
        <my-story-brief
          v-for="story in fiveRecordsMyStories"
          :key="story.id"
          :story="story"
        ></my-story-brief>
      </ul>
      <ul
        v-if="fiveRecordsMyDrafts.length > 0 && itemType === 'Draft'"
        class="story-list"
      >
        <my-draft-brief
          v-for="draft in fiveRecordsMyDrafts"
          :key="draft.id"
          :draft="draft"
        ></my-draft-brief>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MyStoryBrief from "@/components/story/MyStoryBrief.vue";
import MyDraftBrief from "@/components/story/MyDraftBrief.vue";

export default {
  name: "Profile",
  components: { MyStoryBrief, MyDraftBrief },
  data() {
    return {
      itemType: "Story",
    };
  },
  computed: {
    ...mapState("auth", {
      userProfileImg: (state) => state.userProfileImg,
      userName: (state) => state.userName,
      userEmail: (state) => state.userEmail,
      userBio: (state) => state.userBio,
    }),
    ...mapGetters("story", ["fiveRecordsMyStories", "fiveRecordsMyDrafts"]),
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
        word-break: break-all;
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
  }

  .bio,
  .stories {
    padding: 1.5rem 0;
    position: relative;

    h4 {
      padding: 1rem;
      font-size: 1.8rem;
    }
  }

  .bio {
    p {
      padding: 1rem;
      font-size: 1.6rem;
    }
  }

  .stories {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 0;

      a {
        margin-right: 3rem;
      }
    }

    .select-type-area {
      margin-top: 1rem;

      span {
        display: inline-block;
        font-size: 1.4rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease-out;

        @media (min-width: $bp-md) {
          font-size: 1.6rem;
          padding: 0.8rem 1.5rem;
        }

        &:hover {
          opacity: 0.8;
        }
      }

      span.active {
        background-color: var(--color-bg-dark-2);
        color: #fff;
      }
    }

    .story-list {
      background-color: #f2f2f2;
      border-radius: 5px;
      border-top-left-radius: 0;

      > li:last-child {
        border: none;
      }
    }
  }
}
</style>
