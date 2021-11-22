<template>
  <section class="story-header" ref="storyHeader" v-if="currentStory">
    <div>
      <h2 class="story-title">{{ currentStory.title }}</h2>
      <div class="title-content">
        <div class="user-info">
          <router-link
            class="to-author-link"
            :to="{
              name: 'Users',
              params: { userId: currentStory.userId },
              query: { page: 1 },
            }"
          >
            <img
              class="user-avatar"
              :src="currentAuthor.profileImg"
              alt="user-avatar"
            />
          </router-link>
          <p>{{ currentAuthor.name }}</p>
        </div>
        <div class="created-time">
          <span>{{ createdTime(currentStory.createdAt.toDate()) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { timeFormatMixin } from "@/mixins/timeFormatMixin";

export default {
  name: "StoryHeader",
  props: ["currentAuthor", "currentStory"],
  mixins: [timeFormatMixin],
  mounted() {
    const topToHeaderDistance =
      this.$refs.storyHeader.offsetHeight + this.$refs.storyHeader.offsetTop;
    this.$store.commit("story/setTopToHeaderDistance", topToHeaderDistance);
  },
};
</script>

<style lang="scss" scoped>
.story-header {
  border-bottom: 1px solid var(--color-border);
  padding: 1.5rem;

  .story-title {
    font-size: 3.4rem;
    margin: 1.5rem 0;

    @media (min-width: $bp-md) {
      font-size: 5rem;
      margin: 2.5rem 0;
    }
  }
  .title-content {
    display: flex;
    flex-direction: column;

    @media (min-width: $bp-md) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;

      .user-avatar {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin: 0 1rem;
      }

      p {
        font-weight: 700;
      }
    }

    .created-time {
      text-align: end;
      font-size: 1.4rem;
      color: var(--color-bg-gray-1);
    }
  }
}
</style>
