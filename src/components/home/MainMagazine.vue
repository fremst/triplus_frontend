<template>
<div class="magaTitle">
    <h2>여행 매거진</h2>
</div>
<div>
    <div class="magazineArea">
        <ul>
            <li>
                <a href="/">
                    <img :src="require('@/assets/magazine/제주.png')" class="magazine"/>
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
            <li>
                <a href="/">
                    <img :src="require('@/assets/magazine/매거진7.png')" class="magazine"/>
                </a> 
            </li>         
        </ul>
    </div>
    <div class="content-section implementation">
     <Slider v-model="value" :min="50" class="magaSlider" @change="changeMaga"/>
    </div>
</div>
</template>
<script>
import Slider from 'primevue/slider';
export default({
    name: 'MainMagazine',
    components:{
        Slider
    },
    data(){
        return {
            value:null,
            changemaga(){

            }
        }
    }
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
.magaTitle{
    margin-top: 200px;
}
.magazine {
  height: 300px;
  width: 200px;
  margin-right: 100px;
  border-radius: 20px;
}
.p-slider-horizontal {
    width: 30rem;
}
</style>