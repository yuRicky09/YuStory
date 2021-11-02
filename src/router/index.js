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
      title: "登入 | YUSTORY",
      requireLogin: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/auth/Register.vue"),
    meta: {
      title: "註冊 | YUSTORY",
      requireLogin: false,
    },
  },
  {
    path: "/forgot/passwrod",
    name: "ForgotPassword",
    component: () => import("@/views/auth/ForgotPassword.vue"),
    meta: {
      title: "忘記密碼 | YUSTORY",
      requireLogin: false,
    },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/user/Settings.vue"),
    meta: {
      title: "帳戶設定 | YUSTORY",
      requireLogin: true,
    },
    children: [
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/user/Profile.vue"),
        meta: {
          title: "帳戶首頁 | YUSTORY",
          requireLogin: true,
        },
      },
      {
        path: "edit-account",
        name: "EditAccount",
        component: () => import("@/views/user/EditAccount.vue"),
        meta: {
          title: "編輯帳號 | YUSTORY",
          requireLogin: true,
        },
      },
      {
        path: "edit-avatar",
        name: "EditAvatar",
        component: () => import("@/views/user/EditAvatar.vue"),
        meta: {
          title: "編輯頭貼 | YUSTORY",
          requireLogin: true,
        },
      },
    ],
  },
  {
    path: "/story/create",
    name: "CreateStory",
    component: () => import("@/views/story/CreateStory.vue"),
    meta: {
      title: "撰寫故事 | YUSTORY",
      requireLogin: true,
    },
  },
  {
    path: "/story/:id",
    name: "Story",
    component: () => import("@/views/story/Story.vue"),
    meta: {
      requireAuth: false,
    },
    props: true,
  },
  {
    path: "/stories",
    name: "Stories",
    component: () => import("@/views/story/Stories.vue"),
    meta: {
      title: "STORIES | YUSTORY",
      requireAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (!to.meta.requireAuth && to.meta.requireAuth !== undefined) {
    next();
  } else if (to.meta.requireLogin) {
    user ? next() : next({ name: "Home" });
  } else if (!to.meta.requireLogin) {
    user ? next({ name: "Home" }) : next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
