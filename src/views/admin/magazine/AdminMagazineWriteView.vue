<template>
  <div class="wrap">
    <div class="sidebar">
      <AdminPageSidebar />
    </div>
    <div class="inner">
      <div>
        <MagazineWrite />
      </div>
    </div>
  </div>
</template>

<script>
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
import MagazineWrite from "@/components/admin/magazine/MagazineWrite";

export default {
  components: {
    AdminPageSidebar,
    MagazineWrite
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  min-height: 750px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.inner {
  width: 1080px;
}
.sidebar {
  margin-left: -220px;
  margin-right: 20px;
}
.title {
  margin-bottom: 10px;
}
</style>
