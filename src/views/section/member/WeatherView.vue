<template>
  <div class="wrap">
    <div class="inner">
      <div id="map" style="width: 500px; height: 400px"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return;
  }
};
</script>
<style lang="scss" scoped>
//scss추가
@import "@/scss/main.scss";

.wrap {
  //모든 요소 가운데 정렬
  @include center;
  width: 100%;
  height: 100vh;
}

.inner {
  @include center-sb;
  width: 55%;
  height: 99%;
  max-width: 1080px;
  max-height: 960px;
}
</style>
