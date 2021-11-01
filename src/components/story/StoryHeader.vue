<template>
  <section class="story-header">
    <div>
      <h2 class="story-title">{{ title }}</h2>
      <div class="title-content">
        <div class="user-info">
          <img
            class="user-avatar"
            :src="currentAuthor.userProfileImg"
            alt="user-avatar"
          />
          <p>{{ currentAuthor.userName }}</p>
        </div>
        <div class="created-time">
          <span>{{ createdTime }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  name: "StoryHeader",
  props: ["currentAuthor", "title", "createdAt"],
  computed: {
    createdTime() {
      const timestamp = this.createdAt.toDate();
      moment.locale("zh-cn");
      return moment(timestamp).format("lll");
    },
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

    @media (min-width: $bp-lg) {
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
