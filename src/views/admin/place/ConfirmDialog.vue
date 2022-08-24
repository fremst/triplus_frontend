<template>
  <Dialog v-model:visible="showDialog" :modal="true" :style="{ width: '450px' }" header="Confirm">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span>{{ msg }}</span>
    </div>
    <template #footer>
      <Button class="p-button-text" icon="pi pi-times" label="No" @click="closeDialog(false)" />
      <Button class="p-button-text" icon="pi pi-check" label="Yes" @click="closeDialog(true)" />
    </template>
  </Dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    visible: {
      type: Boolean,
      default() {
        return true;
      }
    },
    msg: String
  },
  emits: ["update:visible", "closeDialog"],
  data() {
    return {
      test: true
    };
  },
  computed: {
    //자식에서 값이 변경될 수 있으므로 computed로 처리. computed는 변경된 값을 바로 계산해줌.
    showDialog: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  created() {},
  methods: {
    closeDialog(returnValue) {
      this.showDialog = false;
      this.$emit("closeDialog", returnValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
}

.p-dialog .product-image {
  width: 300px;
  height: 200px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
