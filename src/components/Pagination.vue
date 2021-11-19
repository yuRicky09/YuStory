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
    <li class="page-item" v-for="index in totalPages" :key="index">
      <button
        class="pageBtn"
        :class="{ active: currentPage === index }"
        @click="changeCurrentPage(index)"
      >
        {{ index }}
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
  props: ["totalItems", "itemPerPage", "page"],
  data() {
    return {
      currentPage: this.page,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemPerPage);
    },
  },
  methods: {
    changeCurrentPage(index) {
      this.currentPage = index;
      this.goToselectedPage();
    },
    toPrePage() {
      this.currentPage === 1 ? (this.currentPage = 1) : this.currentPage--;
      this.goToselectedPage();
    },
    toNextPage() {
      this.currentPage === this.totalPage
        ? (this.currentPage = this.totalPage)
        : this.currentPage++;
      this.goToselectedPage();
    },
    goToselectedPage() {
      this.$router
        .push({ name: "Stories", query: { page: this.currentPage } })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;

  .page-item {
    margin: 0 5px;
  }

  .page-item button {
    color: var(--color-bg-dark-1);
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
    background-color: var(--color-bg-dark-3);
    color: #fff;
    border: 1px solid var(--color-bg-dark-3);
  }

  .pageBtn:hover {
    background-color: var(--color-bg-dark-3);
    color: #fff;
    border: 1px solid var(--color-bg-dark-3);
  }
}
</style>
