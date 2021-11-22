<template>
  <section class="story-wrapper">
    <base-card>
      <div class="story">
        <div class="story-info">
          <div class="author">
            <router-link
              class="to-author-link"
              :to="{
                name: 'Users',
                params: { userId: story.userId },
                query: { page: 1 },
              }"
            >
              <img :src="story.userProfileImg" alt="user-avatar" />
            </router-link>
            <span>{{ story.userName }}</span>
          </div>
          <router-link
            :to="{
              name: 'Story',
              params: { id: story.id },
            }"
            class="story-content"
          >
            <h3 class="content-title two-line">{{ story.title }}</h3>
            <div class="content-brief two-line">{{ story.brief }}</div>
          </router-link>
          <div class="story-footer">
            <div class="left-side">
              <div class="created-time">
                {{ createdTimeSimple(story.createdAt.toDate()) }}
              </div>
              <div class="story-tags">
                <router-link
                  :to="{
                    name: 'Tags',
                    params: { tagName: tag },
                    query: { page: 1 },
                  }"
                  v-for="tag in story.tags"
                  :key="tag"
                >
                  <base-tag :tagName="tag"></base-tag>
                </router-link>
              </div>
            </div>
            <div class="other-action" v-if="currentUser">
              <div
                class="backdrop"
                v-if="showPanel"
                @click="showPanel = false"
              ></div>
              <div class="option-panel-position" v-if="showPanel">
                <more-option-panel
                  :authorId="story.userId"
                  :storyId="story.id"
                  type="story"
                  @close-option-panel="showPanel = false"
                ></more-option-panel>
              </div>
              <bookmark :currentStory="story"></bookmark>
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
          <img v-show="story.cover" :src="story.cover" alt="story-cover" />
        </router-link>
      </div>
    </base-card>
  </section>
</template>

<script>
import BaseTag from "@/components/UI/BaseTag.vue";
import MoreOptionPanel from "@/components/MoreOptionPanel.vue";
import { timeFormatMixin } from "@/mixins/timeFormatMixin";
import Bookmark from "@/components/UI/Bookmark.vue";

export default {
  name: "StoryIntroRect",
  props: ["story"],
  components: { BaseTag, MoreOptionPanel, Bookmark },
  mixins: [timeFormatMixin],
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.story-wrapper {
  margin: 2rem 1rem;

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
      &:hover .content-title {
        color: #117096;
      }
    }

    .story-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 1rem;

      @media (min-width: $bp-iphone-ten) {
        justify-content: space-between;
      }

      .left-side {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        @media (min-width: $bp-iphone-ten) {
          justify-content: flex-start;
        }
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
        position: relative;

        @media (min-width: $bp-iphone-ten) {
          display: flex;
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
          right: -3.4rem;
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
