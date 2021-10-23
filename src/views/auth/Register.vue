<template>
  <div class="container">
    <base-card>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(sumbitRegisterData)">
          <div class="form-title">
            <span
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
          <div class="action">
            <button>註冊</button>
          </div>
        </form>
      </ValidationObserver>
    </base-card>
    <base-modal
      message="註冊成功，即將跳轉到首頁"
      @close-modal="closeModal"
      :show="show"
    ></base-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Register",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      email: null,
      password: null,
      userName: null,
      confirmation: null,
      show: true,
    };
  },
  methods: {
    sumbitRegisterData() {
      const registerData = {
        email: this.email,
        password: this.password,
        userName: this.userName,
      };

      console.log(registerData);
    },
    closeModal() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 60rem;
  margin: 7rem auto;
  font-size: 1.5rem;

  form {
    padding: 2rem 3rem;

    .form-title {
      display: flex;
      flex-direction: column;
      margin: 0.5rem 0 3rem;

      span {
        align-self: flex-end;

        a {
          color: #5dade2;
          font-weight: 700;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      h2 {
        align-self: center;
      }
    }
  }

  .input-box {
    margin: 2rem 0;

    input.error {
      border: 2px solid #e74c4cef;
    }

    small {
      color: #e74c4cef;
    }
  }

  .action {
    margin: 3rem 0 1rem;
    font-size: 1.8rem;
    display: flex;
    justify-content: center;
  }
}
</style>
