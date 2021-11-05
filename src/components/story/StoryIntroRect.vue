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
            :to="{
              name: 'Story',
              params: { id: id },
              meta: { title: story.title },
            }"
            class="story-content"
          >
            <h3 class="title">{{ story.title }}</h3>
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
              <font-awesome-icon
                :icon="['fa', 'bookmark']"
                @click="addToFavorite"
                v-if="favorited"
              />
              <font-awesome-icon
                :icon="['far', 'bookmark']"
                @click="addToFavorite"
                v-else
              />
              <font-awesome-icon :icon="['fa', 'ellipsis-v']" />
            </div>
          </div>
        </div>
        <router-link
          :to="{ name: 'Story', params: { id: id } }"
          class="story-cover"
        >
          <img :src="story.cover" />
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
  data() {
    return {
      favorited: false,
    };
  },
  computed: {
    createdTime() {
      const timestamp = this.story.createdAt.toDate();
      moment.locale("zh-cn");
      return moment(timestamp).format("lll");
    },
  },
  methods: {
    addToFavorite() {
      this.favorited = !this.favorited;
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
    padding: 1.5rem 1rem;

    @media (min-width: $bp-md) {
      padding: 2rem 1.5rem;
    }

    &:hover .story-cover {
      box-shadow: 0 5px 10px var(--color-layout);

      img {
        transform: scale(1.05);
      }
    }
  }

  .story-info {
    flex: 1;
    padding: 0 0.7rem;
    .author {
      display: flex;
      align-items: center;
      margin: 0.5rem 0;
      padding: 8px 5px;
      border-bottom: 1px solid var(--color-border);

      img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }

      span {
        display: inline-block;
        margin: 0 1rem;
        font-weight: 600;
      }
    }

    .story-content {
      padding-right: 2rem;
      &:hover .title {
        color: #117096;
      }

      .title,
      .brief {
        // 多行省略效果
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
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
        margin-bottom: 5px;

        @media (min-width: $bp-md) {
          display: -webkit-box;
          font-size: 1.5rem;
        }
      }
    }

    .story-footer {
      display: flex;
      justify-content: flex-end;

      @media (min-width: $bp-iphone-ten) {
        justify-content: space-between;
      }
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

        span {
          max-width: 20rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (min-width: $bp-md) {
          display: flex;
          align-items: center;
          &:hover {
            opacity: 0.8;
          }
        }
      }

      .other-action {
        display: none;
        padding-right: 1rem;

        @media (min-width: $bp-iphone-ten) {
          display: flex;
          align-items: center;
        }

        svg {
          margin: 0.8rem;
          cursor: pointer;
          font-size: 1.8rem;
        }
      }
    }
  }

  .story-cover {
    display: none;
    overflow: hidden;
    border-radius: 5px;

    @media (min-width: $bp-iphone-ten) {
      display: block;
    }

    @media (min-width: $bp-md) {
      align-self: stretch;
    }

    img {
      display: block;
      object-fit: cover;
      object-position: center center;
      transition: transform 0.3s ease-out;
      user-select: none;

      @media (min-width: $bp-iphone-ten) {
        width: 12rem;
        height: 6rem;
      }

      @media (min-width: $bp-sm) {
        width: 18rem;
        height: 12rem;
      }

      @media (min-width: $bp-md) {
        width: 24rem;
        height: 18rem;
      }
    }
  }
}
</style>
