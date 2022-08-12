<template>
<div class="hotelTitle">
        <h2>트리플러스 숙소 추천</h2>
</div>
    <div class="mainRrecommHotel">
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
        </ul>
    </div>
</template>
<script>
export default({
    name: 'MainRrecommHotel'
})
</script>
<style scoped>
.hotelTitle{
    margin-top: 400px;
}
ul {
    list-style: none;
    align-content: center;
}
li {
    float: left;
}
h2 {
    text-align: left;
    margin-left:80px;
}
.hotels {
  height: 280px;
  width: 200px;
  margin-right: 100px;
  border-radius: 20px;
}
</style>