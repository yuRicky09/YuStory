<template>
  <div>
    <vue-editor
      class="vue-editor"
      id="editor2"
      v-model="content"
      :editor-toolbar="customToolBar"
      placeholder="留言"
      ref="editor"
    ></vue-editor>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ReplayEditor",
  components: { VueEditor },
  data() {
    return {
      content: "",
      customToolBar: [
        ["bold", "italic"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      tooltips: ["粗體", "斜線", "清除格式"],
    };
  },
};
</script>

<style></style>
