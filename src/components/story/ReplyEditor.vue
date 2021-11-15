<template>
  <div class="reply" id="reply" ref="reply" v-if="currentUser">
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
      <button class="btn" @click="reply">留言</button>
    </div>
    <base-modal message="留言不能為空" :show="show" @close-modal="show = false">
      <template #action>
        <button class="btn" @click="show = false">確定</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";

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
      show: false,
    };
  },
  computed: {
    ...mapState("auth", {
      userProfileImg: (state) => state.userProfileImg,
      userName: (state) => state.userName,
      currentUser: (state) => state.currentUser,
    }),
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
      if (!this.content) {
        this.show = true;
        return;
      }

      this.$store.dispatch("story/addReply", this.content);

      this.content = "";
    },
  },
  mounted() {
    if (this.currentUser) this.editorInit();
  },
};
</script>

<style lang="scss" scoped>
.reply {
  padding: 2rem;
  scroll-behavior: smooth;

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
