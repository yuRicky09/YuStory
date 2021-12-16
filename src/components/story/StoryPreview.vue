<template>
  <div>
    <div class="backdrop" v-if="showPreview" @click="closeStoryPreview"></div>
    <transition name="zoom-in">
      <div class="story-preview" v-if="showPreview">
        <h3>Story Preview</h3>
        <font-awesome-icon
          :icon="['fa', 'times']"
          @click="closeStoryPreview"
        ></font-awesome-icon>
        <div class="content-box">
          <story-content :storyHTML="storyHTML"></story-content>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import StoryContent from "@/components/story/StoryContent.vue";

export default {
  name: "StoryPreview",
  components: { StoryContent },
  props: ["storyHTML", "showPreview"],
  methods: {
    closeStoryPreview() {
      this.$emit("close-story-preview");
    },
  },
};
</script>

<style lang="scss" scoped>
.story-preview {
  position: fixed;
  background-color: #f2f2f2;
  top: 10rem;
  left: 0;
  right: 0;
  bottom: 10rem;
  max-width: 100rem;
  padding: 4rem 6rem;
  margin: auto;
  z-index: var(--z-index-max);
  border-radius: 10px;
  box-shadow: 0 5px 10px var(--color-shadow);
  display: flex;
  flex-direction: column;
  justify-content: center;

  .content-box {
    max-height: 70vh;
    overflow-y: auto;
  }

  h3 {
    background-color: var(--color-dark-1);
    color: #fff;
    font-size: 1.6rem;
    padding: 1rem 2rem;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    @media (min-width: $bp-md) {
      font-size: 2rem;
    }
  }

  svg {
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: 2rem;
    cursor: pointer;
  }
}
</style>
