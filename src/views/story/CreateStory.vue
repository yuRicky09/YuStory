<template>
  <div class="container">
    <div class="page-title">
      <h2>Write a story</h2>
      <span v-if="errorMsg" class="error-msg">{{ errorMsg }}</span>
    </div>
    <div class="story-header">
      <input
        type="text"
        placeholder="故事標題"
        class="story-title"
        v-model="title"
      />
    </div>
    <div class="editor-wrapper">
      <vue-editor
        class="vue-editor"
        v-model="content"
        :editorOptions="editorSettings"
        :useCustomImageHandler="useCustomImageHandler"
        :editor-toolbar="customToolBar"
        @image-added="handleImageAdded"
        @image-removed="handleImageRemoved"
        placeholder="插入圖片後即可選擇封面"
        ref="editor"
      ></vue-editor>
    </div>
    <the-carousel
      v-if="pendingCovers.length > 0"
      :pendingCovers="pendingCovers"
      @cover-active-index="handleCoverActiveIndex"
    ></the-carousel>
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
            <base-tag v-for="tag in tags" :key="tag" :tagName="tag">
              <font-awesome-icon
                :icon="['fa', 'times']"
                @click="deleteTag(tag)"
                class="tag-icon"
              />
            </base-tag>
          </li>
        </ul>
      </div>
      <div class="story-action">
        <button class="ghost" @click="saveDraft">
          <font-awesome-icon :icon="['fa', 'save']" class="action-icon" /><span
            >備份</span
          >
        </button>
        <button class="ghost" @click="showPreview = true">
          <font-awesome-icon :icon="['fa', 'eye']" class="action-icon" /><span
            >預覽</span
          >
        </button>
        <button @click="publishStory">
          <font-awesome-icon
            :icon="['fa', 'file-upload']"
            class="action-icon"
          /><span>發佈故事</span>
        </button>
      </div>
    </div>
    <!-- story preview -->
    <story-preview
      :showPreview="showPreview"
      :storyHTML="content"
      @close-story-preview="showPreview = false"
    ></story-preview>
    <base-modal :message="modalMsg" :show="show" @close-modal="show = false">
      <template #action>
        <button @click="show = false">確定</button>
      </template>
    </base-modal>
    <base-spinner v-if="isLoading"></base-spinner>
  </div>
</template>

<script>
import BaseTag from "@/components/UI/BaseTag.vue";
import TheCarousel from "@/components/TheCarousel";
import StoryPreview from "@/components/story/StoryPreview.vue";
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-vue";
// 語法高亮配置
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "CreateStory",
  components: {
    VueEditor,
    BaseTag,
    TheCarousel,
    StoryPreview,
  },
  data() {
    return {
      title: null,
      tag: null,
      tags: [],
      docId: null,
      tagWarnMessage: "",
      showCover: false,
      errorMsg: null,
      show: false,
      modalMsg: null,
      coverActiveIndex: 0,
      pendingCovers: [],
      storyCover: null,
      showPreview: false,
      // editor初始設定
      content: "",
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
  computed: {
    userId() {
      return this.$store.state.auth.userId;
    },
    isLoading() {
      return this.$store.state.story.isLoading;
    },
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
    // 標籤處理
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
    handleCoverActiveIndex(index) {
      this.coverActiveIndex = index;
    },
    // 故事發佈、備份等處理
    async publishStory() {
      try {
        if (!this.title || !this.content) {
          this.modalMsg = "請確切填寫故事標題與內容，標題與內容不得為空";
          this.show = true;
        } else {
          // 擷取文章前九十字當簡介
          const brief = this.$refs.editor.$el.innerText
            .replace(/\n/g, " ")
            .slice(0, 90);

          if (this.pendingCovers.length > 0) {
            this.storyCover = this.pendingCovers[this.coverActiveIndex];
          }

          const storyId = await this.$store.dispatch("story/publishStory", {
            storyTitle: this.title,
            storyHTML: this.content,
            storyTags: this.tags,
            storyCover: this.storyCover,
            storyBrief: brief,
          });

          this.$router.push({ name: "Story", params: { id: storyId } });
        }
      } catch (err) {
        this.errorMsg = err;
      }
    },
    async saveDraft() {
      try {
        const id = await this.$store.dispatch("story/saveDraft", {
          storyTitle: this.title,
          storyHTML: this.content,
          storyTags: this.tags,
          docId: this.docId,
        });

        this.docId = id;
        this.modalMsg = "備份成功";
        this.show = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
  mounted() {
    // 要抓取到真實DOM的話，必須等真實DOM掛載完畢的mounted階段才能獲取。
    this.editorInit();
  },
  beforeRouteLeave(_, _2, next) {
    if (this.title || this.content || this.tags.length > 0) {
      const res = confirm(
        "確定要離開嗎?\n未備份的情況下離開，內容將不會被保存。"
      );
      if (res) next();
    } else {
      next();
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
  margin: auto;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .story-header {
    margin: 1.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

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
  }

  .editor-wrapper {
    height: 49rem;
    @media (min-width: $bp-md) {
      height: 57rem;
    }
  }
  .vue-editor {
    height: 38rem;
    @media (min-width: $bp-md) {
      height: 48rem;
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

      .tag-icon {
        cursor: pointer;
      }

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
