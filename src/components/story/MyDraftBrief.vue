<template>
  <li class="story-item">
    <div class="item-content">
      <router-link :to="{ name: 'EditDraft', params: { draftId: draft.id } }">
        <h5>{{ draft.title }}</h5>
      </router-link>
      <span>最後編輯: {{ lastEditTime }}</span>
    </div>
    <font-awesome-icon
      :icon="['fa', 'ellipsis-v']"
      class="more-option-icon"
      @click="showPanel = !showPanel"
    ></font-awesome-icon>
    <div class="backdrop" v-if="showPanel" @click="showPanel = false"></div>
    <div class="option-panel-position" v-if="showPanel">
      <more-option-panel
        :storyUserId="draft.userId"
        :storyId="draft.id"
        type="draft"
        @close-option-panel="showPanel = false"
      ></more-option-panel>
    </div>
  </li>
</template>

<script>
import moment from "moment";
import MoreOptionPanel from "@/components/MoreOptionPanel.vue";

export default {
  name: "MyDraftBrief",
  props: ["draft"],
  components: { MoreOptionPanel },
  data() {
    return {
      showPanel: false,
    };
  },
  computed: {
    lastEditTime() {
      const timestamp = this.draft.createdAt.toDate();
      moment.locale("zh-cn");
      return moment(timestamp).calendar();
    },
  },
};
</script>

<style></style>
