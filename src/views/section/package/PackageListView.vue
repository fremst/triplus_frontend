<template>
  <div class="wrapper">
    <div class="inner">
      <PackageList :packages="packages"></PackageList>
      <Toast></Toast>
    </div>
  </div>
</template>

<script>
import PackageList from "@/components/section/package/list/PackageList";
import axios from "axios";
import { defaultOptions } from "@/constant/axios";

export default {
  data() {
    return {
      packages: null
    };
  },

  async mounted() {
    const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages`;

    const res = await axios.get(getUrl, defaultOptions).catch(err => {
      this.$toast.add({
        severity: "error",
        summary: "",
        detail: err,
        life: 3000
      });
    });

    this.packages = res.data;
  },

  components: {
    PackageList
  }
};
</script>

<style scoped>
.wrapper {
  width: 1080px;
  margin: auto;
}

.inner {
  width: 100%;
  margin: auto;
}
</style>
