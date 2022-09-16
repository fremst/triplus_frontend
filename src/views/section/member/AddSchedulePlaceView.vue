<template>
  <Dialog v-model:visible="showDialog" :modal="true" :style="{ width: '900px' }" header="일정추가">
    <div class="wrap">
      <div class="inner">
        <div class="card">
          <DataTable
            ref="dt"
            v-model:selection="selectedPlace"
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
                  class="p-button-rounded p-button-help p-button-sm"
                  icon="pi pi-plus"
                  label="나만의 장소 추가"
                  @click="goAddMyPlace"
                />
              </div>
            </template>
            <Column :exportable="false" selectionMode="single" style="width: 3rem"></Column>
            <Column header="장소이미지" style="min-width: 8rem">
              <template #body="slotProps">
                <img
                  v-if="slotProps.data.timg"
                  :alt="slotProps.data.title"
                  :src="`data:image/jpeg;base64,${slotProps.data.timg}`"
                  class="product-image"
                />
                <img
                  v-else
                  :alt="slotProps.data.title"
                  :src="require('@/assets/myPlaceImage.png')"
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
      <div>
        <div class="label-area">
          <label for="time">시간 입력 </label><br />
          <Calendar
            id="time"
            v-model="date"
            :timeOnly="true"
            hourFormat="12"
            placeholder="일정 시간을 입력하세요"
            style="width: 320px"
          />
        </div>
        <div class="label-area col-12">
          <label for="memo">메모 입력</label>
          <Textarea id="memo" v-model="memo" placeholder="일정에 대한 메모를 입력해 주세요" rows="5" cols="30" />
        </div>
      </div>
      <Button class="p-button-text" icon="pi pi-times" label="취소" @click="closeDialog(false)" />
      <Button class="p-button-text" icon="pi pi-check" label="추가" @click="addSchedulePlace(selectedPlace)" />
    </template>
  </Dialog>
  <Toast />
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
      timg: null,
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
      selectedPlace: null,
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
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
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
    addSchedulePlace(selectedPlace) {
      this.$emit("addMarker", selectedPlace, this.date, this.memo);
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
.label-area {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 50px;
}
</style>
