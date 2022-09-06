<template>
  <div class="wrapper">
    <div class="inner">
      <div class="title">
        <h1 style="color: #495057">{{ packageDetails.title }}</h1>
      </div>
      <hr />

      <div class="galleria">
        <PackageDetailGalleria :pkgImgs="pkgImgs"> </PackageDetailGalleria>
      </div>

      <hr />

      <div class="info">
        <div>
          <PackageDetailItemInfo :packageDetails="packageDetails"> </PackageDetailItemInfo>
        </div>
        <div>
          <PackageDetailForm :packageDetails="packageDetails"> </PackageDetailForm>
        </div>
      </div>

      <br />
      <hr />

      <div v-html="packageDetails.contents" class="contents"></div>
      <Toast></Toast>
      <ScrollTop />
    </div>
  </div>
</template>

<script>
import PackageDetailGalleria from "@/components/section/package/detail/PackageDetailGalleria";
import PackageDetailItemInfo from "@/components/section/package/detail/PackageDetailItemInfo";
import PackageDetailForm from "@/components/section/package/detail/PackageDetailForm";
import axios from "axios";
import { defaultOptions } from "@/constant/axios.js";

export default {
  data() {
    return {
      packageDetails: {},
      pkgImgs: {}
    };
  },

  async created() {
    const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/${this.$route.params.brdNum}`;

    const res = await axios.get(getUrl, defaultOptions).catch(err => {
      this.$toast.add({
        severity: "error",
        summary: "",
        detail: err,
        life: 3000
      });
    });

    this.packageDetails = Object.assign(res.data.dto, res.data.map);
    this.pkgImgs = res.data.map.pkgImgDtos.map(e => e.pkgImg);
  },

  components: {
    PackageDetailGalleria,
    PackageDetailItemInfo,
    PackageDetailForm
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
}

.inner {
  width: 1080px;
  margin: auto;
  text-align: center;
}

.title {
  margin-top: 20px;
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  margin-bottom: 15px;
  background: #dee2e6;
}

.galleria {
  width: 925px;
  margin: auto;
}

.contents {
  display: table;
  border: 1px solid #dee2e6;
  width: 925px;
  height: 250px;
  margin: auto;
  margin-bottom: 20px;
}

.contents ::v-deep(img) {
  max-width: 925px;
}

.info {
  width: 925px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.p-scrolltop {
  right: 20vw;
}
</style>
