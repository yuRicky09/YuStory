import moment from "moment";

export const timeFormatMixin = {
  methods: {
    createdTime(timestamp) {
      moment.locale("zh-cn");
      return moment(timestamp).format("lll");
    },
    createdTimeSimple(timestamp) {
      moment.locale("zh-cn");
      return moment(timestamp).format("l");
    },
  },
};
