<template>
  <div class="container">
    <div class="search-title">
      <h2>搜尋結果</h2>
    </div>
    <ul class="type-list">
      <li
        class="type"
        :class="{ active: searchingType === 'story' }"
        @click="setSearchingType('story')"
      >
        故事
      </li>
      <li
        class="type"
        :class="{ active: searchingType === 'tags' }"
        @click="setSearchingType('tags')"
      >
        標籤
      </li>
      <li
        class="type"
        :class="{ active: searchingType === 'userName' }"
        @click="setSearchingType('userName')"
      >
        作者
      </li>
    </ul>
    <div class="search-bar">
      <input
        type="text"
        v-model.trim="searchingText"
        placeholder="請輸入搜尋內容......"
        @keydown.enter="searching"
      />
      <button class="search-btn" @click="searching">搜尋</button>
    </div>
    <div class="search-result">
      <p>
        搜尋 <span>{{ search }}</span> 共有 {{ matchingStories.length }} 筆相關
      </p>
    </div>
    <template v-if="currentPageMatchStories.length > 0">
      <div class="matching-stories">
        <story-intro-rect
          v-for="story in currentPageMatchStories"
          :key="story.id"
          :story="story"
        ></story-intro-rect>
      </div>
      <pagination
        :totalItems="matchingStories.length"
        :itemPerPage="itemPerPage"
        :page="currentPage"
      ></pagination>
    </template>
    <div class="no-result" v-else>
      <p>查無結果</p>
    </div>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";
import Pagination from "@/components/UI/Pagination.vue";
import { paginationMixin } from "@/mixins/paginationMixin";

export default {
  name: "Search",
  props: ["search", "type"],
  components: { StoryIntroRect, Pagination },
  mixins: [paginationMixin],
  data() {
    return {
      matchingStories: null,
      searchingText: "",
      searchingType: null,
    };
  },
  computed: {
    storires() {
      return this.$store.state.story.stories;
    },
    currentPageMatchStories() {
      return this.matchingStories.slice(
        this.pageFirstIndex,
        this.pageLastIndex
      );
    },
  },
  created() {
    this.searchingType = this.type;
  },
  methods: {
    matchingItems() {
      this.matchingStories = [];
      if (!this.search) return;
      const searchText = this.search.toLowerCase();
      if (this.type === "userName") {
        this.matchingStories = this.storires.filter((story) =>
          story.userName.toLowerCase().includes(searchText)
        );
      } else if (this.type === "story") {
        this.matchingStories = this.storires.filter((story) => {
          // 去除HTML tag
          const content = story.HTML.replace(/<[^>]*>/g, "");
          const storyAllText = (story.title + " " + content).toLowerCase();
          return storyAllText.includes(searchText);
        });
      } else if (this.type === "tags") {
        this.matchingStories = this.storires.filter((story) => {
          const { tags } = story;
          for (let tag of tags) {
            const tagLC = tag.toLowerCase();
            if (tagLC.includes(searchText)) return true;
          }
        });
      }
    },
    searching() {
      if (this.searchingText) {
        this.$router
          .push({
            name: "Search",
            query: {
              type: this.searchingType,
              search: this.searchingText,
              page: 1,
            },
          })
          .catch(() => {});
        this.searchingText = "";
      } else {
        this.$router
          .push({
            name: "Search",
            query: { type: this.searchingType, page: 1 },
          })
          .catch(() => {});
      }
    },
    setSearchingType(searchingType) {
      this.searchingType = searchingType;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.matchingItems();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 102rem;
  margin: auto;
  padding: 6rem 2rem;
  font-size: 1.4rem;

  @media (min-width: $bp-iphone-ten) {
    font-size: 1.6rem;
  }

  .search-title {
    margin: 2rem 0;
    h2 {
      font-size: 2.6rem;

      @media (min-width: $bp-md) {
        font-size: 3.6rem;
      }
    }
  }
  .type-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    .type {
      cursor: pointer;
      padding: 1rem 1.5rem;
      margin: 0 0.5rem;
      color: #000;
      transition: all 0.2s ease-out;
      position: relative;

      @media (min-width: $bp-iphone-ten) {
        padding: 1rem 3rem;
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #000;
        bottom: 0;
        left: 0;
        transform: scale(0);
        transform-origin: left;
        transition: all 0.3s ease-out;
      }

      &:hover {
        opacity: 0.6;

        &::before {
          transform: scale(1);
        }
      }
    }

    .type.active {
      background-color: var(--color-bg-dark-2);
      color: #fff;

      &:hover {
        opacity: 1;

        &::before {
          transform: scale(0);
        }
      }
    }
  }

  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;

    > input {
      padding: 15px 10px 15px 25px;
    }

    > .search-btn {
      position: relative;
      left: -3px;
      width: 12rem;
      align-self: stretch;
      border: none;
      color: #fff;
      background-color: var(--color-bg-dark-2);
      cursor: pointer;
      font-size: 1.6rem;

      &:hover {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        opacity: 0.9;
      }
    }
  }

  .search-result {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);

    span {
      color: #e74c4cef;
    }
  }
  .matching-stories {
    padding: 3rem 0;
  }

  .no-result {
    margin-top: 5rem;
    text-align: center;
    font-size: 2rem;
    color: #e74c4cef;
  }
}
</style>
