import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "YUSTORY",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      title: "登入|YUSTORY",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
    meta: {
      title: "註冊|YUSTORY",
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/user/Settings.vue"),
    meta: {
      title: "帳戶設定|YUSTORY",
    },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/user/Profile.vue"),
        meta: {
          title: "帳戶首頁|YUSTORY",
        },
      },
      {
        path: "edit-account",
        name: "EditAccount",
        component: () => import("@/views/user/EditAccount.vue"),
        meta: {
          title: "編輯帳號|YUSTORY",
        },
      },
      {
        path: "edit-avatar",
        name: "EditAvatar",
        component: () => import("@/views/user/EditAvatar.vue"),
        meta: {
          title: "編輯頭貼|YUSTORY",
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

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
