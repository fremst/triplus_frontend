<template>
  <div class="wrap">
    <AdminPageSidebar />
    <div class="inner">
      <div>
        <div class="card">
          <br />
          <DataTable
            ref="dt"
            v-model:selection="selectedProducts"
            :filters="filters"
            :paginator="true"
            :rows="5"
            :rowsPerPageOptions="[5, 10, 25]"
            :value="products"
            dataKey="brdNum"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
            responsiveLayout="scroll"
            style="text-align: center"
          >
            <template #header>
              <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h3>패키지 목록</h3>
                <Button @click="$router.push('/admin/packages/write')">새로 등록</Button>
              </div>
            </template>
            <Column header="썸네일" style="min-width: 8rem; text-align: center">
              <template #body="slotProps">
                <img
                  :src="`data:image/jpeg;base64,${slotProps.data.tImg}`"
                  :alt="slotProps.data.title"
                  class="product-image"
                />
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
                  <router-link :to="`/section/packages/` + slotProps.data.brdNum">
                    {{ slotProps.data.title }}
                  </router-link>
                </span>
              </template>
            </Column>
            <Column header="성인 가격" field="adultPrice" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                  {{ $getFormattedCurrency(slotProps.data.adultPrice) }}
                </span>
              </template>
            </Column>
            <Column header="아동 가격" field="childPrice" :sortable="true" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                  {{ $getFormattedCurrency(slotProps.data.childPrice) }}
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
            <Column header="수정" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                  <Button
                    @click="this.$router.push({ name: 'package-write', params: { brdNum: slotProps.data.brdNum } })"
                    >수정</Button
                  >
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
// import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import { defaultOptions } from "@/constant/axios";
import AdminPageSidebar from "@/components/admin/AdminPageSidebar";

export default {
  components: { AdminPageSidebar },

  data() {
    return {
      products: null,
      product: {},
      selectedProducts: null,
      filters: {}
    };
  },

  // created() {
  //   this.initFilters();
  // },

  mounted() {
    this.getList();
  },

  methods: {
    async getList() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/`;

      const res = await axios.get(getUrl, this.data, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      this.products = res.data;
    }
    // initFilters() {
    //   this.filters = {
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    //   };
    // }
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
  min-height: 750px;
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
