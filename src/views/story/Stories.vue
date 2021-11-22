<template>
  <div class="stories-container">
    <div class="stories-header">
      <h2>Stories</h2>
    </div>
    <div class="stories-body">
      <main class="left-side">
        <div class="story-list" v-if="stories">
          <story-intro-rect
            v-for="story in currentPageStories"
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
              :to="{
                name: 'Tags',
                params: { tagName: tag },
                query: { page: 1 },
              }"
              v-for="tag in recommendedTags"
              :key="tag"
            >
              <base-tag :tagName="tag" :big="true"></base-tag>
            </router-link>
          </side-box>
        </div>
      </aside>
    </div>
    <pagination
      :totalItems="stories.length"
      :itemPerPage="itemPerPage"
      :page="currentPage"
    ></pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import SideBox from "@/components/UI/SideBox.vue";
import BaseTag from "@/components/UI/BaseTag.vue";
import Pagination from "@/components/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";

export default {
  name: "Stories",
  components: { StoryIntroRect, SideBox, BaseTag, Pagination },
  mixins: [paginationMixin],
  computed: {
    stories() {
      return this.$store.state.story.stories;
    },
    currentPageStories() {
      return this.stories.slice(this.pageFirstIndex, this.pageLastIndex);
    },
    ...mapGetters("story", [
      "recentlyStories",
      "recommendedTags",
      "popularStories",
    ]),
  },
};
</script>
