<template>
  <div class="create-story-container">
    <div class="page-title">
      <h2>Edit Story</h2>
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
        <button @click="updateStory">
          <font-awesome-icon
            :icon="['fa', 'file-upload']"
            class="action-icon"
          /><span>更新故事</span>
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
    <base-spinner v-if="initLoading || isLoading"></base-spinner>
  </div>
</template>

<script>
import { vueEditorMixin } from "@/mixins/vueEditorMixin";
import { createStoryMixin } from "@/mixins/createStoryMixin";
import { db } from "@/firebase/config";

export default {
  name: "EditStory",
  props: ["storyId"],
  mixins: [vueEditorMixin, createStoryMixin],
  data() {
    return {
      initLoading: false,
    };
  },
  async created() {
    try {
      this.initLoading = true;
      const res = await db
        .collection("stories")
        .doc(this.storyId)
        .get();

      const { HTML, img, tags, title } = res.data();
      // 先將img資料存到vuex(防止原先圖檔資訊遺失)，如果用戶又添加新圖片時就會再觸發編輯器的callback將新圖資訊存於storage並同步更新vuex。當用戶按下更新文章時，再藉由vuex裡的最新img資訊上傳到db。
      this.$store.commit("story/updateStoryImg", img);

      // img為一陣列類型資料，每筆資料為一obj，內存對應圖片的上傳、下載位置之URL。
      const imgURLArr = [];
      img.forEach((i) => {
        imgURLArr.push(i.imgDownLoadURL);
      });
      this.content = HTML;
      this.pendingCovers = imgURLArr;
      this.tags = tags;
      this.title = title;
      this.docId = this.storyId;

      this.initLoading = false;
    } catch (err) {
      this.initLoading = false;
      console.log(err.message);
    }
  },
  methods: {
    async updateStory() {
      try {
        if (!this.title || !this.content) {
          this.modalMsg = "請確切填寫故事標題與內容，標題與內容不得為空";
          this.show = true;
        } else {
          if (this.pendingCovers.length > 0) {
            this.storyCover = this.pendingCovers[this.coverActiveIndex];
          }
          this.getStoryBrief();
          await this.$store.dispatch("story/updateStory", {
            storyTitle: this.title,
            storyHTML: this.content,
            storyTags: this.tags,
            storyCover: this.storyCover,
            storyBrief: this.brief,
            storyId: this.storyId,
          });
          this.saved = true;
          this.$router.push({ name: "Story", params: { id: this.storyId } });
        }
      } catch (err) {
        this.errorMsg = err;
      }
    },
  },
};
</script>

<style></style>
