<template>
  <div class="auth-wrapper">
    <div class="form-container">
      <base-card>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(userLogin)">
            <div class="form-title">
              <span
                >尚未註冊?前往<router-link :to="{ name: 'Register' }"
                  >註冊</router-link
                ></span
              >
              <div class="icon-box" @click="signInWithGoogle">
                <font-awesome-icon :icon="['fab', 'google']" class="icon" />
                <span>使用Google帳戶登入</span>
              </div>
              <div class="icon-box">
                <font-awesome-icon :icon="['fab', 'github']" class="icon" />
                <span>使用Github帳戶登入</span>
              </div>
              <h2>登入 YUSTORY</h2>
            </div>
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
              rules="required|min:6"
              v-slot="{ errors, failed }"
            >
              <div class="input-box">
                <label for="password">密碼</label>
                <input
                  type="password"
                  id="password"
                  placeholder="請輸入密碼"
                  v-model.trim="password"
                  :class="{ error: failed }"
                />
                <small>{{ errors[0] }}</small>
              </div>
            </ValidationProvider>
            <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
            <div class="action">
              <button>登入</button>
            </div>
            <router-link class="forgot-link" :to="{ name: 'ForgotPassword' }"
              ><span>忘記密碼?</span></router-link
            >
          </form>
        </ValidationObserver>
      </base-card>
      <base-modal
        message="登入成功，即將跳轉到首頁"
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
  name: "Login",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      email: null,
      password: null,
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
    async userLogin() {
      try {
        const userData = {
          userEmail: this.email,
          userPassword: this.password,
        };

        await this.$store.dispatch("auth/userLogin", userData);
        this.show = true;
        setTimeout(() => {
          this.show = false;
          this.$router.replace({ name: "Home" });
        }, 2000);
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
    async signInWithGoogle() {
      try {
        await this.$store.dispatch("auth/signInWithGoogle");
        this.$router.replace({ name: "Home" });
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
.icon-box {
  align-self: center;
  cursor: pointer;
  width: 50%;
  margin: auto;
  padding: 1rem 1rem;
  margin: 1.7rem 0;
  background-color: #12181b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 2rem;
  border-radius: 5px;
  font-size: 1.4rem;
  text-align: center;

  .icon {
    margin-right: 0rem;

    @media (min-width: $bp-iphone-sm) {
      margin-right: 1rem;
    }
  }

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: $bp-iphone-sm) {
    font-size: 1.6rem;
    flex-direction: row;
  }
}

.forgot-link {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #5dade2;
  text-align: end;
  padding: 1rem;
}
</style>
