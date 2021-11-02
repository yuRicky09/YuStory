<template>
  <section class="story-content-wrapper">
    <div>
      <vue-editor v-show="showEditor"></vue-editor>
      <div class="ql-editor" id="editor" v-html="storyHTML"></div>
    </div>
  </section>
</template>

<script>
//! 要讓存取的HTML格式能套用當初vue editor編輯器內撰寫的格式的話，必須要引入vue editor，並在插入HTML的容器添上class ql-editor後即可套用。
import { VueEditor } from "vue2-editor";

export default {
  name: "StoryContent",
  props: ["storyHTML"],
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
    h1,
    h2,
    h3 {
      margin: 1.5rem 0 0.7rem;
      @media (min-width: $bp-md) {
        margin: 3rem 0 1.4rem;
      }
    }

    h1 {
      font-size: 2.8rem;
      @media (min-width: $bp-md) {
        font-size: 3rem;
      }
    }
    h2 {
      font-size: 2.4rem;
      @media (min-width: $bp-md) {
        font-size: 2.6rem;
      }
    }
    h3 {
      font-size: 2rem;
      @media (min-width: $bp-md) {
        font-size: 2.2rem;
      }
    }

    p {
      line-height: 1.7;
    }

    a {
      text-decoration: underline;
      color: #0089ac;
    }

    li {
      margin: 5px 0;
    }
  }
}
</style>
