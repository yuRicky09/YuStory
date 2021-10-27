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
    path: "/user/home",
    name: "UserHome",
    component: () => import("@/views/user/UserHome.vue"),
    meta: {
      title: "個人中心|YUSTORY",
    },
    children: [
      {
        path: "edit",
        name: "EditUser",
        component: () => import("@/views/user/EditUser.vue"),
        meta: {
          title: "編輯帳號|YUSTORY",
        },
      },
      {
        path: "avatar",
        name: "UserAvatar",
        component: () => import("@/views/user/UserAvatar.vue"),
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
