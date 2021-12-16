<template>
  <portal to="modal-destination">
    <div class="backdrop"></div>
    <transition name="zoom-in">
      <div class="message-box">
        <div class="content">
          <h2>檢舉此內容</h2>
          <div class="select-reason">
            <p>
              人身攻擊、侵犯個人隱私、著作權限當事人檢舉。
              惡意檢舉，經查證屬實將依站規處分。
            </p>
            <dropdown
              class="my-dropdown-toggle"
              :options="options"
              :selected="selectedOption"
              @updateOption="handleSelected"
            ></dropdown>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn ghost" @click="$emit('close-report-modal')">
            取消
          </button>
          <button
            class="btn report"
            :class="{ block: reportReason === '請選擇理由' }"
            @click="$emit('report', reportReason)"
          >
            送出
          </button>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import dropdown from "vue-dropdowns";
import { Portal } from "portal-vue";

export default {
  name: "ReportModal",
  components: { dropdown, Portal },
  data() {
    return {
      options: [
        { name: "請選擇理由" },
        { name: "謾罵" },
        { name: "洗版" },
        { name: "內容太油" },
        { name: "作者瞧不起我" },
      ],
      selectedOption: { name: "請選擇理由" },
      reportReason: "請選擇理由",
    };
  },
  methods: {
    handleSelected(option) {
      const { name } = option;
      this.reportReason = name;
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  z-index: var(--z-index-200);
}

.message-box {
  position: fixed;
  background-color: #fff;
  top: 30vh;
  left: 10%;
  width: 80%;
  z-index: var(--z-index-max);

  @media (min-width: $bp-lg) {
    left: 20%;
    width: 60%;
  }

  @media (min-width: $bp-xl) {
    left: 30%;
    width: 40%;
  }

  .content {
    text-align: center;
    font-size: 1.4rem;

    @media (min-width: $bp-md) {
      font-size: 1.6rem;
    }

    h2 {
      background-color: var(--color-dark-3);
      color: #fff;
      padding: 1.5rem 0;
      font-size: 1.8rem;

      @media (min-width: $bp-md) {
        font-size: 2.8rem;
      }
    }

    p {
      text-align: start;
      font-weight: 600;
      padding: 0 2rem;
      margin: 2rem 0 1rem;
    }
  }

  .modal-action {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2rem;
    margin: 2rem 0;
    font-size: 1.4rem;

    @media (min-width: $bp-md) {
      font-size: 1.6rem;
    }

    .btn.report.block {
      cursor: not-allowed;
      background-color: #000;
    }
  }
}
</style>
