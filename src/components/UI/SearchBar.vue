<template>
  <div class="search">
    <div class="search-bar" :class="{ active: showSearchBar }">
      <input
        type="text"
        class="search-input"
        v-model.trim="search"
        @keydown.enter="searching"
      />
      <dropdown
        class="my-dropdown-toggle"
        :options="options"
        :selected="selectedOption"
        @updateOption="handleSelected"
      ></dropdown>
    </div>
    <font-awesome-icon
      :icon="['fa', 'search']"
      class="search-icon"
      @click="toggleSearchBar"
    />
  </div>
</template>

<script>
import dropdown from "vue-dropdowns";

export default {
  name: "SearchBar",
  data() {
    return {
      showSearchBar: false,
      options: [{ name: "找故事" }, { name: "找標籤" }, { name: "找作者" }],
      selectedOption: {
        name: "找故事",
      },
      search: "",
      type: "story",
    };
  },
  components: { dropdown },
  methods: {
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    handleSelected(option) {
      const { name } = option;
      if (name === "找故事") {
        this.type = "story";
      } else if (name === "找標籤") {
        this.type = "tags";
      } else if (name === "找作者") {
        this.type = "userName";
      }
    },
    searching() {
      if (this.search) {
        this.$router
          .push({
            name: "Search",
            query: { type: this.type, search: this.search, page: 1 },
          })
          .catch(() => {});
        this.search = "";
      } else {
        this.$router
          .push({
            name: "Search",
            query: { type: this.type, page: 1 },
          })
          .catch(() => {});
      }
      this.showSearchBar = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: none;

  @media (min-width: $bp-lg) {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .search-bar {
    display: flex;
    align-items: center;

    .search-input {
      border-radius: 2rem;
      padding: 0.5rem 1rem;
      margin: 0 1rem;
      transform: scaleX(0);
      transform-origin: right;
      transition: all 0.2s ease-out;

      @media (min-width: $bp-xl) {
        min-width: 30rem;
      }
    }

    .my-dropdown-toggle {
      opacity: 0;
      transition: all 0.2s ease-out;
    }
  }

  .search-bar.active {
    .search-input {
      transform: scaleX(1);
    }

    .my-dropdown-toggle {
      opacity: 1;
    }
  }

  .my-dropdown-toggle.btn-group {
    border-radius: 5px;
    min-width: 10rem;
    margin: 0 0.5rem;

    /deep/ .dropdown-toggle {
      min-width: inherit;
    }

    /deep/ .dropdown-menu {
      min-width: inherit;

      a {
        &:hover {
          color: #117096;
        }
      }
    }
  }

  .search-icon {
    cursor: pointer;
    margin-left: 1rem;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
