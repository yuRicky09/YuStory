<template>
  <div class="container">
    <div class="my-story-header">
      <h2>My Stories</h2>
      <router-link :to="{ name: 'CreateStory' }" class="btn"
        >撰寫故事</router-link
      >
    </div>
    <div class="select-action-area">
      <select-story-tab
        class="tab"
        @select-story="changeToStory"
        @select-draft="changeToDraft"
      ></select-story-tab>
      <div class="sort-controller">
        <select v-model="selected" class="sort-type">
          <option value="" disabled>排序方式</option>
          <option value="desc">新到舊</option>
          <option value="asc">舊到新</option>
        </select>
      </div>
    </div>
    <template v-if="myStories.length > 0 && itemType === 'story'">
      <story-intro-rect
        v-for="story in currentPageMyStories"
        :key="story.id"
        :story="story"
      ></story-intro-rect>
      <pagination
        :page="currentPage"
        :totalItems="myStories.length"
        :itemPerPage="itemPerPage"
      ></pagination>
    </template>
    <template v-else-if="myDrafts.length > 0 && itemType === 'draft'">
      <my-draft-brief
        v-for="draft in currentPageMyDrafts"
        :key="draft.id"
        :draft="draft"
      ></my-draft-brief>
      <pagination
        :page="currentPage"
        :totalItems="myDrafts.length"
        :itemPerPage="itemPerPage"
      ></pagination>
    </template>
    <div v-else class="story-empty">
      <p>尚未發佈任何故事</p>
    </div>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import SelectStoryTab from "@/components/story/SelectStoryTab.vue";
import MyDraftBrief from "@/components/story/MyDraftBrief.vue";
import Pagination from "@/components/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";

export default {
  name: "MyStorise",
  components: { StoryIntroRect, SelectStoryTab, MyDraftBrief, Pagination },
  mixins: [paginationMixin],
  data() {
    return {
      selected: "",
      itemType: "story",
    };
  },
  computed: {
    myStories() {
      const stories = [...this.$store.getters["story/myStories"]];
      if (this.selected === "" || this.selected === "desc") {
        return stories;
      } else {
        return stories.reverse();
      }
    },
    currentPageMyStories() {
      return this.myStories.slice(this.pageFirstIndex, this.pageLastIndex);
    },
    myDrafts() {
      const drafts = [...this.$store.state.story.drafts];
      if (this.selected === "" || this.selected === "desc") {
        return drafts;
      } else {
        return drafts.reverse();
      }
    },
    currentPageMyDrafts() {
      return this.myDrafts.slice(this.pageFirstIndex, this.pageLastIndex);
    },
  },
  methods: {
    changeToStory() {
      this.itemType = "story";
    },
    changeToDraft() {
      this.itemType = "draft";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 102rem;
  margin: auto;
  padding: 6rem 2rem;

  .my-story-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 4rem;

    @media (min-width: $bp-md) {
      padding: 0 4rem;
    }

    @media (min-width: $bp-xl) {
      padding: 0;
    }

    h2 {
      font-size: 2.6rem;

      @media (min-width: $bp-md) {
        font-size: 3.6rem;
      }
    }

    a.button {
      font-size: 1.4rem;
      padding: 0.8rem 1rem;
      @media (min-width: $bp-md) {
        padding: 1rem 2rem;
      }
    }
  }

  .select-action-area {
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--color-border);

    .tab {
      margin: 0 1rem;
    }

    .sort-controller {
      margin: 0 2rem;
      font-size: 1.4rem;
      select {
        outline: none;
        padding: 0.8rem;
      }
    }
  }
}
</style>
