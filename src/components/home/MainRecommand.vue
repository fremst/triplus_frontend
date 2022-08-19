<template>
  <div class="wrap">
    <div class="mainRrecommHotel">
      <h2 class="main-title">트리플러스 숙소 추천</h2>
      <ul>
        <li>
          <a href="/">
            <img :src="require('@/assets/hotel/1.png')" class="hotels"/>
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/hotel/2.png')" class="hotels"/>
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/hotel/3.png')" class="hotels"/>
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/hotel/4.png')" class="hotels last-img"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default ({
  name: 'MainRrecommHotel'
})
</script>
<style scoped>
.wrap {
  width: 100%;
}
.mainRrecommHotel{
  width: 1080px;
  margin:0 auto;
}
.main-title {
  text-align: left;
  margin: 100px 0 20px;
  font-weight: bold;
  font-size: 30px;
}
ul {
  list-style: none;
  display: flex;
  justify-content: center;

}

.hotels {
  width: 250px;
  margin-right: 25px;
  margin-bottom: 100px;
  border-radius: 20px;
}

.last-img {
  margin-right: 0;
}

</style>