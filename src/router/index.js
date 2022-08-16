import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/member/LoginView";
import FindView from "@/views/member/FindView";
import showIDView from "@/views/member/ShowIDView";
import showPwdView from "@/views/member/ShowPwdView";
import changePwdView from "@/views/member/ChangePwdView";
import MainView from "../views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView
  },
  {
    path: "/member/login",
    name: "login",
    component: LoginView
  },
  {
    path: '/member/find',
    name: 'find',
    component: FindView
  },
  {
    path: '/member/showid',
    name: 'showId',
    component: showIDView
  },
  {
    path: '/member/showpwd',
    name: 'showPwd',
    component: showPwdView
  },
  {
    path: '/member/changepwd',
    name: 'changePwd',
    component: changePwdView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;