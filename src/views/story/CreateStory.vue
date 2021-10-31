<template>
  <div class="container">
    <div class="page-title">
      <h2>Write a story</h2>
    </div>
    <div class="story-header">
      <input
        type="text"
        placeholder="故事標題"
        class="story-title"
        v-model="title"
      />
      <div class="story-cover">
        <button>上傳封面</button>
        <button>預覽封面</button>
      </div>
    </div>
    <div class="editor-wrapper">
      <vue-editor
        class="vue-editor"
        v-model="content"
        :editorOptions="editorSettings"
        :useCustomImageHandler="useCustomImageHandler"
        :editor-toolbar="customToolBar"
        @image-added="handleImageAdded"
        ref="editor"
      ></vue-editor>
    </div>
    <div>
      <div class="story-tags">
        <div>
          <font-awesome-icon :icon="['fa', 'tags']" />
          <label for="tags">Tags</label>
        </div>
        <div>
          <input
            type="text"
            placeholder="標籤最多3個"
            id="tags"
            v-model.trim="tag"
            @keydown.enter="addTag"
          />
        </div>
        <ul class="tags-list">
          <div class="tags-warn" v-if="tagWarnMessage">
            {{ tagWarnMessage }}
          </div>
          <li>
            <base-badge
              v-for="tag in tags"
              :key="tag"
              :tagName="tag"
              @delete-tag="deleteTag"
            ></base-badge>
          </li>
        </ul>
      </div>
      <div class="story-action">
        <button class="ghost">
          <font-awesome-icon :icon="['fa', 'save']" class="action-icon" /><span
            >備份</span
          >
        </button>
        <button class="ghost">
          <font-awesome-icon :icon="['fa', 'eye']" class="action-icon" /><span
            >預覽</span
          >
        </button>
        <button>
          <font-awesome-icon
            :icon="['fa', 'file-upload']"
            class="action-icon"
          /><span>發佈故事</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseBadge from "@/components/UI/BaseBadge.vue";
import { VueEditor, Quill } from "vue2-editor";
// 引入Quill module
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-vue";
// 語法高亮配置
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import { storage } from "@/firebase/config";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "CreateStory",
  components: { VueEditor, BaseBadge },
  data() {
    return {
      title: null,
      tag: null,
      tags: [],
      tagWarnMessage: "",
      // editor初始設定
      content: "開始撰寫故事......",
      useCustomImageHandler: true,
      customToolBar: [
        [{ header: [false, 1, 2, 3] }],
        ["bold", "italic", "underline", "strike"],
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
        "底線",
        "刪除線",
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
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const storageRef = storage.ref();
      const path = `story/cover`;
      const uploadPath = storageRef.child(path);
      await uploadPath.put(file);
      const downloadURL = await uploadPath.getDownloadURL();
      Editor.insertEmbed(cursorLocation, "image", downloadURL);
      resetUploader();
    },
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
    addTag() {
      if (this.tags.length >= 3) {
        this.tagWarnMessage = "標籤已超過3個";
        setTimeout(() => {
          this.tagWarnMessage = "";
        }, 1200);
      } else if (this.tags.includes(this.tag)) {
        this.tagWarnMessage = "標籤已存在";
        setTimeout(() => {
          this.tagWarnMessage = "";
        }, 1200);
      } else {
        this.tags.push(this.tag);
      }
      this.tag = "";
    },
    deleteTag(deleteTag) {
      this.tags = this.tags.filter((tag) => {
        return tag !== deleteTag;
      });
    },
  },
  computed: {},
  mounted() {
    this.editorInit();
  },
};
</script>

<style lang="scss" scoped>
.container {
  font-size: 1.4rem;

  @media (min-width: $bp-md) {
    padding: 4rem;
    font-size: 1.6rem;
  }

  @media (min-width: $bp-lg) {
    padding: 4rem 7rem;
    font-size: 1.6rem;
  }

  .page-title {
    font-size: 3.2rem;
    margin: 2rem 0;
  }

  .story-header {
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;

    @media (min-width: $bp-md) {
      flex-direction: row;
      row-gap: 0;
      column-gap: 5rem;
    }

    @media (min-width: $bp-lg) {
      justify-content: flex-start;
    }

    .story-title {
      width: 25rem;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #777;
      padding: 1.5rem;
      transition: all 0.3s ease-out;
      margin-right: 1rem;

      @media (min-width: $bp-md) {
        width: 30rem;
      }

      @media (min-width: $bp-lg) {
        width: 55rem;
      }

      &:focus {
        box-shadow: 0 1px 0 0 var(--color-bg-dark-2);
      }
    }

    .story-cover {
      button {
        margin: 0.4rem;
      }
    }
  }

  .editor-wrapper {
    height: 35rem;

    @media (min-width: $bp-sm) {
      height: 68rem;
    }

    .vue-editor {
      @media (min-width: $bp-sm) {
        height: 60rem;
      }
      width: 100%;
    }
  }

  .story-tags {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 0.8rem;
    padding: 2rem 1rem;
    border-bottom: 1px solid var(--color-border);

    @media (min-width: $bp-md) {
      flex-direction: row;
    }

    label {
      margin: 0 0.8rem;
    }

    input {
      width: 30rem;

      @media (min-width: $bp-md) {
        width: 40rem;
      }

      @media (min-width: $bp-lg) {
        width: 50rem;
      }
    }

    .tags-list {
      position: relative;

      .tags-warn {
        position: absolute;
        text-align: center;
        bottom: -5rem;
        left: 5px;
        width: 14rem;
        padding: 1rem;
        background-color: #fff;
        box-shadow: 0 2px 5px var(--color-layout);
        border-radius: 5px;

        &::before {
          content: "";
          position: absolute;
          top: -5px;
          left: 20px;
          transform: rotate(45deg);
          width: 1rem;
          height: 1rem;
          background: #fff;
          box-shadow: 0 2px 5px var(--color-layout);
          z-index: -10;
        }
      }
    }
  }

  .story-action {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (min-width: $bp-md) {
      justify-content: flex-end;
    }

    > button {
      margin: 1.5rem 1rem;
    }

    .action-icon {
      display: none;

      @media (min-width: $bp-sm) {
        display: inline-block;
      }
      margin-right: 1rem;
    }
  }
}
</style>
