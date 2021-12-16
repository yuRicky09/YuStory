<template>
  <div class="auth-wrapper">
    <div class="form-container">
      <base-card>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(resetPassword)">
            <div class="form-title">
              <span class="link-to-login"
                >已註冊?前往<router-link :to="{ name: 'Login' }"
                  >登入</router-link
                ></span
              >
              <h2>忘記密碼?</h2>
            </div>
            <ValidationProvider
              name="信箱"
              rules="required|email"
              v-slot="{ errors, failed }"
            >
              <div class="input-box" :class="{ error: failed }">
                <label for="">信箱</label>
                <input type="email" v-model.trim="email" />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
            <div class="action">
              <button class="btn">重置密碼</button>
            </div>
          </form>
        </ValidationObserver>
      </base-card>
    </div>
    <base-spinner v-if="isLoading"></base-spinner>
    <base-modal
      message="請確認信箱並且重新設置密碼"
      :show="show"
      @close-modal="closeModal"
    >
      <template #action>
        <button class="btn" @click="closeModal">確定</button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { mapState } from "vuex";

export default {
  name: "ForgotPassword",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: null,
      errorMsg: null,
      show: false,
    };
  },
  computed: {
    ...mapState("auth", {
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    async resetPassword() {
      try {
        const userEmail = this.email;
        await this.$store.dispatch("auth/resetPassword", userEmail);
        this.show = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  padding: 25rem 0 !important;
}
</style>
