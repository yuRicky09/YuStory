<template>
  <div class="search">
    <div class="search-box" :class="{ active: showSearchBar }">
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
    <base-modal
      :show="show"
      message="請輸入搜尋內容"
      @close-modal="show = false"
    >
      <template #action>
        <button @click="show = false">確定</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import dropdown from "vue-dropdowns";

export default {
  name: "SearchBar",
  data() {
    return {
      show: false,
      showSearchBar: false,
      options: [{ name: "找標題" }, { name: "找標籤" }, { name: "找作者" }],
      selectedOption: {
        name: "找標題",
      },
      search: "",
      type: "title",
    };
  },
  components: { dropdown },
  methods: {
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    handleSelected(option) {
      const { name } = option;
      if (name === "找標題") {
        this.type = "title";
      } else if (name === "找標籤") {
        this.type = "tags";
      } else if (name === "找作者") {
        this.type = "userName";
      }
    },
    searching() {
      if (!this.search) {
        this.show = true;
      } else {
        this.$router
          .push({
            name: "Search",
            params: { search: this.search, type: this.type },
          })
          .catch(() => {});
        this.search = "";
        // this.showSearchBar = false;
      }
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

  .search-input {
    width: 30rem;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    margin: 0 1rem;
  }

  .search-box {
    display: flex;
    align-items: center;

    .search-input {
      transform: scaleX(0);
      transform-origin: right;
      transition: all 0.2s ease-out;
    }

    .my-dropdown-toggle {
      opacity: 0;
      transition: all 0.2s ease-out;
    }
  }

  .search-box.active {
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
  }
}
</style>
