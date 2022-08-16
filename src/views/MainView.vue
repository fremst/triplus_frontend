<template>
    <div class="main">
        <div class="app-container">
            <MainSlider />
            <MainPlace />
            <MainMagazine/>
            <MainRecommHotel />
<!--            <MainEvent />-->
        </div>
    </div>
</template>
<script>
import MainSlider from "@/components/home/MainSlider.vue"
import MainPlace from "@/components/home/MainPlace.vue"
import MainMagazine from "@/components/home/MainMagazine.vue"
import MainRecommHotel from "@/components/home/MainRecommand.vue"
// import MainEvent from "@/components/home/MainEvent.vue"

export default {
    name: "MainView",
    components:{
        MainSlider,
        MainPlace,
        MainMagazine,
        MainRecommHotel,
        // MainEvent
    },
	data() {
		//
	}
};
</script>
<style scoped>
.mainContent {
    min-width: 1080px;
    min-height: 50px;
}
</style>
