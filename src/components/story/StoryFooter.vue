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
    <div class="other-action" v-if="currentUser">
      <div class="left-side">
        <heart-icon :currentStory="currentStory"></heart-icon>
        <comment-icon :currentStory="currentStory"></comment-icon>
      </div>
      <div class="right-side">
        <bookmark :currentStory="currentStory"></bookmark>
        <div class="backdrop" v-if="showPanel" @click="showPanel = false"></div>
        <div class="option-panel-position">
          <more-option-panel
            v-if="showPanel"
            :authorId="currentStory.userId"
            :storyId="currentStory.id"
            type="story"
            @close-option-panel="showPanel = false"
          ></more-option-panel>
        </div>
        <font-awesome-icon
          class="ellipsis-icon action-icon"
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
import CommentIcon from "@/components/UI/CommentIcon.vue";
import HeartIcon from "@/components/UI/HeartIcon.vue";

export default {
  name: "StoryFooter",
  components: { BaseTag, Bookmark, MoreOptionPanel, CommentIcon, HeartIcon },
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    currentStory() {
      return this.$store.state.story.currentStory;
    },
    currentUser() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    moveToReplyEditor() {
      document.querySelector("#reply").scrollIntoView({ behavior: "smooth" });
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
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .other-action {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-side {
      display: flex;
      align-items: center;
      gap: 1rem;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .liked {
        color: violet;
      }
    }

    .right-side {
      position: relative;
      display: flex;

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
