<template>
  <div class="wrapper">
    <div class="inner">
      <h1>{{ packageDetails.title }}</h1>
      <div class="galleria">
        <PackageDetailGalleria :pkgImgs="pkgImgs"> </PackageDetailGalleria>
      </div>
      <br />
      <div class="info">
        <div>
          <PackageDetailItemInfo :packageDetails="packageDetails"> </PackageDetailItemInfo>
        </div>
        <div>
          <PackageDetailForm :packageDetails="packageDetails"> </PackageDetailForm>
        </div>
      </div>
      <div v-html="packageDetails.contents"></div>
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
      alert("서버 연결 실패", err);
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

.galleria {
  width: 925px;
  margin: auto;
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
