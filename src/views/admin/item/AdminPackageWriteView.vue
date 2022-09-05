<template>
  <div class="wrap">
    <AdminPageSidebar />
    <div class="inner">
      <div>
        <AdminPackageWrite />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios";
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";
import AdminPackageWrite from "@/components/admin/item/PackageWrite.vue";

export default {
  components: {
    AdminPageSidebar,
    AdminPackageWrite
  },

  mounted() {
    this.getList();
  },

  methods: {
    async getList() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      this.products = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  align-content: center;
  justify-content: center;
}

.wrap {
  width: 100%;
}

.inner {
  width: 1080px;
  margin: 0 auto;
}
</style>
