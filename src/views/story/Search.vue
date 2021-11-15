<template>
  <div class="container">
    <div class="search-result">
      <h2>搜尋結果</h2>
      <p>共有 {{ matchingStories.length }} 比相關</p>
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
    <div class="matching-stories" v-if="matchingStories.length > 0">
      <story-intro-rect
        v-for="story in matchingStories"
        :key="story.id"
        :story="story"
      ></story-intro-rect>
    </div>
    <div v-else>
      <p>查無結果</p>
    </div>
  </div>
</template>

<script>
import StoryIntroRect from "@/components/story/StoryIntroRect.vue";

export default {
  name: "Search",
  props: ["search", "type"],
  components: { StoryIntroRect },
  data() {
    return {
      matchingStories: null,
      searchingText: "",
      searchingType: "story",
    };
  },
  computed: {
    storires() {
      return this.$store.state.story.stories;
    },
  },
  methods: {
    matchingItems() {
      if (!this.search) return (this.matchingStories = []);
      if (this.type === "userName") {
        const regex = new RegExp(this.search, "gi");
        this.matchingStories = this.storires.filter((story) =>
          regex.test(story.userName)
        );
      } else if (this.type === "story") {
        // ?! === negative lookahead, 找尋的目標的'後方'符合此negative lookahead的條件的話就刪去。 這邊用來ignore HTML標籤
        const str = `(${this.search})(?![^<]*>)`;
        const regex = new RegExp(str, "gi");
        this.matchingStories = this.storires.filter((story) => {
          const storyAllText = story.title + story.HTML;
          return regex.test(storyAllText);
        });
      } else if (this.type === "tags") {
        const regex = new RegExp(this.search, "gi");
        this.matchingStories = this.storires.filter((story) => {
          const { tags } = story;
          for (let tag of tags) {
            if (regex.test(tag)) return true;
          }
        });
      }
    },
    searching() {
      if (this.searchingText) {
        this.$router
          .push({
            name: "Search",
            params: { type: this.searchingType, search: this.searchingText },
          })
          .catch(() => {});
        this.searchingText = "";
      } else {
        this.$router
          .push({
            name: "Search",
            params: { type: this.searchingType },
          })
          .catch(() => {});
      }
    },
    setSearchingType(type) {
      this.searchingType = type;
    },
  },
  watch: {
    search: {
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
  font-size: 1.6rem;

  .search-result {
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
      padding: 1rem 3rem;
      color: #000;
      transition: all 0.2s ease-out;

      &:hover {
        opacity: 0.8;
      }
    }

    .type.active {
      background-color: var(--color-bg-dark-2);
      color: #fff;

      &:hover {
        opacity: 1;
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

  .matching-stories {
    padding: 3rem 0;
  }
}
</style>
