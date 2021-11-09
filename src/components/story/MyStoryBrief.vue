<template>
  <li class="story-item">
    <div class="item-content">
      <router-link :to="{ name: 'Story', params: { id: story.id } }">
        <h5>{{ story.title }}</h5>
        <p>{{ story.brief }}</p>
      </router-link>
      <span>發佈: {{ createdTime }}</span>
    </div>
    <font-awesome-icon
      :icon="['fa', 'ellipsis-v']"
      class="more-option-icon"
      @click="showPanel = !showPanel"
    ></font-awesome-icon>
    <div class="backdrop" v-if="showPanel" @click="showPanel = false"></div>
    <div class="option-panel-position" v-if="showPanel">
      <more-option-panel
        :storyUserId="story.userId"
        :storyId="story.id"
        type="story"
        @close-option-panel="showPanel = false"
      ></more-option-panel>
    </div>
  </li>
</template>

<script>
import { timeFormatMixin } from "@/mixins/timeFormatMixin";
import MoreOptionPanel from "@/components/MoreOptionPanel.vue";

export default {
  name: "MyStoryBrief",
  props: ["story"],
  mixins: [timeFormatMixin],
  components: { MoreOptionPanel },
  data() {
    return {
      showPanel: false,
    };
  },
};
</script>

<style lang="scss">
.story-item {
  position: relative;
  border-bottom: 1px solid var(--color-border);

  .item-content {
    padding: 1rem 2.5rem;

    > a {
      display: inline-block;
      margin-bottom: 8px;

      h5 {
        font-size: 1.4rem;
        @media (min-width: $bp-md) {
          font-size: 1.6rem;
        }
        margin: 0.5rem 0;
      }

      p {
        margin: 0.5rem 0;
        color: var(--color-bg-gray-1);
        width: 13rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (min-width: $bp-md) {
          font-size: 1.4rem;
          width: 50rem;
        }
      }

      &:hover h5 {
        color: #117096;
      }
    }
    > span {
      display: block;
      text-align: end;
    }
  }

  .more-option-icon {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    padding: 3px;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  .backdrop {
    background-color: transparent;
  }

  .option-panel-position {
    position: absolute;
    right: -3.3rem;
    top: 0rem;
    transform: translateY(-100%);
    z-index: 1000;
  }
}
</style>
