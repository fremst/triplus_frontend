<template>
  <div>
    <Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" :showItemNavigators="true" :showThumbnails="false">
      <template #item="slotProps">
        <img :src="`data:image/jpeg;base64,${slotProps.item}`" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
      </template>
    </Galleria>
  </div>
</template>

<script>

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

  props: {

    pkgImgs: Object,
  
  },

  updated() {

    this.images = this.pkgImgs;

  }

}

</script>