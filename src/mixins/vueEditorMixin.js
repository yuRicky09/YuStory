import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-vue";

import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export const vueEditorMixin = {
  components: { VueEditor },
  data() {
    return {
      content: "",
      useCustomImageHandler: true,
      customToolBar: [
        [{ header: [false, 1, 2, 3] }],
        ["bold", "italic"],
        [{ align: "" }, { align: "center" }, { align: "right" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      tooltips: [
        "粗體",
        "斜線",
        "靠左對齊",
        "置中對齊",
        "靠右對齊",
        "引言",
        "插入程式碼",
        "有序清單",
        "無序清單",
        "取消縮排",
        "縮排",
        "連結",
        "插入圖片",
        "插入影片",
        "清除格式",
      ],
    };
  },
  methods: {
    editorInit() {
      const toolbar = this.$refs.editor.$el.children[0];
      const allBtn = toolbar.querySelectorAll("button");
      const headerBtn = toolbar.querySelector(".ql-header");
      const textColorBtn = toolbar.querySelector(".ql-color-picker");
      const textBgBtn = toolbar.querySelector(".ql-background");

      headerBtn.setAttribute("title", "標題");
      textColorBtn.setAttribute("title", "文字顏色");
      textBgBtn.setAttribute("title", "背景顏色");

      allBtn.forEach((btn, index) => {
        btn.setAttribute("title", this.tooltips[index]);
      });
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      try {
        this.errorMsg = null;
        console.log("圖片被添加了");
        const coverDownloadURL = await this.$store.dispatch(
          "story/addStoryImg",
          {
            file,
            Editor,
            cursorLocation,
            resetUploader,
          }
        );

        this.pendingCovers.push(coverDownloadURL);
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    async handleImageRemoved(file) {
      this.pendingCovers = this.pendingCovers.filter((cover) => cover !== file);
      this.$store.dispatch("story/removeImg", file);
    },
  },
  mounted() {
    // 要抓取到真實DOM的話，必須等真實DOM掛載完畢的mounted階段才能獲取。
    this.editorInit();
  },
};
