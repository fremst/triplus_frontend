<template>
 <div class="card">
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px"
        :showItemNavigators="true" :showThumbnails="false" :showItemNavigatorsOnHover="true" :showIndicators="true">
        <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
        </template>
        <template #thumbnail="slotProps">
            <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="display: block;" />
        </template>
    </Galleria>
</div>
</template>

<script>
import Galleria from 'primevue/galleria';
import PhotoService from '../../service/PhotoService';

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
            data:[
                    {
                        "itemImageSrc": "src/assets/slide/triplus-slide01.png",
                        "alt": "Description for Image 1",
                        "title": "Title 1"
                    },
                    {
                        "itemImageSrc": "src/assets/slide/triplus-slide02.png",
                        "alt": "Description for Image 2",
                        "title": "Title 2"
                    },
                    {
                        "itemImageSrc": "src/assets/slide/triplus-slide03.png",

                        "alt": "Description for Image 3",
                        "title": "Title 3"
                    },
                    {
                        "itemImageSrc": "src/assets/slide/triplus-slide04.png",

                        "alt": "Description for Image 4",
                        "title": "Title 4"
                    },
                    {
                        "itemImageSrc": "src/assets/slide/triplus-slide05.png",
                        "alt": "Description for Image 5",
                        "title": "Title 5"
                    }
                ],
        }
    },
    galleriaService: null,
	created() {
		this.galleriaService = new PhotoService();
	},
	mounted() {
		this.galleriaService.getImages().then(data => this.images = data);
    },
})
</script>
<style lang="scss" scoped>
::v-deep(.custom-indicator-galleria) {
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
</style>