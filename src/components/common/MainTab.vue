<template>
  <div>
    <div class="card">
      <TabMenu v-model:model="items" class="tabs" />
    </div>
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
export default {
  name: "MainTab",
  components: {
    TabMenu
  },
  data() {
    return {
      active: 3,
      items: [
        {
          label: "홈",
          icon: "pi pi-fw pi-home",
          to: "/"
        },
        {
          label: "패키지",
          icon: "pi pi-fw pi-briefcase",
          to: "/section/packages"
        },
        {
          label: "매거진",
          icon: "pi pi-fw pi-book",
          to: "/section/magazines"
        },
        {
          label: "관광명소",
          icon: "pi pi-fw pi-camera",
          to: "/section/place/attraction"
        },
        {
          label: "맛집",
          icon: "pi pi-fw pi-cloud",
          to: "/section/place/restaurant"
        },
        {
          label: "숙소",
          icon: "pi pi-fw pi-building",
          to: "/section/place/accommodation"
        },
        {
          label: "일정등록",
          icon: "pi pi-fw pi-calendar",
          to: "/section/member"
        }
      ]
    };
  },
  computed: {
    loginAuth() {
      if (this.$store.state.loginUser) {
        return this.$store.state.loginUser.auth;
      }
      return null;
    }
  },
  watch: {
    loginAuth: function (auth) {
      if (auth == "admin") {
        this.items.push({
          label: "관리",
          icon: "pi pi-fw pi-cog",
          to: "/admin/reservations",
          auth: "admin"
        });
      } else {
        this.items = this.items.filter(e => e.auth != "admin");
      }
    }
  }
};
</script>

<style lang="scss">
.p-tabmenu .p-tabmenu-nav {
  width: 100%;
  justify-content: center;
}
.tabmenudemo-content {
  padding: 2rem 1rem;
  background-color: #91d9cc;
}
</style>
