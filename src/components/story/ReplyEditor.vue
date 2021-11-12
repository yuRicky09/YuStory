<template>
  <div class="reply">
    <div class="reply-header">
      <img
        :src="userProfileImg"
        alt="user-avatar"
        class="reply-person-avatar"
      />
      <span class="reply-person-name">
        {{ userName }}
      </span>
    </div>
    <vue-editor
      v-model="content"
      :editor-toolbar="customToolBar"
      placeholder="留言"
      ref="editor"
    ></vue-editor>
    <div class="reply-action">
      <button @click="reply">留言</button>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  name: "ReplayEditor",
  components: { VueEditor },
  props: ["story", "userProfileImg", "userName"],
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
  methods: {
    editorInit() {
      const toolbar = this.$refs.editor.$el.children[0];
      const allBtn = toolbar.querySelectorAll("button");
      const textColorBtn = toolbar.querySelector(".ql-color-picker");
      const textBgBtn = toolbar.querySelector(".ql-background");

      textColorBtn.setAttribute("title", "文字顏色");
      textBgBtn.setAttribute("title", "背景顏色");

      allBtn.forEach((btn, index) => {
        btn.setAttribute("title", this.tooltips[index]);
      });
    },
    reply() {
      this.$store.dispatch("story/addReply", {
        content: this.content,
        storyId: this.story.id,
      });

      this.content = "";
    },
  },
  mounted() {
    this.editorInit();
  },
};
</script>

<style lang="scss" scoped>
.reply {
  padding: 2rem;

  .reply-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 0.5rem;
    padding-left: 1rem;

    .reply-person-avatar {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }

    .reply-person-name {
      font-weight: 700;
    }
  }

  .reply-action {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 2rem;
  }
}
</style>
