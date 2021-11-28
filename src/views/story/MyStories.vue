<template>
  <div class="container">
    <div class="my-story-header">
      <h2>My Stories</h2>
      <router-link :to="{ name: 'CreateStory' }" class="btn"
        >撰寫故事</router-link
      >
    </div>
    <div class="select-action-area">
      <select-tab
        optionOne="故事"
        optionTwo="草稿"
        @select-option-one="selectOptionOne"
        @select-option-two="selectOptionTwo"
      ></select-tab>
      <div class="sort-controller">
        <select v-model="sort" class="sort-type">
          <option value="" disabled>排序方式</option>
          <option value="desc">新到舊</option>
          <option value="asc">舊到新</option>
        </select>
      </div>
    </div>
    <template v-if="myStories.length > 0 && selectedType === '故事'">
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
    <template v-else-if="myDrafts.length > 0 && selectedType === '草稿'">
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
import MyDraftBrief from "@/components/story/MyDraftBrief.vue";
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import SelectTab from "@/components/UI/SelectTab.vue";

export default {
  name: "MyStorise",
  components: { StoryIntroRect, MyDraftBrief, Pagination, SelectTab },
  mixins: [paginationMixin],
  data() {
    return {
      sort: "",
      selectedType: "故事",
    };
  },
  computed: {
    myStories() {
      const stories = [...this.$store.getters["story/myStories"]];
      if (this.sort === "" || this.sort === "desc") {
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
      if (this.sort === "" || this.sort === "desc") {
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
    selectOptionOne() {
      this.selectedType = "故事";
    },
    selectOptionTwo() {
      this.selectedType = "草稿";
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
