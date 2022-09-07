<template>
  <div class="wrap">
    <div class="sidebar">
      <AdminPageSidebar />
    </div>
    <div class="inner">
      <div>
        <AdminPackageWrite />
      </div>
    </div>
    <Toast></Toast>
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
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
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
</style>
