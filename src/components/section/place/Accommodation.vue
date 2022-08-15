<template>
  <div class="wrap">
    <div class="inner">
      <Toolbar class="mb-4">
        <template #start>
          <Button class="p-button-success mr-2" icon="pi pi-plus" label="New" @click="openNew"/>
          <Button :disabled="!selectedProducts || !selectedProducts.length" class="p-button-danger" icon="pi pi-trash"
                  label="Delete"
                  @click="confirmDeleteSelected"/>
        </template>
        <template #end>
          <FileUpload :maxFileSize="1000000" accept="image/*" chooseLabel="Import" class="mr-2 inline-block"
                      label="Import"
                      mode="basic"/>
          <Button class="p-button-help" icon="pi pi-upload" label="Export" @click="exportCSV($event)"/>
        </template>
      </Toolbar>
      <div class="card">
        <DataTable ref="dt" v-model:selection="selectedProducts" :filters="filters" :paginator="true"
                   :rows="10" :rowsPerPageOptions="[5,10,25]" :value="products"
                   currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                   dataKey="id"
                   paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                   responsiveLayout="scroll">

          <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
              <span class="p-input-icon-left">
                            <i class="pi pi-search"/>
                            <InputText v-model="filters['global'].value" placeholder="검색어를 입력해주세요."/>
                        </span>
              <h5 class="mb-2 md:m-0 p-as-md-center">&nbsp;</h5>
            </div>
          </template>

          <Column :exportable="false" selectionMode="multiple" style="width: 3rem"></Column>
          <Column header="숙소이미지" style="min-width:12rem">
            <template #body="slotProps">
              <img :alt="slotProps.data.title" :src='slotProps.data.firstimage2'
                   class="product-image"/>
            </template>
          </Column>
          <Column :sortable="true" field="cat3" header="카테고리" style="min-width:8rem">
            <template #body="slotProps">
              <span class="product-category">{{ parseCategory(slotProps.data.cat3) }}</span>
            </template>
          </Column>
          <Column :sortable="true" field="title" header="숙소명" style="min-width:9rem">
            <template #body="slotProps">
           <span
               class="product-category">{{ slotProps.data.title }}</span>
            </template>
          </Column>
          <Column :sortable="true" field="addr1" header="주소" style="min-width:18rem">
            <template #body="slotProps">
           <span
               class="product-category">{{ slotProps.data.addr1 }}{{ slotProps.data.addr2 }}</span>
            </template>
          </Column>
          <Column :sortable="true" field="tel" header="전화번호" style="min-width:10rem">
            <template #body="slotProps">
           <span
               class="product-category">{{ slotProps.data.tel }}</span>
            </template>
          </Column>
          <Column :exportable="false" style="min-width:12rem">
            <template #body="slotProps">
              <Button class="p-button-rounded p-button-success mr-2" icon="pi pi-pencil"
                      @click="editProduct(slotProps.data)"/>
              <Button class="p-button-rounded p-button-warning" icon="pi pi-trash"
                      @click="confirmDeleteProduct(slotProps.data)"/>
            </template>
          </Column>
        </DataTable>
      </div>

      <Dialog v-model:visible="productDialog" :modal="true" :style="{width: '450px'}" class="p-fluid"
              header="숙소 상세정보">
        <img v-if="product.firstimage" :alt="product.title"
             :src='product.firstimage' class="product-image"/>
        <div class="field">
          <label class="mb-3" for="inventoryStatus">Category</label>
          <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label"
                    placeholder="카테고리를 선택하세요.">
            <template #value="slotProps">
              <div v-if="slotProps.value && slotProps.value.value">
                <span :class="'product-badge status-' +slotProps.value.value"></span>
              </div>
              <div v-else-if="slotProps.value && !slotProps.value.value">
                <span :class="'product-badge status-' +slotProps.value.toLowerCase()"></span>
              </div>
              <span v-else>
							{{ slotProps.placeholder }}
						</span>
            </template>
          </Dropdown>
        </div>
        <div class="field">
          <label for="name">숙소명</label>
          <InputText id="name" v-model.trim="product.title" :class="{'p-invalid': submitted && !product.title}"
                     autofocus
                     required="true"/>
          <small v-if="submitted && !product.name" class="p-error">숙소명을 입력해주세요!</small>
        </div>
        <div class="field">
          <label for="description">상세설명</label>
          <Textarea id="description" v-model="product.description" cols="20" required="true" rows="3"/>
        </div>

        <template #footer>
          <Button class="p-button-text" icon="pi pi-times" label="Cancel" @click="hideDialog"/>
          <Button class="p-button-text" icon="pi pi-check" label="Save" @click="saveProduct"/>
        </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductDialog" :modal="true" :style="{width: '450px'}" header="Confirm">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
          <span v-if="product"><b>{{ product.title }}</b> 을/를 삭제하시겠습니까?</span>
        </div>
        <template #footer>
          <Button class="p-button-text" icon="pi pi-times" label="No" @click="deleteProductDialog = false"/>
          <Button class="p-button-text" icon="pi pi-check" label="Yes" @click="deleteProduct"/>
        </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductsDialog" :modal="true" :style="{width: '450px'}" header="Confirm">
        <div class="confirmation-content">
          <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
          <span v-if="product">Are you sure you want to delete the selected products?</span>
        </div>
        <template #footer>
          <Button class="p-button-text" icon="pi pi-times" label="No" @click="deleteProductsDialog = false"/>
          <Button class="p-button-text" icon="pi pi-check" label="Yes" @click="deleteSelectedProducts"/>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import axios from "axios";
import placeCategory from "@/assets/section/place/placeCategory.json";

export default {
  name: 'Accommodation',
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
        {label: '호텔', value: '호텔'},
        {label: '펜션/민박', value: '펜션/민박'},
        {label: '모텔', value: '모텔'},
        {label: '게스트하우스', value: '게스트하우스'},
        {label: '기타', value: '기타'}
      ]
    }
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
    //관광API 카테고리 변경
    parseCategory(inputCat3) {
      let result = placeCategory.categoryData.filter(function (object) {
        return object['cat3'] === inputCat3;
      })[0];
      if (result) {
        return this.category = result.category
      } else {
        //설정해 두지 않은 카테고리가 나올 시, 기타로 처리.
        return '기타';
      }
    },
    getList() {
      axios.get('https://apis.data.go.kr/B551011/KorService/searchStay?serviceKey=q78jx2pDdopDli5F6rUCzaNdpTo1BPB5p%2FhBDuJQVUkaf89mwtC5fauNUQs2BFE50udejJt%2FGaKOkZ3Y9F28OA%3D%3D&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=Triplus&_type=json&listYN=Y&arrange=Q&hanOk=0&benikia=0&goodStay=0', this.data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }).then(res => {
            this.products = res.data.response.body.items.item;
          }
      ).catch(err => {
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

      if (this.product.name.trim()) {
        if (this.product.id) {
          this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
          this.products[this.findIndexById(this.product.id)] = this.product;
          this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        } else {
          this.product.id = this.createId();
          this.product.code = this.createId();
          this.product.image = 'product-placeholder.svg';
          this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
          this.products.push(this.product);
          this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.productDialog = false;
        this.product = {};
      }
    },
    editProduct(product) {
      this.product = {...product};
      this.productDialog = true;
    },
    confirmDeleteProduct(product) {
      this.product = product;
      this.deleteProductDialog = true;
    },
    deleteProduct() {
      this.products = this.products.filter(val => val.id !== this.product.id);
      this.deleteProductDialog = false;
      this.product = {};
      this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
    createId() {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteProductsDialog = true;
    },
    deleteSelectedProducts() {
      this.products = this.products.filter(val => !this.selectedProducts.includes(val));
      this.deleteProductsDialog = false;
      this.selectedProducts = null;
      this.$toast.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    },
    initFilters() {
      this.filters = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
      }
    }
  }
}
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
</style>