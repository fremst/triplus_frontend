<template>
  <div class="wrap">
    <div class="inner">
      <h1>숙소 상세정보</h1>
      <img v-if="product.firstimage" :alt="product.title" :src="product.firstimage" class="product-image" />
      <div class="field">
        {{ product.scatName }}
      </div>
      <div class="field">
        <label for="title">숙소명</label>
        <InputText
          id="title"
          v-model.trim="product.title"
          :class="{ 'p-invalid': submitted && !product.title }"
          autofocus
          required="true"
        />
        <small v-if="submitted && !product.title" class="p-error">숙소명을 입력해주세요.</small>
      </div>
      <div class="field">
        <label for="tel">전화번호</label>
        <InputText
          id="tel"
          v-model.trim="product.tel"
          :class="{ 'p-invalid': submitted && !product.tel }"
          autofocus
          required="true"
        />
        <small v-if="submitted && !product.tel" class="p-error">전화번호를 입력해주세요.</small>
      </div>
      <div class="field">
        <label for="addr1">주소</label>
        <InputText
          id="addr1"
          v-model.trim="product.addr1"
          :class="{ 'p-invalid': submitted && !product.addr1 }"
          autofocus
          required="true"
          >{{ slotProps.data.addr1 }}{{ slotProps.data.addr2 }}</InputText
        >
        <small v-if="submitted && !product.addr1" class="p-error">주소를 입력해주세요.</small>
      </div>
      <div class="field">
        <label for="description">상세설명</label>
        <Textarea id="description" v-model="product.description" cols="20" required="true" rows="3" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      products: null,
      submitted: false,
      statuses: [
        { label: "호텔", value: "호텔" },
        { label: "펜션/민박", value: "펜션/민박" },
        { label: "모텔", value: "모텔" },
        { label: "게스트하우스", value: "게스트하우스" },
        { label: "기타", value: "기타" }
      ]
    };
  },
  productService: null,
  created() {
    this.initFilters();
  },
  mounted() {
    this.getList();
    this.parseCategory();
  },
  methods: {
    getList() {
      axios
        .get("localhost:8082/triplus/api/section/places/accommodation/{brdNum}", this.data, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => {
          this.products = res.data.response.body.items.item;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    saveProduct() {
      this.submitted = true;

      if (this.product.title.trim()) {
        if (this.product.title) {
          this.product.inventoryStatus = this.product.inventoryStatus.value
            ? this.product.inventoryStatus.value
            : this.product.inventoryStatus;
          this.products[this.findIndexById(this.product.title)] = this.product;
          this.$toast.add({ severity: "success", summary: "Successful", detail: "Product Updated", life: 3000 });
        } else {
          this.product.title = this.createId();
          this.product.contentid = this.createId();
          this.product.image = "product-placeholder.svg";
          this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : "기타";
          this.products.push(this.product);
          this.$toast.add({ severity: "success", summary: "Successful", detail: "Product Created", life: 3000 });
        }

        this.productDialog = false;
        this.product = {};
      }
    },
    editProduct(product) {
      this.product = { ...product };
      this.productDialog = true;
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
}
.inner {
  width: 1080px;
  margin: 0 auto;
}
</style>
