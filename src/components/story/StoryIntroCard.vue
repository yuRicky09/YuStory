<template>
  <div class="story-wrapper">
    <div class="story">
      <div class="story-cover">
        <router-link
          class="to-story-link"
          :to="{ name: 'Story', params: { id: story.id } }"
        >
          <img v-if="story.cover" :src="story.cover" alt="story-cover" />
        </router-link>
      </div>
      <div class="story-body">
        <div class="author">
          <router-link
            class="link-hover"
            :to="{
              name: 'Users',
              params: { userId: story.userId },
              query: { page: 1 },
            }"
          >
            <img :src="story.userProfileImg" alt="user-avatar" />
            <span>{{ story.userName }}</span>
          </router-link>
        </div>
        <router-link
          class="to-story-link"
          :to="{ name: 'Story', params: { id: story.id } }"
        >
          <div class="content">
            <h3 class="content-title two-line">{{ story.title }}</h3>
            <p class="content-brief one-line">{{ story.brief }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <span class="created-time">{{
      createdTimeSimple(story.createdAt.toDate())
    }}</span>
  </div>
</template>

<script>
import { timeFormatMixin } from "@/mixins/timeFormatMixin";

export default {
  name: "StoryIntroCard",
  props: ["story"],
  mixins: [timeFormatMixin],
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_story-intro";
.story-wrapper {
  width: 26rem;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px var(--color-shadow);
  position: relative;

  .story {
    .story-cover {
      height: 16rem;
      overflow: hidden;

      .to-story-link {
        &:hover img {
          transform: scale(1.05);
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        display: block;
        transition: transform 0.3s ease-out;
      }
    }

    .story-body {
      padding: 1.5rem 1rem;
      margin-bottom: 1rem;

      .to-story-link {
        &:hover {
          color: var(--color-link-hover);
        }
      }

      .author {
        display: flex;
        align-items: center;
        margin-bottom: 1.4rem;

        img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }

        span {
          margin: 0 1rem;
          font-weight: 600;
        }
      }

      .content {
        .content-title {
          font-size: 1.5rem;

          @media (min-width: $bp-md) {
            font-size: 2rem;
          }
        }

        .content-brief {
          display: block;
          font-size: 1.5rem;
        }
      }
    }
  }

  .created-time {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    font-size: 1.2rem;
    color: var(--color-gray-1);
  }
}
</style>
