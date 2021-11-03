<template>
  <section class="story-wrapper">
    <base-card>
      <div class="story">
        <div class="story-info">
          <div class="author">
            <img :src="story.userProfileImg" alt="user-avatar" />
            <span>{{ story.userName }}</span>
          </div>
          <router-link
            :to="{ name: 'Story', params: { id: id } }"
            class="story-content"
          >
            <div class="title">{{ story.title }}</div>
            <div class="brief">{{ story.brief }}</div>
          </router-link>
          <div class="story-footer">
            <div class="left-side">
              <div class="created-time">{{ createdTime }}</div>
              <router-link
                class="story-tags"
                :to="{ name: 'Home' }"
                v-for="tag in story.tags"
                :key="tag"
              >
                <base-tag :tagName="tag"></base-tag>
              </router-link>
            </div>
            <div class="other-action">
              <font-awesome-icon :icon="['fa', 'bookmark']" />
              <font-awesome-icon :icon="['far', 'bookmark']" />
              <font-awesome-icon :icon="['fa', 'ellipsis-v']" />
            </div>
          </div>
        </div>
        <router-link
          :to="{ name: 'Story', params: { id: id } }"
          class="story-cover"
        >
          <img :src="story.cover.coverDownloadURL" />
        </router-link>
      </div>
    </base-card>
  </section>
</template>

<script>
import moment from "moment";
import BaseTag from "@/components/UI/BaseTag.vue";

export default {
  name: "StoryIntroRect",
  props: ["story", "id"],
  components: { BaseTag },
  computed: {
    createdTime() {
      const timestamp = this.story.createdAt.toDate();
      moment.locale("zh-cn");
      return moment(timestamp).format("lll");
    },
  },
};
</script>

<style lang="scss" scoped>
.story-wrapper {
  margin: 1rem;

  a {
    display: inline-block;
  }

  .story {
    display: flex;
    align-items: center;
    padding: 2rem 1rem;

    @media (min-width: $bp-md) {
      padding: 3rem 2rem;
    }
  }

  .story-info {
    flex: 1;
    padding: 0 0.5rem;
    .author {
      display: flex;
      align-items: center;
      margin: 1.2rem 0;
      padding: 0.5rem;
      border-bottom: 1px solid var(--color-border);

      img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
      }

      span {
        display: inline-block;
        margin: 0 1rem;
        font-weight: 600;
      }
    }

    .story-content {
      &:hover .title {
        color: #117096;
      }

      .title {
        font-size: 1.6rem;
        font-weight: 600;
        margin-bottom: 0.6rem;

        @media (min-width: $bp-md) {
          font-size: 2.2rem;
        }
      }

      .brief {
        color: var(--color-bg-gray-1);
        display: none;
        // 多行省略效果
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;

        @media (min-width: $bp-md) {
          display: -webkit-box;
          font-size: 1.5rem;
        }
      }
    }

    .story-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left-side {
        display: flex;
        align-items: center;
      }

      .created-time {
        font-size: 1.2rem;
        color: var(--color-bg-gray-1);
      }

      .story-tags {
        display: none;

        @media (min-width: $bp-md) {
          display: inline-block;
          &:hover {
            opacity: 0.8;
          }
        }
      }

      .other-action {
        display: none;

        @media (min-width: $bp-iphone-ten) {
          display: inline-block;
        }

        svg {
          margin: 0.5rem;
        }
      }
    }
  }

  .story-cover {
    display: none;
    align-self: stretch;
    overflow: hidden;
    margin-left: 2rem;

    &:hover {
      box-shadow: 0 5px 10px var(--color-layout);

      img {
        transform: scale(1.05);
      }
    }

    @media (min-width: $bp-iphone-ten) {
      display: block;
    }

    img {
      width: 12rem;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform 0.3s ease-out;

      @media (min-width: $bp-sm) {
        width: 15rem;
      }

      @media (min-width: $bp-md) {
        width: 20rem;
      }
    }
  }
}
</style>
