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
    itemFirstIndex() {
      return (this.currentPage - 1) * this.itemPerPage;
    },
    itemLastIndex() {
      return this.itemFirstIndex + this.itemPerPage;
    },
  },
};
