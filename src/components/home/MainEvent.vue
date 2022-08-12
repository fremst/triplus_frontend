<template>
    <div class="event">
        <ul>
            <li>
                <a href="/">
                    <img :src="require('@/assets/event/1.png')" class="events"/>
                </a> 
            </li>
            <li>
                <a href="/">
                    <img :src="require('@/assets/event/2.png')" class="events"/>
                </a> 
            </li> 
            <li>
                <a href="/">
                    <img :src="require('@/assets/event/3.png')" class="events"/>
                </a> 
            </li> 
            <li>
                <a href="/">
                    <img :src="require('@/assets/event/4.png')" class="events"/>
                </a> 
            </li>         
        </ul>
    </div>
</template>
<script>
export default({
    name: 'MainEvent'
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
.events {
  height: 150px;
  width: 150px;
  margin-right: 100px;
  border-radius: 10px;
}
</style>