<template>
  <div class="container">
    <div class="stories-header">
      <h2>Stories</h2>
    </div>
    <div class="stories-body">
      <main class="left-side">
        <div class="story-list" v-if="stories">
          <story-intro-rect
            v-for="story in stories"
            :story="story"
            :key="story.id"
          ></story-intro-rect>
        </div>
      </main>
      <aside class="right-side">
        <div class="recently-stories">
          <side-box title="近期故事">
            <ul class="list">
              <li v-for="story in recentlyStories" :key="story.id">
                <router-link :to="{ name: 'Story', params: { id: story.id } }">
                  {{ story.title }}
                </router-link>
              </li>
            </ul>
          </side-box>
        </div>
        <div class="recommendedTags">
          <side-box title="推薦Tags">
            <router-link
              class="tag"
              :to="{ name: 'Tags', params: { tagName: tag } }"
              v-for="tag in recommendedTags"
              :key="tag"
            >
              <base-tag :tagName="tag" :big="true"></base-tag>
            </router-link>
          </side-box>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import SideBox from "@/components/UI/SideBox.vue";
import BaseTag from "@/components/UI/BaseTag.vue";

export default {
  name: "Stories",
  components: { StoryIntroRect, SideBox, BaseTag },
  computed: {
    stories() {
      return this.$store.state.story.stories;
    },
    ...mapGetters("story", ["recentlyStories", "recommendedTags"]),
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 120rem;
  margin: auto;
  font-size: 1.4rem;
  padding: 6rem 2rem;

  .stories-header {
    margin: 2rem 0;
    h2 {
      font-size: 2.6rem;

      @media (min-width: $bp-md) {
        font-size: 3.6rem;
      }
    }
  }

  .stories-body {
    display: flex;
    gap: 6rem;

    .left-side {
      max-width: 77rem;
    }

    .right-side {
      display: none;
      flex: 1;

      @media (min-width: $bp-lg) {
        display: block;
        max-width: 35rem;
      }

      .recently-stories {
        margin: 6rem 0;

        li {
          margin: 1rem 0;
          a {
            display: inline-block;
            padding: 0 1.5rem;
            position: relative;

            &::before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              width: 7px;
              height: 7px;
              border-radius: 50%;
              background-color: #ccc;
            }

            &:hover {
              color: #117096;
            }
          }
        }
      }

      .recommendedTags {
        .tag {
          margin: 0 4px 10px;
        }
      }
    }
  }
}
</style>
