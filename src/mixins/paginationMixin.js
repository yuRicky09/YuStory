export const paginationMixin = {
  data() {
    return {
      itemPerPage: 5,
    };
  },
  computed: {
    currentPage() {
      return +this.$route.query.page;
    },
    pageFirstIndex() {
      return (this.currentPage - 1) * this.itemPerPage;
    },
    pageLastIndex() {
      return this.pageFirstIndex + this.itemPerPage;
    },
  },
};
