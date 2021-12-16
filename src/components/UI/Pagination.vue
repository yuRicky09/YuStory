<template>
  <ul class="pagination">
    <li class="page-item">
      <button
        class="prePageBtn"
        :class="{ disable: currentPage === 1 }"
        @click="toPrePage"
      >
        &laquo;
      </button>
    </li>
    <li
      class="page-item"
      v-for="(btnText, index) in visiblePageBtns"
      :key="index"
    >
      <button
        class="pageBtn"
        :class="{
          active: currentPage === btnText,
          ellipsis: btnText === '...',
        }"
        @click="changeCurrentPage(btnText)"
      >
        {{ btnText }}
      </button>
    </li>
    <li class="page-item">
      <button
        class="nextPageBtn"
        :class="{ disable: currentPage === totalPages }"
        @click="toNextPage"
      >
        &raquo;
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "PageNation",
  props: ["totalItems", "page", "itemPerPage"],
  data() {
    return {
      currentPage: this.page,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemPerPage);
    },
    visiblePageBtns() {
      if (this.totalPages <= 9) {
        return this.totalPages;
      } else if (this.currentPage <= 3) {
        return [1, 2, 3, 4, "...", this.totalPages];
      } else if (this.currentPage + 3 > this.totalPages) {
        return [
          1,
          "...",
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        ];
      } else {
        return [
          1,
          "...",
          this.currentPage - 2,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          this.currentPage + 2,
          "...",
          this.totalPages,
        ];
      }
    },
  },
  methods: {
    changeCurrentPage(btnText) {
      if (btnText === "...") return;
      this.currentPage = btnText;
      this.goToSelectedPage();
    },
    toPrePage() {
      if (this.currentPage === 1) return;
      this.currentPage--;
      this.goToSelectedPage();
    },
    toNextPage() {
      if (this.currentPage === this.totalPages) return;
      this.currentPage++;
      this.goToSelectedPage();
    },
    goToSelectedPage() {
      if (this.$route.name === "Search") {
        this.$router
          .push({
            name: this.$route.name,
            query: {
              page: this.currentPage,
              type: this.$route.query.type,
              search: this.$route.query.search,
            },
          })
          .catch(() => {});
      } else {
        this.$router
          .push({
            name: this.$route.name,
            query: {
              page: this.currentPage,
            },
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;

  .page-item {
    margin: 0 5px;
  }

  .page-item button {
    color: var(--color-dark-1);
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid var(--color-border);
    transition: all 0.2s;
    font-size: 1.4rem;
    line-height: 3.8rem;
    padding: 0 1.3rem;
    font-weight: 600;
  }

  .prePageBtn.disable {
    cursor: not-allowed;
    color: #ccc;
  }

  .nextPageBtn.disable {
    cursor: not-allowed;
    color: #ccc;
  }

  .pageBtn.active {
    background-color: var(--color-dark-3);
    color: #fff;
    border: 1px solid var(--color-dark-3);
  }

  .pageBtn:hover {
    background-color: var(--color-dark-3);
    color: #fff;
    border: 1px solid var(--color-dark-3);
  }

  .pageBtn.ellipsis {
    cursor: text;
    color: #ccc;
    border: none;

    &:hover {
      background: unset;
      color: #ccc;
      border: unset;
    }
  }
}
</style>
