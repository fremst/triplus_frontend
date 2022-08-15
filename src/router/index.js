import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PackageListView from "@/views/section/package/PackageListView";
import PackageDetailView from "@/views/section/package/PackageDetailView";

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
    path: "/section/packages",
    name: "package-list",
    component: PackageListView
  },
  {
    path: "/section/packages/:brdNum",
    name: "package-detail",
    component: PackageDetailView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
