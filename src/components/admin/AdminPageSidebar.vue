<template>
  <div class="admin-page-sidebar">
    <TieredMenu :model="items" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: "관리자 메뉴"
        },
        {
          separator: true
        },
        {
          label: "매출 현황",
          icon: "pi pi-chart-line",
          items: [
            {
              label: "인기 상품",
              to: "admin/sales/bestitem"
            },
            {
              label: "판매 내역",
              to: "admin/sales/list"
            },
            {
              label: "예약 현황 조회",
              to: "admin/sales/reservation"
            }
          ]
        },
        {
          label: "예약 관리",
          icon: "pi pi-check-square",
          to: { name: "admin-reservations" }
        },
        {
          label: "신고글 관리",
          icon: "pi pi-eye-slash"
        },
        {
          label: "고객 관리",
          icon: "pi pi-id-card",
          items: [
            {
              label: "회원 조회",
              to: { name: "" }
            },
            {
              label: "신고 회원 관리",
              to: { name: "" }
            }
          ]
        },
        {
          label: "패키지 관리",
          icon: "pi pi-shopping-bag",
          items: [
            {
              label: "패키지 목록",
              to: { name: "admin-packages" }
            },
            {
              label: "패키지 등록",
              to: { name: "package-write" }
            }
          ]
        },
        {
          label: "매거진 관리",
          icon: "pi pi-book",
          items: [
            {
              label: "매거진 목록",
              to: { name: "" }
            },
            {
              label: "매거진 등록",
              to: { name: "magazine-write" }
            }
          ]
        },
        {
          label: "쿠폰 관리",
          icon: "pi pi-money-bill",
          items: [
            {
              label: "쿠폰 발행",
              to: "admin/coupons/issue"
            },
            {
              label: "쿠폰 조회",
              to: "admin/coupons"
            }
          ]
        },
        {
          label: "장소 관리",
          icon: "pi pi-map-marker",
          items: [
            {
              label: "명소 관리",
              to: { name: "" }
            },
            {
              label: "맛집 관리",
              to: { name: "" }
            },
            {
              label: "숙소 관리",
              to: { name: "" }
            },
            {
              label: "장소 추가",
              to: { name: "place-add" }
            }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.admin-page-sidebar {
  margin-top: 20px;
  position: absolute;
  left: 200px;
  z-index: 99;
}
</style>
