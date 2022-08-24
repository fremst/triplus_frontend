<template>
 <div class="card">
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="min-width: 1080px;"
        :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
        <template #item="slotProps">
          <img :src="require(`@/assets/slide/${slotProps.item.itemImageSrc}`)" :alt="slotProps.item.alt" style=" display: block;" />
        </template>
    </Galleria>
</div>
</template>

<script>
import Galleria from 'primevue/galleria';
import GalleriaImages from '@/service/demo/photos.json';

export default ({
    name: 'MainSlider',
    components :{
        Galleria,
    },
    data() {
        return {
            images: null,
			responsiveOptions: [
				{
                    breakpoint: '1080px',
                    numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
			],
        }
    },
    galleriaService: null,
	mounted() {
		// this.galleriaService.getImages().then(data => this.images = data);
        this.images=GalleriaImages.data;
    },
})
</script>
<style lang="scss" scoped>
//인디케이터 css
.custom-indicator-galleria {
    .indicator-text {
        color: #e9ecef;
        cursor: pointer;
    }
   .p-highlight {
        .indicator-text {
            color: var(--primary-color);
        }
    }
}

//css 적용
  .p-galleria-item-wrapper {
    width: 100%;
    justify-content: center;
  }
  .p-galleria-item-container {
    margin: 0 auto;
    width: 1080px;
    position: relative;
    margin-top: 5%;
  }
</style>