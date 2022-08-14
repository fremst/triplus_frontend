<template>
  <div>
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" :showItemNavigators="true" :showThumbnails="false">
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
      </template>
    </Galleria>
  </div>
</template>

<script>
import Photos from '@/assets/section/package/photos.json'

export default {
  data() {
    return {
      images: null,
      responsiveOptions: [
        {
          breakpoint: '1024px',
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
      ]
    }
  },
  mounted() {
    this.images = Photos.data;
  }
}
</script>

<style scoped>

</style>