<template>
  <div>
    <MegaMenu :model="items" orientation="vertical" />
  </div>
</template>

<script>
export default {
  name: "MyPageSidebar",
  data() {
    return {
      id: localStorage.getItem("id"),

      items: [
        //정해진 폼이라 이미지 , 아이디 값 오버라이딩 불가.?
        { label: "개인정보 수정", icon: "pi pi-fw pi-users", to: "/member/mypage/chkpwd" },
        { label: "내 예약보기", icon: "pi pi-globe", to: "/member/mypage/reservation" },
        { label: "내 일정", icon: "pi pi pi-calendar", to: "/member/mypage/myschedule" },
        { label: "내 글 모아보기", icon: "pi pi-book" },
        { label: "찜 내역", icon: "pi pi-heart-fill" },
        { label: "쿠폰", icon: "pi pi-ticket" },
        { label: "알림", icon: "pi pi-bell" },
        { label: "탈퇴하기", icon: "pi pi-cog" }
      ]
    };
  }
};
</script>

<style scoped></style>
