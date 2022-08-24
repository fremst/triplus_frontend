<template>
  <div class="wrap">
    <div class="magazineArea">
      <h2 class="main-title">여행 매거진</h2>
      <div class="magazineBox">
        <ul :style="`left: -${value * 11.16}px`">
          <li>
        <!--<a href="#" @click.prevent="showDetail(111)">-->
            <a href="#" @click.prevent="showDetail">
              <img :src="require('@/assets/magazine/제주.png')"  class="magazine" />
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="require('@/assets/magazine/전주.png')" class="magazine"/>
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="require('@/assets/magazine/서울.png')" class="magazine"/>
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="require('@/assets/magazine/부산.png')" class="magazine"/>
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="require('@/assets/magazine/매거진5.png')" class="magazine"/>
            </a>
          </li>
          <li>
            <a href="/">
              <img :src="require('@/assets/magazine/매거진6.png')" class="magazine"/>
            </a>
          </li>
          <li class="lastImg">
            <a href="/">
              <img :src="require('@/assets/magazine/매거진7.png')" class="magazine"/>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="content-section implementation">
      <Slider v-model="value" class="magaSlider" @change="changeMaga()"/>
    </div>
  </div>
</template>
<script>
import Slider from 'primevue/slider';

export default {
  name: 'MainMagazine',
  components: {
    Slider
  },
  data() {
    return {
      value: 50,
    }
  },
  methods: {
    changeMaga() {
      this.value
    },
    showDetail(){
      // this.$router.push({name:"magazine-detail",params:{brdNum:n}})
      this.$router.push({name:"magazine-detail"})
    }
  }
}
</script>
<style scoped>
.wrap {
  width: 100%;
}
.magazineArea {
  width: 1080px;
  margin: 0 auto;
}
.main-title {
  text-align: left;
  margin: 100px 0 20px;
  font-weight: bold;
  font-size: 30px;
}

ul {
  list-style: none;
  align-content: center;
  display: flex;
  justify-content: center;
  position: absolute;

}

.magazineBox {
  width: 1080px;
  height: 400px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}

li {
  flex: 1 1 25%;
}

h2 {
  text-align: left;
  margin-left: 80px;
}

.magazine {
  width: 300px;
  margin-right: 16px;
  border-radius: 20px;
}
.lastImg .magazine {
  margin-right: 0;
}

.p-slider-horizontal {
  width: 500px;
  margin: 50px auto 0;
}
</style>