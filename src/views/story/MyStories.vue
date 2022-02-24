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
      <dropdown
        :options="options"
        :selected="selectedOption"
        @updateOption="handleSelected"
        class="my-dropdown-toggle"
      ></dropdown>
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
      <p>尚未有任何故事或草稿</p>
    </div>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import MyDraftBrief from "@/components/story/MyDraftBrief.vue";
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";
import SelectTab from "@/components/UI/SelectTab.vue";
import dropdown from "vue-dropdowns";

export default {
  name: "MyStorise",
  components: { StoryIntroRect, MyDraftBrief, Pagination, SelectTab, dropdown },
  mixins: [paginationMixin],
  data() {
    return {
      sort: "desc",
      selectedType: "故事",
      options: [{ name: "新到舊" }, { name: "舊到新" }],
      selectedOption: {
        name: "新到舊",
      },
    };
  },
  computed: {
    myStories() {
      const stories = [...this.$store.getters["story/myStories"]];
      if (this.sort === "desc") {
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
      if (this.sort === "desc") {
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
    handleSelected(option) {
      const { name } = option;
      if (name === "新到舊") {
        this.sort = "desc";
      } else if (name === "舊到新") {
        this.sort = "asc";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/_story-empty";
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

    a.btn {
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

    .my-dropdown-toggle.btn-group {
      display: none;
      border-radius: 5px;
      min-width: 10rem;
      border-bottom: none;
      margin: 0;
      font-size: 1.6rem;

      @media (min-width: $bp-lg) {
        display: inline-block;
      }
      /deep/ .dropdown-toggle {
        min-width: inherit;
        color: #000;
        padding: 8px 15px;
        margin: 0;
        background: none;
      }

      /deep/ .dropdown-menu {
        min-width: inherit;

        a {
          &:hover {
            color: var(--color-link-hover);
          }
        }
      }
    }
  }
}
</style>
