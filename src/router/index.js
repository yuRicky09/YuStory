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
      public: true,
    },
  },
  {
    path: "/users/:userId",
    name: "Users",
    component: () => import("@/views/user/Users.vue"),
    meta: {
      title: "用戶 | YUSTORY",
      public: true,
    },
    props: true,
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
    path: "/story/edit/:storyId",
    name: "EditStory",
    component: () => import("@/views/story/EditStory.vue"),
    meta: {
      title: "編輯故事 | YUSTORY",
      requireLogin: true,
    },
    props: true,
  },
  {
    path: "/story/edit/draft/:draftId",
    name: "EditDraft",
    component: () => import("@/views/story/EditDraft.vue"),
    meta: {
      title: "編輯草稿 | YUSTORY",
      requireLogin: true,
    },
    props: true,
  },
  {
    path: "/story/:id",
    name: "Story",
    component: () => import("@/views/story/Story.vue"),
    meta: {
      public: true,
      title: "STORY | YUSTORY",
    },
    props: true,
  },
  {
    path: "/stories",
    name: "Stories",
    component: () => import("@/views/story/Stories.vue"),
    meta: {
      title: "STORIES | YUSTORY",
      public: true,
    },
  },
  {
    path: "/stories/me",
    name: "MyStories",
    component: () => import("@/views/story/MyStories.vue"),
    meta: {
      title: "我的故事 | YUSTORY",
      requireLogin: true,
    },
  },
  {
    path: "/favorites/me",
    name: "MyFavorites",
    component: () => import("@/views/story/MyFavorites.vue"),
    meta: {
      title: "我的收藏 | YUSTORY",
      requireLogin: true,
    },
  },
  {
    path: "/tags/:tagName",
    name: "Tags",
    component: () => import("@/views/story/Tags.vue"),
    meta: {
      title: "TAGS | YUSTORY",
      public: true,
    },
    props: true,
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/story/Search.vue"),
    meta: {
      title: "搜尋 | YUSTORY",
      public: true,
    },
    props($route) {
      return {
        type: $route.query.type,
        search: $route.query.search,
      };
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
    meta: {
      title: "Not Found | YUSTORY",
      public: true,
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

router.beforeEach((to, _, next) => {
  const user = auth.currentUser;
  if (to.meta.public) {
    next();
  } else if (to.meta.requireLogin) {
    user ? next() : next({ name: "Login" });
  } else if (!to.meta.requireLogin) {
    user ? next({ name: "Home" }) : next();
  }
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
