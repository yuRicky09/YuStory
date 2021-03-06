<template>
  <div class="stories-container">
    <div class="stories-header">
      <h2><font-awesome-icon :icon="['fa', 'tags']" />Tag: {{ tagName }}</h2>
      <p class="matching-result">共有 {{ matchingStories.length }} 筆相關</p>
    </div>
    <div class="stories-body">
      <main class="left-side">
        <div class="story-list" v-if="matchingStories.length > 0">
          <story-intro-rect
            v-for="story in currentPageMatchingStories"
            :story="story"
            :key="story.id"
          ></story-intro-rect>
        </div>
        <div></div>
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
      :page="currentPage"
      :totalItems="matchingStories.length"
      :itemPerPage="itemPerPage"
    ></pagination>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import SideBox from "@/components/UI/SideBox.vue";
import BaseTag from "@/components/UI/BaseTag.vue";
import { db } from "@/firebase/config";
import { mapGetters } from "vuex";
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";

export default {
  name: "Tags",
  components: { StoryIntroRect, SideBox, BaseTag, Pagination },
  mixins: [paginationMixin],
  props: ["tagName"],
  data() {
    return {
      isLoading: false,
      matchingStories: [],
    };
  },
  computed: {
    ...mapGetters("story", ["recommendedTags", "recentlyStories"]),
    currentPageMatchingStories() {
      return this.matchingStories.slice(
        this.itemFirstIndex,
        this.itemLastIndex
      );
    },
  },
  methods: {
    async findMatchingStories(tagName) {
      try {
        const stories = [];
        const storiesRef = db
          .collection("stories")
          .where("tags", "array-contains", tagName);
        const res = await storiesRef.get();
        res.docs.forEach((doc) => {
          const story = { ...doc.data(), id: doc.id };
          stories.push(story);
        });

        this.matchingStories = stories;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  created() {
    this.findMatchingStories(this.tagName);
  },
  watch: {
    $route(newRoute) {
      if (newRoute.name === "Tags")
        this.findMatchingStories(newRoute.params.tagName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/_stories";
.matching-result {
  margin: 1rem;

  @media (min-width: $bp-md) {
    font-size: 1.6rem;
  }
}
</style>
