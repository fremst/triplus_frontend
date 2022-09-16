import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/admin/packages/write",
    name: "package-write",
    component: () => import("@/views/admin/item/AdminPackageWriteView"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/packages/:brdNum/update",
    name: "package-update",
    component: () => import("@/views/admin/item/AdminPackageWriteView"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/",
    name: "main",
    component: () => import("@/views/MainView.vue")
  },
  //관리자 장소추가
  {
    path: "/admin/place",
    name: "admin-place-add",
    component: () => import("@/views/admin/place/AddPlaceView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 명소 리스트
  {
    path: "/admin/place/attraction",
    name: "admin-attraction-list",
    component: () => import("@/views/admin/place/attraction/AdminAttractionListView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 명소 상세페이지
  {
    path: "/admin/place/attraction/:brdNum",
    name: "admin-attraction-detail",
    component: () => import("@/views/admin/place/attraction/AdminAttractionDetailView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 맛집 리스트
  {
    path: "/admin/place/restaurant",
    name: "admin-restaurant-list",
    component: () => import("@/views/admin/place/restaurant/AdminRestaurantListView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 맛집 상세페이지
  {
    path: "/admin/place/restaurant/:brdNum",
    name: "admin-restaurant-detail",
    component: () => import("@/views/admin/place/restaurant/AdminRestaurantDetailView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 숙소 리스트
  {
    path: "/admin/place/accommodation",
    name: "admin-accommodation-list",
    component: () => import("@/views/admin/place/accommodation/AdminAccommodationListView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 숙소 상세페이지
  {
    path: "/admin/place/accommodation/:brdNum",
    name: "admin-accommodation-detail",
    component: () => import("@/views/admin/place/accommodation/AdminAccommodationDetailView"),
    meta: { adminAuthRequired: true }
  },
  //관리자 장소 수정
  {
    path: "/admin/place/:brdNum",
    name: "place-modify",
    component: () => import("@/views/admin/place/ModifyPlaceView"),
    meta: { adminAuthRequired: true }
  },

  {
    path: "/admin/packages",
    name: "admin-packages",
    component: () => import("@/views/admin/item/AdminPackageListView"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/magazines",
    name: "admin-magazines",
    component: () => import("@/views/admin/magazine/AdminMagazineListView.vue"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: () => import("@/views/admin/sales/AdminDashBoardView"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/reservations",
    name: "admin-reservations",
    component: () => import("@/views/admin/reservation/AdminReservationView"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/service/notices",
    name: "notices",
    component: () => import("@/views/admin/service/NoticeListView.vue")
  },
  {
    path: "/service/notices/write",
    name: "notice-write",
    component: () => import("@/views/admin/service/NoticeWriteView.vue"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/service/notices/:brdNum",
    name: "notice-detail",
    component: () => import("@/views/admin/service/NoticeDetailView.vue")
  },
  {
    path: "/service/notices/:brdNum/update",
    name: "notice-update",
    component: () => import("@/views/admin/service/NoticeUpdateView.vue"),
    meta: { adminAuthRequired: true }
  },
  // 문의글
  {
    path: "/admin/service/qna/counsel",
    name: "admin-qna-counsel",
    component: () => import("@/views/admin/service/AdminQnACounselView.vue"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/service/qna",
    name: "qna",
    component: () => import("@/views/member/service/QnAView.vue")
  },
  {
    path: "/service/qna/write",
    name: "qna-write",
    component: () => import("@/views/member/service/QnAWriteView.vue")
  },
  {
    path: "/service/qna/:brdNum/detail",
    name: "qna-detail",
    component: () => import("@/views/member/service/QnADetailView.vue")
  },
  //회원 관련
  {
    //아이디 / 비밀번호 찾는 view
    path: "/member/find",
    name: "find",
    component: () => import("@/views/member/FindView")
  },
  {
    //회원가입 view
    path: "/memberjoin",
    name: "memberjoin",
    component: () => import("@/views/member/MemberJoinView")
    // meta:{member:true}
  },
  {
    //로그인view
    path: "/member/login",
    name: "member-login",
    component: () => import("@/views/member/LoginView")
  },
  {
    //회원가입 이용약관
    path: "/memberjoin/tos",
    name: "tos",
    component: () => import("@/views/member/TosView")
  },
  {
    // 찾는 아이디 보여주는 view
    path: "/member/showid",
    name: "showId",
    component: () => import("@/views/member/ShowIDView")
  },
  {
    // 비밀번호 찾기 view
    path: "/member/showpwd",
    name: "showPwd",
    component: () => import("@/views/member/ShowPwdView")
  },
  {
    // 비밀번호 변경 view
    path: "/member/changepwd",
    name: "changePwd",
    component: () => import("@/views/member/ChangePwdView")
  },
  {
    path: "/memberjoin/complete",
    name: "join-complete",
    component: () => import("@/views/member/JoinCompleteView")
  },
  {
    path: "/member/myreservation/:oid",
    name: "myreservation",
    component: () => import("@/views/member/MyReservationView")
  },

  {
    path: "/member/plan/checklist",
    name: "member-checklist",
    component: () => import("@/views/member/plan/CheckListView")
  },
  {
    path: "/member/plan/:skdNum/expenses",
    name: "member-expenses",
    component: () => import("@/views/member/plan/ExpensesView")
  },
  //마이페이지
  {
    // 비밀번호 확인 view
    path: "/member/mypage/chkpwd",
    name: "mypage-chkpwd",
    component: () => import("@/views/member/mypage/MyPageCheckPwdView")
  },
  {
    //회원정보 수정 view
    path: "/member/mypage/update",
    name: "mypage-update",
    component: () => import("@/views/member/mypage/MyPageUpdateView")
  },
  {
    //내 예약보기
    path: "/member/mypage/reservation",
    name: "mypage-reservation",
    component: () => import("@/views/member/mypage/MyReservationView")
  },
  {
    //내 일정
    path: "/member/mypage/myschedule",
    name: "mypage-myschedule",
    component: () => import("@/views/member/mypage/MyScheduleView")
  },

  {
    path: "/section/packages",
    name: "package-list",
    component: () => import("@/views/section/package/PackageListView")
  },
  {
    path: "/section/packages/:brdNum",
    name: "package-detail",
    component: () => import("@/views/section/package/PackageDetailView")
  },
  {
    path: "/section/packages/:brdNum/reservation",
    name: "package-reservation",
    component: () => import("@/views/section/package/PackageReservationView")
  },
  {
    path: "/section/packages/reservation-complete/:oid",
    name: "package-reservation-complete",
    component: () => import("@/views/section/package/PackageReservationCompleteView")
  },
  //명소 리스트
  {
    path: "/section/place/attraction",
    name: "attraction-list",
    component: () => import("@/views/section/place/attraction/AttractionListView")
  },
  //명소 상세페이지
  {
    path: "/section/place/attraction/:brdNum",
    name: "attraction-detail",
    component: () => import("@/views/section/place/attraction/AttractionDetailView")
  },
  //맛집 리스트
  {
    path: "/section/place/restaurant",
    name: "restaurant-list",
    component: () => import("@/views/section/place/restaurant/RestaurantListView")
  },
  //맛집 상세페이지
  {
    path: "/section/place/restaurant/:brdNum",
    name: "restaurant-detail",
    component: () => import("@/views/section/place/restaurant/RestaurantDetailView")
  },
  //숙소 리스트
  {
    path: "/section/place/accommodation",
    name: "accommodation-list",
    component: () => import("@/views/section/place/accommodation/AccommodationListView")
  },
  //숙소 상세페이지
  {
    path: "/section/place/accommodation/:brdNum",
    name: "accommodation-detail",
    component: () => import("@/views/section/place/accommodation/AccommodationDetailView")
  },
  {
    path: "/admin/magazines/write",
    name: "magazine-write",
    component: () => import("@/views/admin/magazine/AdminMagazineWriteView.vue"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/magazines/:brdNum/update",
    name: "magazine-update",
    component: () => import("@/views/admin/magazine/AdminMagazineWriteView.vue"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/section/magazines",
    name: "magazines",
    component: () => import("@/views/section/magazine/MagazineListView.vue")
  },
  {
    path: "/section/magazines/:brdNum",
    name: "magazine-detail",
    component: () => import("@/views/section/magazine/MagazineDetailView.vue")
  },
  //일정등록 첫 페이지
  {
    path: "/section/member",
    name: "add-schedule",
    component: () => import("@/views/section/member/AddMyScheduleView")
  },
  //일정등록 메인페이지
  {
    path: "/section/member/schedule/main/:skdNum",
    name: "add-schedule-main",
    component: () => import("@/views/section/member/MyScheduleMainView")
  },
  //일정등록 추가
  {
    path: "/section/member/schedule/add-place",
    name: "add-schedule-place",
    component: () => import("@/views/section/member/AddSchedulePlaceView")
  },
  //나만의 장소 추가
  {
    path: "/section/member/schedule/add-my-place",
    name: "add-my-place",
    component: () => import("@/views/section/member/AddMyPlaceView")
  },
  //날씨보기
  {
    path: "/section/member/schedule/weather",
    name: "schedule-weather",
    component: () => import("@/views/section/member/WeatherView")
  },
  {
    path: "/service/faq",
    name: "faqs",
    component: () => import("@/views/member/service/FAQView.vue")
  },
  {
    //일정 초대
    path: "/section/member/schedule/invite",
    name: "invite-schedule",
    component: () => import("@/views/member/plan/InviteView")
  },
  {
    path: "/admin/service/faq/add",
    name: "faqs-add",
    component: () => import("@/views/admin/service/AddFAQView.vue"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/service/faq/:faqNum",
    name: "faqs-modify",
    component: () => import("@/views/admin/service/ModifyFAQView"),
    meta: { adminAuthRequired: true }
  },
  {
    path: "/admin/service/faq",
    name: "faqs-board",
    component: () => import("@/views/admin/service/FAQAdminView.vue"),
    meta: { adminAuthRequired: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(function (to, from, next) {
  if (
    to.matched.some(function (routeInfo) {
      return routeInfo.meta.adminAuthRequired;
    }) &&
    (!store._state.data.loginUser || store._state.data.loginUser.auth !== "admin")
  ) {
    alert("권한이 없습니다. 관리자라면 로그인하세요.");
    next("/member/login");
  } else {
    next();
  }
});

export default router;
