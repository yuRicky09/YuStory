<template>
  <div class="story-footer">
    <div class="tags">
      <router-link
        :to="{ name: 'Tags', params: { tagName: tag } }"
        v-for="tag in currentStory.tags"
        :key="tag"
      >
        <base-tag :tagName="tag" :rect="true"></base-tag>
      </router-link>
    </div>
    <div class="other-action">
      <div class="left-side">
        <font-awesome-icon :icon="['far', 'heart']" />
        <font-awesome-icon :icon="['fa', 'heart']" />
        <font-awesome-icon :icon="['far', 'comment']" />
      </div>
      <div class="right-side">
        <bookmark :story="currentStory"></bookmark>
        <div class="option-panel-position">
          <div
            class="backdrop"
            v-if="showPanel"
            @click="showPanel = false"
          ></div>
          <more-option-panel
            v-if="showPanel"
            :storyUserId="currentStory.userId"
            :storyId="currentStory.id"
            type="story"
            @close-option-panel="showPanel = false"
          ></more-option-panel>
        </div>
        <font-awesome-icon
          class="ellipsis-icon"
          :icon="['fa', 'ellipsis-v']"
          @click="showPanel = !showPanel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseTag from "@/components/UI/BaseTag.vue";
import Bookmark from "@/components/UI/Bookmark.vue";
import MoreOptionPanel from "@/components/MoreOptionPanel.vue";

export default {
  name: "StoryFooter",
  components: { BaseTag, Bookmark, MoreOptionPanel },
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    currentStory() {
      return this.$store.state.story.currentStory;
    },
  },
};
</script>

<style lang="scss" scoped>
.story-footer {
  padding: 2rem 1.2rem;
  border-bottom: 1px solid var(--color-border);

  .tags {
    margin: 2rem 0;

    a {
      display: inline-block;
      margin: 0.5rem;
    }
  }

  .other-action {
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      width: 2.5rem;
      height: 2.5rem;
      margin: 3px;
      padding: 4px;
      cursor: pointer;
    }

    .right-side {
      position: relative;

      .backdrop {
        background-color: transparent;
      }

      .option-panel-position {
        position: absolute;
        z-index: 1000;
        transform: translateY(-100%);
        right: -3.4rem;
        top: -1rem;
      }
    }
  }
}
</style>
