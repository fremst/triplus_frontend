<template>
    <div class="place">
        <h2>인기여행지</h2>
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
            <li>
                <a href="/">
                    <img :src="require('@/assets/image/강릉.png')" class="places"/>
                </a> 
            </li>         
        </ul>
    </div>
</template>
<script>
export default({
    name: 'MainPlace'
})
</script>
<style scoped>
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
.places {
  height: 150px;
  width: 150px;
  margin-right: 100px;
  border-radius: 100px;
}
</style>