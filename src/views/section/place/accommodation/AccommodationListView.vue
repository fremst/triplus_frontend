<template>
  <div class="wrap">
    <div class="inner">
      <h2 class="addlist-title">숙소 리스트</h2>
      <div class="card">
        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :filters="filters"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 25]"
          :value="products"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          dataKey="contentid"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll"
          style="text-align: center"
        >
          <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="검색어를 입력해주세요." />
              </span>
              <h5 class="mb-2 md:m-0 p-as-md-center">&nbsp;</h5>
            </div>
          </template>

          <Column header="숙소이미지" style="min-width: 8rem">
            <template #body="slotProps">
              <img :alt="slotProps.data.title" :src="slotProps.data.firstimage" class="product-image" />
            </template>
          </Column>
          <Column :sortable="true" field="scatName" header="카테고리" style="min-width: 8rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">{{ slotProps.data.scatName }}</span>
            </template>
          </Column>
          <Column :sortable="true" field="title" header="숙소명" style="min-width: 16rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                <router-link to="/section/places/accommodation/${slotProps.data.brdNum}">
                  {{ slotProps.data.title }}
                </router-link>
              </span>
            </template>
          </Column>
          <Column :sortable="true" field="addr" header="주소" style="min-width: 20rem">
            <template #body="slotProps">
              <span class="product-category">{{ slotProps.data.addr }}</span>
            </template>
          </Column>
          <Column field="rating" header="Reviews" :sortable="true" style="min-width: 12rem">
            <template #body="slotProps">
              <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
          </Column>
          <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
              <Button
                class="p-button-rounded p-button-success mr-2"
                icon="pi pi-pencil"
                @click="$router.push(`/section/places/accommodation/${slotProps.data.brdNum}`)"
              />
              <Button
                class="p-button-rounded p-button-warning"
                icon="pi pi-trash"
                @click="confirmDeleteProduct(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <Dialog v-model:visible="deleteProductDialog" :modal="true" :style="{ width: '450px' }" header="Confirm">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
          <span v-if="product"
            ><b>{{ product.title }}</b> 을/를 삭제하시겠습니까?</span
          >
        </div>
        <template #footer>
          <Button class="p-button-text" icon="pi pi-times" label="No" @click="deleteProductDialog = false" />
          <Button class="p-button-text" icon="pi pi-check" label="Yes" @click="deleteProduct" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";

export default {
  data() {
    return {
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
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
        .get("localhost:8082/triplus/api/section/places/accommodation", this.data, {
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
    editProduct(product) {
      this.product = { ...product };
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    confirmSaveSelected(product) {
      this.product = product;
      this.submitted = true;
    },
    deleteProduct() {
      this.products = this.products.filter(val => val.title !== this.product.title);
      this.deleteProductDialog = false;
      this.product = {};
      this.$toast.add({ severity: "success", summary: "Successful", detail: "Product Deleted", life: 3000 });
    },
    findIndexById(title) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].title === title) {
          index = i;
          break;
        }
      }

      return index;
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.$toast.add({ severity: "success", summary: "Successful", detail: "Products Deleted", life: 3000 });
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  align-content: center;
  justify-content: center;
}

.wrap {
  width: 100%;
}

.inner {
  width: 1080px;
  margin: 0 auto;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.p-input-icon-left > .p-inputtext {
  width: 300px;
}

.p-datatable .p-datatable-thead > tr > th {
  text-align: center;
  align-content: center;
  justify-content: center;
  padding: 15px 15px;
  border-width: 0 0 1px 0;
  font-weight: 700;
  font-size: 16px;
  color: #343a40;
  background: #f8f9fa;
  transition: box-shadow 0.2s;
}

.p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
  justify-content: center;
  vertical-align: middle;
  font-size: 14px;
  border-width: 0 0 1px 0;
  padding: 15px 15px;
}

.product-image {
  width: 100px;
  height: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
.addlist-title {
  margin: 15px 0 10px 0;
}
</style>
