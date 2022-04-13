<template>
  <div class="stories-container">
    <div class="stories-header">
      <h2>Stories</h2>
    </div>
    <div class="select-area">
      <base-tab
        text="最新"
        @set-selected-tab="setSelectedTab"
        :class="{ active: selectedTab === '最新' }"
      ></base-tab>
      <base-tab
        text="熱門"
        @set-selected-tab="setSelectedTab"
        :class="{ active: selectedTab === '熱門' }"
      ></base-tab>
    </div>
    <div class="stories-body">
      <main class="left-side">
        <div class="story-list">
          <story-intro-rect
            v-for="story in filteredStories"
            :story="story"
            :key="story.id"
          ></story-intro-rect>
        </div>
      </main>
      <aside class="right-side">
        <div class="recently-stories">
          <side-box title="最新故事">
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
              <li v-for="story in popularStoriesTen" :key="story.id">
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
              <base-tag :tagName="tag" tagClass="big"></base-tag>
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
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import BaseTab from "@/components/UI/BaseTab.vue";

export default {
  name: "Stories",
  components: {
    StoryIntroRect,
    SideBox,
    BaseTag,
    Pagination,
    BaseTab,
  },
  mixins: [paginationMixin],
  data() {
    return {
      selectedTab: "最新",
    };
  },
  computed: {
    stories() {
      return this.$store.state.story.stories;
    },
    filteredStories() {
      if (this.selectedTab === "最新") {
        return this.stories.slice(this.itemFirstIndex, this.itemLastIndex);
      } else {
        const popularStories = this.$store.getters["story/popularStories"];
        return popularStories.slice(this.itemFirstIndex, this.itemLastIndex);
      }
    },
    ...mapGetters("story", [
      "recentlyStories",
      "recommendedTags",
      "popularStoriesTen",
    ]),
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/_stories";
</style>
