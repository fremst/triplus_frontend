<template>
  <div class="wrap">
    <h1>숙소조회</h1>
    <div class="card">
      <DataView :value="products" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
        <template #header>
          <div class="grid grid-nogutter">
            <div class="col-6" style="text-align: left">
              <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="지역명 정렬" @change="onSortChange($event)"/>
            </div>
            <div class="col-6" style="text-align: right">
              <DataViewLayoutOptions v-model="layout" />
            </div>
          </div>
        </template>
        <template #list="slotProps">
          <div class="col-12">
            <div class="product-list-item">
              <img :src='slotProps.data.firstimage' :alt="slotProps.data.title"/>
              <div class="product-list-detail">
                <div class="product-name">{{slotProps.data.title}}</div>
                <div class="product-description">{{slotProps.data.addr1}}{{slotProps.data.addr2}}</div>
                <div class="product-description">{{slotProps.data.tel}}</div>
                <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.cat1}}</span>
              </div>
              <div class="product-list-action">
              </div>
            </div>
          </div>
        </template>

        <template #grid="slotProps">
          <div class="col-12 md:col-4">
            <div class="product-grid-item card">
              <div class="product-grid-item-top">
                <div>
                  <i class="pi pi-tag product-category-icon"></i>
                  <span class="product-category">{{slotProps.data.cat1}}</span>
                </div>
              </div>
              <div class="product-grid-item-content">
                <img :src='slotProps.data.firstimage' :alt="slotProps.data.title"/>
                <div class="product-name">{{slotProps.data.title}}</div>
                <div class="product-description">,{{slotProps.data.addr1}},{{slotProps.data.addr2}}</div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Dropdown from "primevue/dropdown";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions"

export default {
  data() {
    return {
      products: null,
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        {label: '이름 내림차순', value: '!price'},
        {label: '이름 올림차순', value: 'price'},
      ],
    }
  },
  created() {
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get('https://apis.data.go.kr/B551011/KorService/searchStay?serviceKey=q78jx2pDdopDli5F6rUCzaNdpTo1BPB5p%2FhBDuJQVUkaf89mwtC5fauNUQs2BFE50udejJt%2FGaKOkZ3Y9F28OA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=Triplus&_type=json&listYN=Y&arrange=A', this.data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }).then(res => {
        this.products = res.data.response.body.items.item;
      }).catch(err => {
        console.log(err.response);
      });
    },
    onSortChange(event){
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      }
      else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
  },
      components:{
      Dropdown,
      DataViewLayoutOptions
    }
}
</script>


<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
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
  margin-right: .5rem;
}
.product-category-icon {
  vertical-align: middle;
  margin-right: .5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
  font-size: 14pt;
}
.product-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12pt;
  letter-spacing: .3px;
}

.product-badge.status-instock {
  background: #C8E6C9;
  color: #256029;
}

.product-badge.status-outofstock {
  background: #FFCDD2;
  color: #C63737;
}

.product-badge.status-lowstock {
  background: #FEEDAF;
  color: #8A5340;
}
::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 200px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 .5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: .5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: .5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: .5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    width: 290px;
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