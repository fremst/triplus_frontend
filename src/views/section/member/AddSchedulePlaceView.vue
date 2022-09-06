<template>
  <Dialog v-model:visible="showDialog" :modal="true" :style="{ width: '900px' }" header="일정추가">
    <div class="wrap">
      <div class="inner">
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
                <Button
                  label="나만의 장소 추가"
                  icon="pi pi-plus"
                  class="p-button-rounded p-button-help p-button-sm"
                  @click="goAddMyPlace"
                />
              </div>
            </template>
            <Column selectionMode="single" style="width: 3rem" :exportable="false"></Column>
            <Column header="장소이미지" style="min-width: 8rem">
              <template #body="slotProps">
                <img
                  :alt="slotProps.data.title"
                  :src="`data:image/jpeg;base64,${slotProps.data.firstimage}`"
                  class="product-image"
                />
              </template>
            </Column>
            <Column :sortable="true" field="title" header="장소명" style="min-width: 10rem; text-align: center">
              <template #body="slotProps">
                <span class="product-category">
                  <router-link :to="`/section/place/accommodation/` + slotProps.data.brdNum">
                    {{ slotProps.data.title }}
                  </router-link>
                </span>
              </template>
            </Column>
            <Column :sortable="true" field="addr" header="주소" style="min-width: 16rem">
              <template #body="slotProps">
                <span class="product-category">{{ slotProps.data.addr }}</span>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="field col-12 md:col-7">
        <label for="time">일정에 대한 시간을 입력해 주세요.</label>
        <Calendar id="time" v-model="date" :timeOnly="true" hourFormat="12" />
        <label for="memo">일정에 대한 메모를 입력해 주세요</label>
        <Textarea id="memo" v-model="memo" />
      </div>
      <Button class="p-button-text" icon="pi pi-times" label="취소" @click="closeDialog(false)" />
      <Button class="p-button-text" icon="pi pi-check" label="추가" @click="addSchedulePlace(selectedProducts)" />
    </template>
  </Dialog>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import { defaultOptions } from "@/constant/axios.js";
import axios from "axios";
export default {
  name: "AddScheduleDialog",
  props: {
    visible: {
      type: Boolean,
      default() {
        return true;
      }
    },
    skdNum: Number
  },
  emits: ["update:visible", "closeDialog", "addMarker"],
  data() {
    return {
      container: null,
      test: true,
      place: null,
      addr: null,
      mapx: null,
      mapy: null,
      date: null,
      memo: null,
      markers: [],
      infowindow: null,
      products: null,
      productDialog: false,
      deleteProductDialog: false,
      deleteProductsDialog: false,
      product: {},
      selectedProducts: null,
      filters: {},
      submitted: false,
      productService: null
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
  created() {
    this.initFilters();
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/myplaces/${localStorage.getItem("id")}`;
      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });
      this.products = res.data;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      };
    },
    goAddMyPlace() {
      this.$router.push({ name: "add-my-place", params: { skdNum: this.skdNum } });
    },
    closeDialog(returnValue) {
      this.showDialog = false;
      this.$emit("closeDialog", returnValue);
    },
    addSchedulePlace(selectedProducts) {
      this.$emit("addMarker", selectedProducts, this.date, this.memo);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
}
.inner {
  width: 90%;
  margin: 0 auto;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
#map {
  width: 400px;
  height: 350px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
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
  width: 80px;
  height: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
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
