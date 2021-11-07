<template>
  <div class="account-wrapper">
    <div class="account-title">
      <h3>編輯帳號</h3>
    </div>
    <div class="form-container">
      <base-card>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(updateUserInfo)">
            <div class="input-box">
              <label>信箱</label>
              <input type="text" disabled v-model="userEmail" />
            </div>
            <ValidationProvider
              name="用戶"
              rules="required|minmax:3, 15"
              v-slot="{ errors, failed }"
            >
              <div class="input-box" :class="{ error: failed }">
                <label for="userName">用戶名</label>
                <input type="text" v-model="userName" />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <div class="input-box">
              <label for="userBio">個人簡介</label>
              <textarea
                id="userBio"
                rows="8"
                v-model.trim="userBio"
                placeholder="輸入您的個人簡介"
              ></textarea>
            </div>
            <div class="action">
              <button :class="{ block: btndisabled }">保存</button>
            </div>
          </form>
        </ValidationObserver>
      </base-card>
    </div>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-modal
      :show="show"
      message="帳號資訊更新成功"
      @close-modal="closeModal"
    >
      <template #action>
        <button @click="closeModal">確定</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { db, auth } from "@/firebase/config";

export default {
  name: "EditAccount",
  data() {
    return {
      show: false,
      errorMsg: null,
      userName: null,
      userBio: null,
      isLoading: null,
      btndisabled: false,
    };
  },
  components: { ValidationProvider, ValidationObserver },
  computed: {
    ...mapState("auth", {
      userEmail: (state) => state.userEmail,
    }),
  },
  methods: {
    async updateUserInfo() {
      try {
        this.errorMsg = null;
        this.btndisabled = true;
        const userNewInfo = {
          userName: this.userName,
          userBio: this.userBio,
        };
        await this.$store.dispatch("auth/updateUserInfo", userNewInfo);
        this.show = true;
        this.btndisabled = false;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    closeModal() {
      this.show = false;
    },
    async getUserNameAndBio() {
      const user = auth.currentUser;
      const res = await db
        .collection("users")
        .doc(user.uid)
        .get();
      const { name, bio } = res.data();
      this.userName = name;
      this.userBio = bio;
    },
  },
  // 為了保存未更新前的資料，選擇先fetch此用戶在db的name與bio資料，再賦值給date中雙向綁定的userName與userBio屬性。
  // 當用戶按下保存後才再度更新db與vuex，之後用戶的資料都透過vuex存取。
  async created() {
    this.isLoading = true;
    await this.getUserNameAndBio();
    this.isLoading = false;
  },
};
</script>

<style lang="scss" scoped>
.account-wrapper {
  .account-title {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-bg-gray-1);
    font-size: 2rem;
  }

  .form-container {
    padding: 4rem 0;
  }
}
</style>
