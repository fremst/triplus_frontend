<template>
  <div class="wrapper">
    <div class="inner">
      <PackageList></PackageList>
    </div>
  </div>

</template>

<script>
import PackageList from "@/components/section/package/list/PackageList";

export default {
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