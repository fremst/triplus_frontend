<template>
  <div class="wrapper">
    <div class="inner">
      <PackageList :packages = "packages"></PackageList>
    </div>
  </div>

</template>

<script>
import PackageList from "@/components/section/package/list/PackageList";
import axios from "axios";

export default {
  data(){
    return{
      packages: null,
    }
  },
  mounted() {
    axios.get("http://localhost:8082/triplus/api/section/packages", {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(function(resp) {
      this.packages=resp.data;
    }.bind(this)).catch(err=> {
      console.log(err)});
  },
  components:{
    PackageList
  }
}

</script>
<style scoped>
.wrapper{
  width: 1080px;
  margin: auto;
}
.inner{
  width: 100%;
  margin: auto;
}
</style>