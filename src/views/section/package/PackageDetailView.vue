<template>
  <div class="wrapper">
    <div class="inner">
      <h1>빵의 도시 대전! 먹방 투어 (2박3일)</h1>
        <div class="galleria">
          <PackageDetailGalleria>
          </PackageDetailGalleria>
        </div>
        <br>
        <div class="info">
          <div>
            <PackageDetailItemInfo>
            </PackageDetailItemInfo>
          </div>
          <div>
            <PackageDetailForm>
            </PackageDetailForm>
          </div>
        </div>
        <img :src="require(`@/assets/section/package/images/haenam.png`)" style="width: 925px"/>
      <ScrollTop />
    </div>
  </div>
</template>

<script>
import PackageDetailGalleria from "@/components/section/package/detail/PackageDetailGalleria"
import PackageDetailItemInfo from "@/components/section/package/detail/PackageDetailItemInfo";
import PackageDetailForm from "@/components/section/package/detail/PackageDetailForm";
export default {
  components:{
    PackageDetailGalleria,
    PackageDetailItemInfo,
    PackageDetailForm
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
}
.inner{
  width: 1080px;
  margin: auto;
}
.galleria{
  width: 925px;
  margin: auto;
}
.info{
  width: 925px;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
.p-scrolltop{
  right: 20vw;
}
</style>