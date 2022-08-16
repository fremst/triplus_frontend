import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/HomeView.vue")
  },
  {
    path:"/service/notice/list",
    name:"notice",
    component: () => import("@/views/admin/service/NoticeListView.vue")
  },
  {
    path:"/service/notice/write",
    name:"notice-write",
    component: () => import("@/views/admin/service/NoticeWriteView.vue")
  },
  {
    path:"/service/notice/detail",
    name:"notice-detail",
    component: () => import("@/views/admin/service/NoticeDetailView.vue")
  },
  {
    path:"/service/notice/update",
    name:"notice-update",
    component: () => import("@/views/admin/service/NoticeUpdateView.vue")
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
