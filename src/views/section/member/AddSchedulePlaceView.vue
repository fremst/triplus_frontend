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
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
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
      <Button class="p-button-text" icon="pi pi-times" label="취소" @click="closeDialog(false)" />
      <Button class="p-button-text" icon="pi pi-check" label="추가" @click="addSchedulePlace" />
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
    }
  },
  emits: ["update:visible", "closeDialog"],
  data() {
    return {
      container: null,
      test: true,
      place: null,
      addr: null,
      mapx: null,
      mapy: null,
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
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        `${process.env.VUE_APP_KAKAO_API_KEY || ""}` +
        "&libraries=clusterer,drawing,services";
      /* eslint를 사용한다면 kakao 변수가 선언되지 않았다고
       * 오류를 내기 때문에 아래 줄과 같이 전역변수임을
       * 알려주어야 한다. */
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(() => {
          // 카카오맵 API가 로딩이 완료된 후 지도의 기본적인 세팅을 시작해야 한다.
          this.initMap();
        });
      });
      document.head.appendChild(script);
    }
  },
  methods: {
    getList() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/`;
      axios
        .get(getUrl, this.data, defaultOptions)
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
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      const positions = markerPositions.map(position => new kakao.maps.LatLng(...position));

      if (positions.length > 0) {
        this.markers = positions.map(
          position =>
            new kakao.maps.Marker({
              map: this.map,
              position
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(37.566815190669736, 126.97864094233952), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
      });

      this.map.setCenter(iwPosition);
    },
    goAddMyPlace() {
      this.$router.push({ name: "add-my-place" });
    },
    closeDialog(returnValue) {
      this.showDialog = false;
      this.$emit("closeDialog", returnValue);
    },
    addSchedulePlace() {
      this.addr;
      console.log(this.addr);
      this.closeDialog(true);
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
