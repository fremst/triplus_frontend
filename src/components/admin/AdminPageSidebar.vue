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
          label: "대시보드",
          icon: "pi pi-chart-line",
          to: { name: "admin-dashboard" }
        },
        {
          label: "예약 관리",
          icon: "pi pi-check-square",
          to: { name: "admin-reservations" }
        },
        {
          label: "Q&A",
          icon: "pi pi-comments",
          to: { name: "admin-qna-counsel" }
        },
        {
          label: "FAQ",
          icon: "pi pi-list",
          to: { name: "faqs-board" }
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
              to: { name: "admin-magazines" }
            },
            {
              label: "매거진 등록",
              to: { name: "magazine-write" }
            }
          ]
        },
        {
          label: "장소 관리",
          icon: "pi pi-map-marker",
          items: [
            {
              label: "관광 명소 목록",
              to: { name: "admin-attraction-list" }
            },
            {
              label: "맛집 목록",
              to: { name: "admin-restaurant-list" }
            },
            {
              label: "숙소 목록",
              to: { name: "admin-accommodation-list" }
            },
            {
              label: "장소 등록",
              to: { name: "admin-place-add" }
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
  /* position: absolute; */
  /* left: 200px; */
  z-index: 99;
}
</style>
