import moment from "moment";

export const timeFormatMixin = {
  computed: {
    createdTime() {
      const timestamp = this.story.createdAt.toDate();
      moment.locale("zh-cn");
      return moment(timestamp).format("lll");
    },
  },
};
