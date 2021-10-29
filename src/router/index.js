import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/firebase/config";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "YUSTORY",
      requireAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      title: "登入|YUSTORY",
      requireAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
    meta: {
      title: "註冊|YUSTORY",
      requireAuth: false,
    },
  },
  {
    path: "/forgot/passwrod",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPassword.vue"),
    meta: {
      title: "忘記密碼|YUSTORY",
      requireAuth: false,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/user/Settings.vue"),
    meta: {
      title: "帳戶設定|YUSTORY",
      requireAuth: true,
    },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/user/Profile.vue"),
        meta: {
          title: "帳戶首頁|YUSTORY",
          requireAuth: true,
        },
      },
      {
        path: "edit-account",
        name: "EditAccount",
        component: () => import("@/views/user/EditAccount.vue"),
        meta: {
          title: "編輯帳號|YUSTORY",
          requireAuth: true,
        },
      },
      {
        path: "edit-avatar",
        name: "EditAvatar",
        component: () => import("@/views/user/EditAvatar.vue"),
        meta: {
          title: "編輯頭貼|YUSTORY",
          requireAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.name === "Home") {
    next();
  } else if (!user && to.meta.requireAuth) {
    next({ name: "Home" });
  } else if (!user && !to.meta.requireAuth) {
    next();
  } else if (user && !to.meta.requireAuth) {
    next({ name: "Home" });
  } else if (user && to.meta.requireAuth) {
    next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
