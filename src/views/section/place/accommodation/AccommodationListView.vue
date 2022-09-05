<template>
  <div class="wrap">
    <div class="inner">
      <!-- <h2 class="addlist-title">숙소 리스트</h2> -->
      <!-- 숙소 리스트 -->
      <div class="card">
        <DataTable
          ref="dt"
          v-model:selection="selectedProducts"
          :filters="filters"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 25]"
          :value="products"
          dataKey="brdNum"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
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
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column header="숙소이미지" style="min-width: 8rem">
            <template #body="slotProps">
              <img :alt="slotProps.data.title" :src="`data:image/jpeg;base64,${slotProps.data.firstimage}`" class="product-image" />
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
                <router-link :to="`/section/place/accommodation/`+slotProps.data.brdNum">
                  {{ slotProps.data.title }}
                </router-link>
              </span>
            </template>
          </Column>
          <Column :sortable="true" field="tel" header="전화번호" style="min-width: 16rem; text-align: center">
            <template #body="slotProps">
              <span class="product-category">
                  {{ slotProps.data.tel }}
              </span>
            </template>
          </Column>
          <Column :sortable="true" field="addr" header="주소" style="min-width: 20rem">
            <template #body="slotProps">
              <span class="product-category">{{ slotProps.data.addr }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
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
      submitted: false
    };
  },
  productService: null,
  created() {
    this.initFilters();
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get("http://localhost:8082/triplus/api/section/places/accommodation/", this.data, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        })
        .then(res => {
          this.products = res.data;
        })
        .catch(err => {
          console.log(err.response);
        });
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
