<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <PackageReservationItemInfo>
        </PackageReservationItemInfo>
      </div>
      <br>
      <PayView>
      </PayView>
    </div>
  </div>
</template>

<script>
import PackageReservationItemInfo from "@/components/section/package/reservation/PackageReservationItemInfo";
import PayView from "@/views/section/package/temp/PayView";

export default {
  components:{
    PackageReservationItemInfo,
    PayView
  }
}
</script>

<style scoped>
.wrapper{
  width: 1080px;
  margin: auto;
}
.inner{
  width: 900px;
  margin: auto;
}
</style>