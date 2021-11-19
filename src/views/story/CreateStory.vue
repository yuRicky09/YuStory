<template>
  <div class="create-story-container">
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
        <button class="btn ghost" @click="saveDraft">
          <font-awesome-icon :icon="['fa', 'save']" class="action-icon" /><span
            >備份</span
          >
        </button>
        <button class="btn ghost" @click="showPreview = true">
          <font-awesome-icon :icon="['fa', 'eye']" class="action-icon" /><span
            >預覽</span
          >
        </button>
        <button class="btn" @click="publishStory">
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
        <button class="btn" @click="show = false">確定</button>
      </template>
    </base-modal>
    <base-spinner v-if="isLoading"></base-spinner>
  </div>
</template>

<script>
import { vueEditorMixin } from "@/mixins/vueEditorMixin";
import { createStoryMixin } from "@/mixins/createStoryMixin";

export default {
  name: "CreateStory",
  mixins: [vueEditorMixin, createStoryMixin],
};
</script>
