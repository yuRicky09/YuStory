<template>
  <div class="auth-wrapper">
    <div class="form-container">
      <base-card>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(sumbitRegisterData)">
            <div class="form-title">
              <span class="link-to-login"
                >已註冊?前往<router-link :to="{ name: 'Login' }"
                  >登入</router-link
                ></span
              >
              <h2>註冊 YUSTORY</h2>
            </div>
            <ValidationProvider
              name="用戶"
              rules="required|minmax:3,15"
              v-slot="{ errors, failed }"
            >
              <div class="input-box">
                <label for="userName">用戶名</label>
                <input
                  type="text"
                  id="userName"
                  v-model.trim="userName"
                  placeholder="用戶名由3到15個字符組成"
                  :class="{ error: failed }"
                />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="信箱"
              rules="required|email"
              v-slot="{ errors, failed }"
            >
              <div class="input-box">
                <label for="email">信箱</label>
                <input
                  type="email"
                  id="email"
                  v-model.trim="email"
                  placeholder="example@domain.com"
                  :class="{ error: failed }"
                />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="密碼"
              rules="required|min:6|confirmed:confirmation"
              v-slot="{ errors, failed }"
            >
              <div class="input-box">
                <label for="password">密碼</label>
                <input
                  type="password"
                  id="password"
                  placeholder="密碼須至少6碼"
                  v-model.trim="password"
                  :class="{ error: failed }"
                />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="確認密碼"
              v-slot="{ errors, failed }"
              vid="confirmation"
            >
              <div class="input-box">
                <label for="comfirmPassword">確認密碼</label>
                <input
                  type="password"
                  id="comfirmPassword"
                  v-model.trim="confirmation"
                  :class="{ error: failed }"
                />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
            <div class="action">
              <button class="btn">註冊</button>
            </div>
          </form>
        </ValidationObserver>
      </base-card>
      <base-modal
        message="註冊成功，即將跳轉到首頁"
        @close-modal="closeModal"
        :show="show"
      ></base-modal>
      <base-spinner v-if="isLoading"></base-spinner>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState } from "vuex";

export default {
  name: "Register",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      email: null,
      password: null,
      userName: null,
      confirmation: null,
      show: false,
      errorMsg: null,
    };
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    async sumbitRegisterData() {
      try {
        const registerData = {
          userEmail: this.email,
          userPassword: this.password,
          userName: this.userName,
        };

        await this.$store.dispatch("auth/userRegister", registerData);
        this.show = true;
        setTimeout(() => {
          this.show = false;
          this.$router.replace({ name: "Home" });
        }, 2000);
      } catch (err) {
        if (
          err.message ===
          "The email address is already in use by another account."
        )
          this.errorMsg = "此信箱已註冊過帳號，請使用其他信箱";
      }
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.link-to-login {
  margin-bottom: 1rem;
}
</style>
