import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import AdminView from "@/views/admin/AdminView";

import AddPlaceView from "@/views/admin/place/AddPlaceView";
import ModifyPlaceView from "@/views/admin/place/ModifyPlaceView";
import AdminPackageListView from "@/views/admin/item/AdminPackageListView";
import AdminPackageWriteView from "@/views/admin/item/AdminPackageWriteView";
import AdminReservationView from "@/views/admin/reservation/AdminReservationView";

import AdminQnACounselView from "../views/admin/service/AdminQnACounselView.vue";
import QnAView from "../views/member/service/QnAView.vue";
import QnAWriteView from "../views/member/service/QnAWriteView.vue";
import QnADetailView from "../views/member/service/QnADetailView.vue";

import MyReservationDetailView from "../views/member/MyReservationView";

import PackageListView from "@/views/section/package/PackageListView";
import PackageDetailView from "@/views/section/package/PackageDetailView";
import PackageReservationView from "@/views/section/package/PackageReservationView";
import PackageReservationCompleteView from "@/views/section/package/PackageReservationCompleteView";

import AttractionListView from "@/views/section/place/attraction/AttractionListView";
import AttractionDetailView from "@/views/section/place/attraction/AttractionDetailView";
import RestaurantListView from "@/views/section/place/restaurant/RestaurantListView";
import RestaurantDetailView from "@/views/section/place/restaurant/RestaurantDetailView";
import AccommodationListView from "@/views/section/place/accommodation/AccommodationListView";
import AccommodationDetailView from "@/views/section/place/accommodation/AccommodationDetailView";

import AddMyScheduleView from "@/views/section/member/AddMyScheduleView";
import MyScheduleMainView from "@/views/section/member/MyScheduleMainView";
import AddSchedulePlaceView from "@/views/section/member/AddSchedulePlaceView";
import AddMyPlaceView from "@/views/section/member/AddMyPlaceView";
import WeatherView from "@/views/section/member/WeatherView";

import MemberJoinView from "@/views/member/MemberJoinView";
import tosView from "@/views/member/TosView";
import LoginView from "@/views/member/LoginView";
import FindView from "@/views/member/FindView";
import showIDView from "@/views/member/ShowIDView";
import showPwdView from "@/views/member/ShowPwdView";
import changePwdView from "@/views/member/ChangePwdView";
import joinCompleteView from "@/views/member/JoinCompleteView";
import myPageCheckPwdView from "@/views/member/mypage/MyPageCheckPwdView";
import MyPageUpdateView from "@/views/member/mypage/MyPageUpdateView";
import MyReservationView from "@/views/member/mypage/MyReservationView";
import MyScheduleView from "@/views/member/mypage/MyScheduleView";

import checkListView from "@/views/member/plan/CheckListView";
import ExpensesView from "@/views/member/plan/ExpensesView";
import InviteView from "@/views/member/plan/InviteView";

import MainView from "../views/MainView.vue";

const routes = [
  {
    path: "/admin/packages/write",
    name: "package-write",
    component: AdminPackageWriteView
  },
  {
    path: "/admin/packages/:brdNum/update",
    name: "package-update",
    component: AdminPackageWriteView
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    beforeEnter: function (to, from, next) {
      if (store.state.auth === "admin") {
        next();
      } else {
        alert("권한이 없습니다");
        next("/");
      }
    }
  },
  {
    path: "/",
    name: "main",
    component: MainView
  },
  //관리자 장소추가
  {
    path: "/admin/place",
    name: "place-add",
    component: AddPlaceView
  },
  //관리자 장소 수정
  {
    path: "/admin/place/:brdNum",
    name: "place-modify",
    component: ModifyPlaceView
  },
  {
    path: "/admin/packages",
    name: "admin-packages",
    component: AdminPackageListView
  },
  {

    path: "/admin/magazines",
    name: "admin-magazines",
    component: () => import("@/views/admin/magazine/AdminMagazineListView.vue")
  },
  {
    path: "/admin/reservations",
    name: "admin-reservations",
    component: AdminReservationView

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
  // 문의글
  {
    path: "/admin/service/qna/counsel",
    name: "admin-qna-counsel",
    component: AdminQnACounselView
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
    path: "/service/qna/:brdNum/detail",
    name: "qna-detail",
    component: QnADetailView
  },
  //회원 관련
  {
    //아이디 / 비밀번호 찾는 view
    path: "/member/find",
    name: "find",
    component: FindView
  },
  {
    //회원가입 view
    path: "/memberjoin",
    name: "memberjoin",
    component: MemberJoinView,
    beforeEnter: function (to, from, next) {
      alert("잘못된 요청입니다");
      next("/");
    }
    // meta:{member:true}
  },
  {
    //로그인view
    path: "/member/login",
    name: "member-login",
    component: LoginView
  },
  {
    //회원가입 이용약관
    path: "/memberjoin/tos",
    name: "tos",
    component: tosView
  },
  {
    // 찾는 아이디 보여주는 view
    path: "/member/showid",
    name: "showId",
    component: showIDView,
    beforeEnter: function (to, from, next) {
      alert("잘못된 요청입니다");
      next("/");
    }
  },
  {
    // 비밀번호 찾기 view
    path: "/member/showpwd",
    name: "showPwd",
    component: showPwdView
  },
  {
    // 비밀번호 변경 view
    path: "/member/changepwd",
    name: "changePwd",
    component: changePwdView,
    beforeEnter: function (to, from, next) {
      alert("잘못된 요청입니다");
      next("/");
    }
  },
  {
    path: "/memberjoin/complete",
    name: "join-complete",
    component: joinCompleteView,
    beforeEnter: function (to, from, next) {
      alert("잘못된 요청입니다");
      next("/");
    }
  },
  {
    path: "/member/myreservation/:oid",
    name: "myreservation",
    component: MyReservationDetailView
  },

  {
    path: "/member/plan/checklist",
    name: "member-checklist",
    component: checkListView,
    beforeEnter: function (to, from, next) {
      alert("잘못된 요청입니다");
      next("/");
    }
  },
  {
    path: "/member/plan/:skdNum/expenses",
    name: "member-expenses",
    component: ExpensesView
  },
  //마이페이지
  {
    // 비밀번호 확인 view
    path: "/member/mypage/chkpwd",
    name: "mypage-chkpwd",
    component: myPageCheckPwdView
  },
  {
    //회원정보 수정 view
    path: "/member/mypage/update",
    name: "mypage-update",
    component: MyPageUpdateView,
    beforeEnter: function (to, from, next) {
      alert("잘못된 요청입니다");
      next("/member/mypage/chkpwd");
    }
  },
  {
    //내 예약보기
    path: "/member/mypage/reservation",
    name: "mypage-reservation",
    component: MyReservationView
  },
  {
    //내 일정
    path: "/member/mypage/myschedule",
    name: "mypage-myschedule",
    component: MyScheduleView
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
    path: "/section/packages/reservation-complete/:oid",
    name: "package-reservation-complete",
    component: PackageReservationCompleteView
  },
  //명소 리스트
  {
    path: "/section/place/attraction",
    name: "attraction-list",
    component: AttractionListView
  },
  //명소 상세페이지
  {
    path: "/section/place/attraction/:brdNum",
    name: "attraction-detail",
    component: AttractionDetailView
  },
  //맛집 리스트
  {
    path: "/section/place/restaurant",
    name: "restaurant-list",
    component: RestaurantListView
  },
  //맛집 상세페이지
  {
    path: "/section/place/restaurant/:brdNum",
    name: "restaurant-detail",
    component: RestaurantDetailView
  },
  //숙박 리스트
  {
    path: "/section/place/accommodation",
    name: "accommodation-list",
    component: AccommodationListView
  },
  //숙박 상세페이지
  {
    path: "/section/place/accommodation/:brdNum",
    name: "accommodation-detail",
    component: AccommodationDetailView
  },
  {
    path: "/admin/magazines/write",
    name: "magazine-write",
    component: () => import("@/views/admin/magazine/MagazineWriteView.vue")
  },
  {
    path: "/admin/magazines/:brdNum/update",
    name: "magazine-update",
    component: () => import("@/views/admin/magazine/MagazineWriteView.vue")
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
    component: AddMyScheduleView
  },
  //일정등록 메인페이지
  {
    path: "/section/member/schedule/main",
    name: "add-schedule-main",
    component: MyScheduleMainView
  },
  //일정등록 추가
  {
    path: "/section/member/schedule/add-place",
    name: "add-schedule-place",
    component: AddSchedulePlaceView
  },
  //나만의 장소 추가
  {
    path: "/section/member/schedule/add-my-place",
    name: "add-my-place",
    component: AddMyPlaceView
  },
  //날씨보기
  {
    path: "/section/member/schedule/weather",
    name: "schedule-weather",
    component: WeatherView
  },
  {
    path: "/admin/service/faq",
    name: "faqs",
    component: () => import("@/views/admin/service/FAQView.vue")
  },
  {
    //일정 초대
    path: "/section/member/schedule/invite",
    name: "invite-schedule",
    component: InviteView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// //라우터 전역 가드 test
// router.beforeEach(function (to, from, next) {
//   if (
//     to.matched.some(function (info) {
//       return info.meta.member; // true
//     })
//   ) {
//     // 회원만 가능페이지 라우터 meta 속성의  true이면
//     alert("회원만 이용가능");
//     next("/member/login"); // 리다이렉트
//   } else {
//     next();
//   }
// });

export default router;
