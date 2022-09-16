<template>
  <div>
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions2"
      :numVisible="3"
      :circular="true"
      :autoPlay="true"
      transitionInterval="2000"
      thumbnailsPosition="right"
      containerStyle="height: 460px;"
    >
      <template #item="slotProps">
        <img
          :src="`data:image/jpeg;base64,${slotProps.item}`"
          :alt="slotProps.item.alt"
          style="height: 440px; display: block"
        />
      </template>
      <template #thumbnail="slotProps">
        <div class="grid grid-nogutter justify-content-center">
          <img
            :src="`data:image/jpeg;base64,${slotProps.item}`"
            :alt="slotProps.item.alt"
            style="height: 100px; display: block"
          />
        </div>
      </template>
    </Galleria>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: null
    };
  },

  props: {
    pkgImgs: Object
  },

  updated() {
    this.images = this.pkgImgs;
  }
};
</script>

<style scoped>
::v-deep(.p-galleria .p-galleria-thumbnail-container) {
  /* background: #666; */
  background: rgb(196, 196, 196);
  justify-content: center;
}

::v-deep(div.p-galleria-content) {
  justify-content: center;
}
</style>
