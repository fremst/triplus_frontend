<template>
  <div class="wrap">
    <AdminPageSidebar/>
    <div class="inner">
      <div>
        <div class="card">
          <br>
          <DataTable
              ref="dt"
              v-model:selection="selectedProducts"
              :filters="filters"
              :paginator="true"
              :rows="5"
              :rowsPerPageOptions="[5, 10, 25]"
              :value="products"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
              dataKey="brdNum"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              responsiveLayout="scroll"
              style="text-align: center"
          >
            <template #header>
              <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h3>패키지 목록</h3>
                <Button @click="$router.push('/admin/package/add')">새로 등록</Button>
              </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column header="썸네일" style="min-width: 8rem; text-align: center">
              <template #body="slotProps">
                <img :src="require(`@/assets/section/package/images/${slotProps.data.tImg}`)" :alt="slotProps.data.title" class="product-image" />
              </template>
            </Column>
            <Column header="여행 지역" field="region" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">{{ slotProps.data.region }}</span>
              </template>
            </Column>
            <Column header="패키지 상품명" field="title" :sortable="true" style="min-width: 19rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                  <router-link :to="`/section/packages/`+slotProps.data.brdNum">
                    {{ slotProps.data.title }}
                  </router-link>
                </span>
              </template>
            </Column>
            <Column header="성인 가격" field="adultPrice" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                    {{ slotProps.data.adultPrice }}
                </span>
              </template>
            </Column>
            <Column header="아동 가격" field="childPrice" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                    {{ slotProps.data.childPrice }}
                </span>
              </template>
            </Column>
            <Column header="모집 상태" field="rcrtSta" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                    {{ slotProps.data.rcrtSta }}
                </span>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";

export default {

  components: { AdminPageSidebar },

  data() {

    return {

      products: null,
      // productDialog: false,
      // deleteProductDialog: false,
      // deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      // submitted: false
    };

  },

  created() {

    this.initFilters();

  },

  mounted() {

    this.getList();

  },
  methods: {

    getList() {

      axios
          .get("http://localhost:8082/triplus/api/section/packages/", this.data, {

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
  //height: 100px;
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

.p-column-header-content {
  display: flex;
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
