<template>
  <div class="story-wrapper">
    <router-link :to="{ name: 'Story', params: { id: story.id } }">
      <div class="story">
        <div class="story-cover">
          <img v-show="story.cover" :src="story.cover" alt="story-cover" />
        </div>
        <div class="story-body">
          <div class="author">
            <img :src="story.userProfileImg" alt="user-avatar" />
            <span>{{ story.userName }}</span>
          </div>
          <div class="content">
            <h3 class="content-title two-line">{{ story.title }}</h3>
            <p class="content-brief one-line">{{ story.brief }}</p>
          </div>
        </div>
        <span class="created-time">{{
          createdTimeSimple(story.createdAt.toDate())
        }}</span>
      </div>
    </router-link>
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
.story-wrapper {
  width: 26rem;
  transition: all 0.3s ease-out;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 8px var(--color-layout);

  > a {
    display: block;
    height: 100%;
    position: relative;
  }

  &:hover {
    transform: rotate(3deg);

    .content-title {
      color: #117096;
    }
  }

  .story {
    .story-cover {
      height: 16rem;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        display: block;
      }
    }

    .story-body {
      padding: 1.5rem 1rem;
      margin-bottom: 1rem;
      .author {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;

        > img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }

        > span {
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

    .created-time {
      position: absolute;
      right: 0.5rem;
      bottom: 0.5rem;
      font-size: 1.2rem;
      color: var(--color-bg-gray-1);
    }
  }
}
</style>
