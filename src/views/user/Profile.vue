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
        <router-link class="btn" :to="{ name: 'EditAccount' }"
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
        <h4>近期故事</h4>
        <router-link :to="{ name: 'MyStories' }" class="btn">更多</router-link>
      </div>
      <select-tab
        optionOne="故事"
        optionTwo="草稿"
        @select-option-one="selectOptionOne"
        @select-option-two="selectOptionTwo"
      ></select-tab>
      <ul
        v-if="fiveRecordsMyStories.length > 0 && selectedType === '故事'"
        class="story-list"
      >
        <my-story-brief
          v-for="story in fiveRecordsMyStories"
          :key="story.id"
          :story="story"
        ></my-story-brief>
      </ul>
      <p
        v-if="fiveRecordsMyStories.length === 0 && selectedType === '故事'"
        class="none"
      >
        尚未有任何發佈故事
      </p>
      <ul
        v-if="fiveRecordsMyDrafts.length > 0 && selectedType === '草稿'"
        class="story-list"
      >
        <my-draft-brief
          v-for="draft in fiveRecordsMyDrafts"
          :key="draft.id"
          :draft="draft"
        ></my-draft-brief>
      </ul>
      <p
        v-if="fiveRecordsMyDrafts.length === 0 && selectedType === '草稿'"
        class="none"
      >
        尚未有任何草稿
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MyStoryBrief from "@/components/story/MyStoryBrief.vue";
import MyDraftBrief from "@/components/story/MyDraftBrief.vue";
import SelectTab from "@/components/UI/SelectTab.vue";

export default {
  name: "Profile",
  components: { MyStoryBrief, MyDraftBrief, SelectTab },
  data() {
    return {
      selectedType: "故事",
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
  methods: {
    selectOptionOne() {
      this.selectedType = "故事";
    },
    selectOptionTwo() {
      this.selectedType = "草稿";
    },
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
    border-bottom: 1px solid var(--color-gray-1);
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

    .story-list {
      background-color: #f2f2f2;
      border-radius: 5px;
      border-top-left-radius: 0;

      > li:last-child {
        border: none;
      }
    }

    .none {
      margin: 2rem 0;
      font-size: 1.6rem;
      text-align: center;
    }
  }
}
</style>
