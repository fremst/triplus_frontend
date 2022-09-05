<template>
  <div class="wrapper">
    <div class="inner">
      <PackageList :packages="packages"></PackageList>
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
      alert("서버 연결 실패", err);
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
