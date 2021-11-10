<template>
  <li class="story-item">
    <div class="item-content">
      <router-link :to="{ name: 'Story', params: { id: story.id } }">
        <h5>{{ story.title }}</h5>
        <p class="one-line">{{ story.brief }}</p>
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
