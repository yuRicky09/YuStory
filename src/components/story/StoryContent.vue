<template>
  <section class="story-content-wrapper">
    <div>
      <vue-editor v-show="showEditor"></vue-editor>
      <div class="ql-editor" id="editor" v-html="currentStory.storyHTML"></div>
    </div>
  </section>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "StoryContent",
  props: ["currentStory"],
  components: { VueEditor },
  data() {
    return {
      showEditor: false,
    };
  },
};
</script>

<style lang="scss" scoped>
//! scoped作用域會為這範圍內的所有tag加上一個hash屬性， 但是用v-html渲染出來的HTML結構會沒有，所以我們必須用深層選取器才能選取到v-html的結構。
.story-content-wrapper {
  /deep/ .ql-editor {
    h1 {
      font-size: 2.4rem;
    }
  }
}
</style>
