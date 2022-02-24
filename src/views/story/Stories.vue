<template>
  <div class="stories-container">
    <div class="stories-header">
      <h2>Stories</h2>
    </div>
    <select-tab
      class="select-area"
      optionOne="最新"
      optionTwo="熱門"
      @select-option-one="selectOptionOne"
      @select-option-two="selectOptionTwo"
    ></select-tab>
    <div class="stories-body">
      <main class="left-side">
        <div class="story-list" v-if="stories && selectedType === '最新'">
          <story-intro-rect
            v-for="story in currentPageStories"
            :story="story"
            :key="story.id"
          ></story-intro-rect>
        </div>
        <div class="story-list" v-if="stories && selectedType === '熱門'">
          <story-intro-rect
            v-for="story in popularStories"
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
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import SelectTab from "@/components/UI/SelectTab.vue";

export default {
  name: "Stories",
  components: { StoryIntroRect, SideBox, BaseTag, Pagination, SelectTab },
  mixins: [paginationMixin],
  data() {
    return {
      selectedType: "最新",
    };
  },
  computed: {
    stories() {
      return this.$store.state.story.stories;
    },
    currentPageStories() {
      return this.stories.slice(this.pageFirstIndex, this.pageLastIndex);
    },
    popularStories() {
      return this.$store.getters["story/popularStories"];
    },
    currentPagePopStories() {
      return this.popularStories.slice(this.pageFirstIndex, this.pageLastIndex);
    },
    ...mapGetters("story", [
      "recentlyStories",
      "recommendedTags",
      "popularStoriesTen",
    ]),
  },
  methods: {
    selectOptionOne() {
      this.selectedType = "最新";
    },
    selectOptionTwo() {
      this.selectedType = "熱門";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/_stories";
</style>
