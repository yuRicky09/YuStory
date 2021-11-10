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
              params: { id: story.id },
            }"
            class="story-content"
          >
            <h3 class="title">{{ story.title }}</h3>
            <div class="brief">{{ story.brief }}</div>
          </router-link>
          <div class="story-footer">
            <div class="left-side">
              <div class="created-time">{{ createdTime }}</div>
              <div class="story-tags">
                <router-link
                  :to="{ name: 'Home' }"
                  v-for="tag in story.tags"
                  :key="tag"
                >
                  <base-tag :tagName="tag"></base-tag>
                </router-link>
              </div>
            </div>
            <div class="other-action">
              <div
                class="backdrop"
                v-if="showPanel"
                @click="showPanel = false"
              ></div>
              <div class="option-panel-position" v-if="showPanel">
                <more-option-panel
                  :storyUserId="story.userId"
                  :storyId="story.id"
                  type="story"
                  @close-option-panel="showPanel = false"
                ></more-option-panel>
              </div>
              <font-awesome-icon
                :icon="['fa', 'bookmark']"
                @click="removeFromFavorites"
                v-if="favorited && userId && userId !== story.userId"
              />
              <font-awesome-icon
                :icon="['far', 'bookmark']"
                @click="addToFavorites"
                v-if="!favorited && userId && userId !== story.userId"
              />
              <font-awesome-icon
                :icon="['fa', 'ellipsis-v']"
                @click="showPanel = !showPanel"
              />
            </div>
          </div>
        </div>
        <router-link
          :to="{ name: 'Story', params: { id: story.id } }"
          class="story-cover"
        >
          <img :src="story.cover" />
        </router-link>
      </div>
    </base-card>
  </section>
</template>

<script>
import BaseTag from "@/components/UI/BaseTag.vue";
import MoreOptionPanel from "@/components/MoreOptionPanel.vue";
import { timeFormatMixin } from "@/mixins/timeFormatMixin";
import { mapState } from "vuex";

export default {
  name: "StoryIntroRect",
  props: ["story"],
  components: { BaseTag, MoreOptionPanel },
  mixins: [timeFormatMixin],
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    ...mapState("auth", {
      userId: (state) => state.userId,
      favorites: (state) => state.favorites,
    }),
    // 判斷此故事id key值，為true則顯示已收藏mark，反之顯示未收藏。
    favorited() {
      return this.favorites[`${this.story.id}`] ? true : false;
    },
  },
  methods: {
    async addToFavorites() {
      try {
        await this.$store.dispatch("auth/addToFavorites", this.story.id);
        this.$notify({
          text: "已將此故事加入我的收藏",
          type: "success",
        });
      } catch (_) {
        this.$notify({
          text: "添加收藏失敗，請再添加一次",
          type: "error",
        });
      }
    },
    async removeFromFavorites() {
      try {
        await this.$store.dispatch("auth/removeFromFavorites", this.story.id);
        this.$notify({
          text: "已將此故事從我的收藏移除",
        });
      } catch (_) {
        this.$notify({
          text: "移除收藏失敗，請再移除一次",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.story-wrapper {
  margin: 1rem;

  a {
    display: block;
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

        @media (min-width: $bp-md) {
          display: flex;
          align-items: center;
        }

        a {
          display: inline-block;
          &:hover {
            opacity: 0.8;
          }
        }
      }

      .other-action {
        display: none;
        padding-right: 1rem;
        position: relative;

        @media (min-width: $bp-iphone-ten) {
          display: flex;
          align-items: center;
        }

        svg {
          width: 2.5rem;
          height: 2.5rem;
          margin: 3px;
          padding: 4px;
          cursor: pointer;
        }

        .backdrop {
          background-color: transparent;
        }

        .option-panel-position {
          position: absolute;
          z-index: 1000;
          transform: translateY(-100%);
          right: -3rem;
          top: -1rem;
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
