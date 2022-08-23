import { createRouter, createWebHistory } from "vue-router";

import AddPlaceView from "@/views/admin/place/AddPlaceView";
import ModifyPlaceView from "@/views/admin/place/ModifyPlaceView";

import QnAView from "../views/member/service/QnAView.vue";
import QnAWriteView from "../views/member/service/QnAWriteView.vue";
import QnADetailView from "../views/member/service/QnADetailView.vue";

import PackageListView from "@/views/section/package/PackageListView";
import PackageDetailView from "@/views/section/package/PackageDetailView";
import PackageReservationView from "@/views/section/package/PackageReservationView";
import PackageReservationCompleteView from "@/views/section/package/PackageReservationCompleteView";

// import AttractionListView from "@/views/section/place/attraction/AttractionListView";
// import AttractionDetailView from "@/views/section/place/attraction/AttractionDetailView";
// import RestaurantListView from "@/views/section/place/restaurant/RestaurantListView";
// import RestaurantDetailView from "@/views/section/place/restaurant/RestaurantDetailView";
import AccommodationListView from "@/views/section/place/accommodation/AccommodationListView";
import AccommodationDetailView from "@/views/section/place/accommodation/AccommodationDetailView";

import AddScheduleView from "@/views/section/plan/AddScheduleView";

import MemberJoinView from "@/views/member/MemberJoinView";
import tosView from "@/views/member/TosView";
import LoginView from "@/views/member/LoginView";
import FindView from "@/views/member/FindView";
import showIDView from "@/views/member/ShowIDView";
import showPwdView from "@/views/member/ShowPwdView";
import changePwdView from "@/views/member/ChangePwdView";
import joinCompleteView from "@/views/member/JoinCompleteView";

import MainView from "../views/MainView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView
  },
  {
    path: "/admin/place",
    name: "place-add",
    component: AddPlaceView
  },
  {
    path: "/admin/place/:brdNum/modify",
    name: "place-modify",
    component: ModifyPlaceView
  },
  {
    path: "/service/notices",
    name: "notices",
    component: () => import("@/views/admin/service/NoticeListView.vue")
  },
  {
    path: "/service/notices/write",
    name: "notice-write",
    component: () => import("@/views/admin/service/NoticeWriteView.vue")
  },
  {
    path: "/service/notices/:brdNum",
    name: "notice-detail",
    component: () => import("@/views/admin/service/NoticeDetailView.vue")
  },
  {
    path: "/service/notices/:brdNum/update",
    name: "notice-update",
    component: () => import("@/views/admin/service/NoticeUpdateView.vue")
  },
  {
    path: "/service/qna",
    name: "qna",
    component: QnAView
  },
  {
    path: "/service/qna/write",
    name: "qna-write",
    component: QnAWriteView
  },
  {
    path: "/service/qna/detail",
    name: "qna-detail",
    component: QnADetailView
  },
  {
    path: "/member/find",
    name: "find",
    component: FindView
  },
  {
    path: "/memberjoin",
    name: "memberjoin",
    component: MemberJoinView
    // meta:{member:true}
  },
  {
    path: "/member/login",
    name: "member-login",
    component: LoginView
  },
  {
    path: "/memberjoin/tos",
    name: "tos",
    component: tosView
  },
  {
    path: "/member/showid",
    name: "showId",
    component: showIDView
  },
  {
    path: "/member/showpwd",
    name: "showPwd",
    component: showPwdView
  },
  {
    path: "/member/changepwd",
    name: "changePwd",
    component: changePwdView
  },
  {
    path: "/memberjoin/complete",
    name: "join-complete",
    component: joinCompleteView
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
  {
    path: "/section/packages/:brdNum/reservation",
    name: "package-reservation",
    component: PackageReservationView
  },
  {
    path: "/section/packages/reservation/complete/:oid",
    name: "package-reservation-complete",
    component: PackageReservationCompleteView
  },
  // {
  //   path: "/section/place/attraction",
  //   name: "attraction-list",
  //   component: AttractionListView
  // },
  // {
  //   path: "/section/place/attraction",
  //   name: "attraction-detail",
  //   component: AttractionDetailView
  // },
  // {
  //   path: "/section/place/restaurant",
  //   name: "restaurant-list",
  //   component: RestaurantListView
  // },
  // {
  //   path: "/section/place/restaurant",
  //   name: "restaurant-detail",
  //   component: RestaurantDetailView
  // },
  {
    path: "/section/place/accommodation",
    name: "accommodation-list",
    component: AccommodationListView
  },
  {
    path: "/section/place/accommodation/:brdNum",
    name: "accommodation-detail",
    component: AccommodationDetailView
  },
  {
    path: "/section/calendar",
    name: "add-schedule",
    component: AddScheduleView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

//라우터 전역 가드 test
router.beforeEach(function (to, from, next) {
  if (
    to.matched.some(function (info) {
      return info.meta.member;
    })
  ) {
    // 회원만 가능페이지 라우터 meta 속성의 member(boolean) true 설정 예시) memberjoin
    alert("회원만 이용가능 로그인해주세요");
    next("/member/login"); // 리다이렉트
  } else {
    next();
  }
});

export default router;
