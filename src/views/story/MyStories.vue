<template>
  <div class="container">
    <div class="my-story-header">
      <h2>My Stories</h2>
      <router-link :to="{ name: 'CreateStory' }" class="btn"
        >撰寫故事</router-link
      >
    </div>
    <div class="select-action-area">
      <base-tab
        text="故事"
        @set-selected-tab="setSelectedTab"
        :class="{ active: selectedTab === '故事' }"
      ></base-tab>
      <base-tab
        text="草稿"
        @set-selected-tab="setSelectedTab"
        :class="{ active: selectedTab === '草稿' }"
      ></base-tab>
      <dropdown
        :options="options"
        :selected="selectedOption"
        @updateOption="handleSelected"
        class="my-dropdown-toggle"
      ></dropdown>
    </div>
    <template v-if="filteredItems.length > 0">
      <component
        :is="selectedTab === '故事' ? 'story-intro-rect' : 'my-draft-brief'"
        v-for="item in filteredItems"
        :key="item.id"
        :story="selectedTab === '故事' ? item : null"
        :draft="selectedTab === '草稿' ? item : null"
      ></component>
      <pagination
        :page="currentPage"
        :totalItems="
          selectedTab === '故事' ? myStories.length : myDrafts.length
        "
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
import BaseTab from "@/components/UI/BaseTab.vue";
import dropdown from "vue-dropdowns";

export default {
  name: "MyStorise",
  components: {
    StoryIntroRect,
    MyDraftBrief,
    Pagination,
    BaseTab,
    dropdown,
  },
  mixins: [paginationMixin],
  data() {
    return {
      sort: "desc",
      selectedTab: "故事",
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
    myDrafts() {
      const drafts = [...this.$store.state.story.drafts];
      if (this.sort === "desc") {
        return drafts;
      } else {
        return drafts.reverse();
      }
    },
    filteredItems() {
      if (this.selectedTab === "故事") {
        return this.myStories.slice(this.itemFirstIndex, this.itemLastIndex);
      } else {
        return this.myDrafts.slice(this.itemFirstIndex, this.itemLastIndex);
      }
    },
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
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
