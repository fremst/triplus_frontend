<template>
  <div class="card">
    <DataView
      :value="packages"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="여행 지역명 정렬"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img :src="`data:image/jpeg;base64,${slotProps.data.tImg}`" :alt="slotProps.data.title" />
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.title }}</div>
              <br />
              <div class="product-description">
                성인 {{ $getFormattedCurrency(slotProps.data.adultPrice) }} / 아동
                {{ $getFormattedCurrency(slotProps.data.adultPrice) }}
              </div>
              <i class="pi pi-map-marker"></i><span class="product-category">{{ slotProps.data.region }}</span>
            </div>
            <div class="product-list-action">
              <Button
                icon="pi pi-search"
                label="상세보기"
                :disabled="rcrtStaEng(slotProps.data.rcrtSta) === 'completed'"
                @click="$router.push(`/section/packages/${slotProps.data.brdNum}`)"
              ></Button>
              <span :class="'product-badge status-' + rcrtStaEng(slotProps.data.rcrtSta)">{{
                slotProps.data.rcrtSta
              }}</span>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-map-marker"></i>
                <span class="product-category">{{ slotProps.data.region }}</span>
              </div>
              <span :class="'product-badge status-' + rcrtStaEng(slotProps.data.rcrtSta)">{{
                slotProps.data.rcrtSta
              }}</span>
            </div>
            <div class="product-grid-item-content">
              <img :src="`data:image/jpeg;base64,${slotProps.data.tImg}`" :alt="slotProps.data.title" />
              <div class="product-name">{{ slotProps.data.title }}</div>
              <br />
              <div class="product-description">
                성인 {{ $getFormattedCurrency(slotProps.data.adultPrice) }} / 아동
                {{ $getFormattedCurrency(slotProps.data.adultPrice) }}
              </div>
              <Button
                icon="pi pi-search"
                label="상세보기"
                :disabled="rcrtStaEng(slotProps.data.rcrtSta) === 'completed'"
                @click="$router.push(`/section/packages/${slotProps.data.brdNum}`)"
              ></Button>
            </div>
            <div class="product-grid-item-bottom"></div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";

export default {
  data() {
    return {
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "여행 지역명 오름차순", value: "region" },
        { label: "여행 지역명 내림차순", value: "!region" }
      ]
    };
  },

  props: {
    packages: Object
  },

  methods: {
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },

    rcrtStaEng(rcrtSta) {
      if (rcrtSta === "모집중") {
        return "proceeding";
      } else if (rcrtSta === "마감임박") {
        return "ending";
      } else if (rcrtSta === "모집완료") {
        return "completed";
      }
    }
  },

  components: {
    Dropdown,
    DataViewLayoutOptions
  }
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.p-dropdown {
  width: 14.2rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.2rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
  font-size: 13pt;
}

.pi-map-marker {
  vertical-align: middle;
  margin-right: 0.5rem;
}
.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
  font-size: 14pt;
}
.product-badge {
  text-align: center;
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12pt;
  letter-spacing: 0.3px;
}

.product-badge.status-proceeding {
  background: #c8e6c9;
  color: #256029;
}

.product-badge.status-completed {
  background: #ffcdd2;
  color: #c63737;
}

.product-badge.status-ending {
  background: #feedaf;
  color: #8a5340;
}
::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 200px;
    height: 120px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    width: 290px;
    height: 174px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
