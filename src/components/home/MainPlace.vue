<template>
  <div class="wrap">
    <div class="place">
      <h2 class="main-title">인기 여행지</h2>
      <ul>
        <li>
          <a href="/">
            <img :src="require('@/assets/image/jeju.png')" class="places"/>
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/image/부산.png')" class="places"/>
          </a>
        </li>
        <li>
          <a href="/">
            <img :src="require('@/assets/image/전주.png')" class="places"/>
          </a>
        </li>
        <li class="lastImg">
          <a href="/">
            <img :src="require('@/assets/image/강릉.png')" class="places"/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default ({
  name: 'MainPlace'
})
</script>
<style scoped>
.wrap {
  width:100%;
}
.place {
  width: 1080px;
  margin : 0 auto;
}
ul {
  list-style: none;
  align-content: center;
  display: flex;
  justify-content: space-between;
}
li {
  width: calc((100% - (16px * 3)) / 4);
}

.main-title {
  text-align: left;
  margin: 20px 0;
  font-weight: bold;
  font-size: 30px;
}

.places {
  width: 250px;
  border-radius: 50%;
  display: flex;
  justify-content:space-between;
}
</style>