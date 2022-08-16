<template>
  <div class="wrapper">
    <div class="inner">
      <h1>{{packageDetails.title}}</h1>
        <div class="galleria">
          <PackageDetailGalleria :packageDetails="packageDetails">
          </PackageDetailGalleria>
        </div>
        <br>
        <div class="info">
          <div>
            <PackageDetailItemInfo :packageDetails="packageDetails">
            </PackageDetailItemInfo>
          </div>
          <div>
            <PackageDetailForm :packageDetails="packageDetails">
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
import axios from 'axios';

export default {
  data(){
    return {
      packageDetails: {},
    }
  },
  computed: {
    brdNum(){
      return this.$route.params.brdNum;
    }
  },
  created() {
    axios.get(`http://localhost:8082/triplus/api/section/packages/${this.brdNum}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(function(resp) {
      this.packageDetails=resp.data;
    }.bind(this)).catch(err=> {
      console.log(err)});
  },
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
  text-align: center;
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