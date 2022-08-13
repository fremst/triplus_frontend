import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/member/LoginView";
import FindView from "@/views/member/FindView";
import showIDView from "@/views/member/ShowIDView";
import showPwdView from "@/views/member/ShowPwdView";
import changePwdView from "@/views/member/ChangePwdView";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/HomeView.vue")
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
