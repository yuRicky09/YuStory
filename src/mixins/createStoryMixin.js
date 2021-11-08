import BaseTag from "@/components/UI/BaseTag.vue";
import TheCarousel from "@/components/TheCarousel";
import StoryPreview from "@/components/story/StoryPreview.vue";

// 創建story跟編輯story需要的data,method極為相似，可複用的東西全拉到createStoryMixin。
export const createStoryMixin = {
  components: { BaseTag, TheCarousel, StoryPreview },
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
      saved: true,
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.story.isLoading;
    },
  },
  methods: {
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
    // 切換slide時獲取當下ActiveIndex
    handleCoverActiveIndex(index) {
      this.coverActiveIndex = index;
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
        this.saved = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
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
          this.saved = true;
          this.$router.push({ name: "Story", params: { id: storyId } });
        }
      } catch (err) {
        this.errorMsg = err;
      }
    },
  },
  watch: {
    title(newValue) {
      if (newValue) this.saved = false;
    },
    tags(newValue) {
      if (newValue) this.saved = false;
    },
    content(newValue) {
      if (newValue) this.saved = false;
    },
  },
  beforeRouteLeave(_, _2, next) {
    if (!this.saved) {
      const res = confirm(
        "確定要離開嗎?\n未備份的情況下離開，內容將不會被保存。"
      );
      if (res) next();
    } else {
      next();
    }
  },
};
