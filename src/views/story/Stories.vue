<template>
  <div class="stories-container">
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
        <div class="popular-stories">
          <side-box title="熱門故事">
            <ul class="list">
              <li v-for="story in popularStories" :key="story.id">
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
    ...mapGetters("story", [
      "recentlyStories",
      "recommendedTags",
      "popularStories",
    ]),
  },
};
</script>
