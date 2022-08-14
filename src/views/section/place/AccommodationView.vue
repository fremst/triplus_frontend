<template>
  <div class="wrap">
    <div class="place-inner">
      <h1 class="section-title">숙소조회</h1>
      <div class="card">
        <DataView v-model:filters="filters1" :accomFilterFields="['title','addr1','tel','cat3']"
                  :layout="layout"
                  :paginator="true" :rows="9"
                  :sortField="sortField" :sortOrder="sortOrder" :value="products">
          <template #header>
            <div class="flex justify-content-between">
                <span class="p-input-icon-left">
                    <i class="pi pi-search"/>
                      <InputText v-model="filters1['search'].value" placeholder="검색어를 입력해 주세요."/>
                  </span>
              <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="숙소명 정렬"
                        @change="onSortChange($event)"/>
            </div>
          </template>
          <template #empty>
            <p>검색결과가 없습니다.</p>
          </template>

          <template #list="slotProps">
            <div class="col-12">
              <div class="product-list-item">
                <img :alt="slotProps.data.title" :src='slotProps.data.firstimage'/>
                <div class="product-list-detail">
                  <div class="product-name">{{ slotProps.data.title }}</div>
                  <div class="product-description">{{ slotProps.data.addr1 }}{{ slotProps.data.addr2 }}</div>
                  <div class="product-description">{{ slotProps.data.tel }}</div>
                  <i class="pi pi-tag product-category-icon"></i><span
                    class="product-category">{{ parseCategory(slotProps.data.cat3) }}</span>
                </div>
                <div class="product-list-action">
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Dropdown from "primevue/dropdown";
import {FilterMatchMode, FilterOperator} from 'primevue/api';
import placeCategory from '@/views/section/place/placeCategory.json';

export default {
  data() {
    return {
      products: null,
      layout: 'list',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      filters1: null,
      sortOptions: [
        //숙소명으로 정렬하기
        {label: '이름 올림차순', value: 'title'},
        {label: '이름 내림차순', value: '!title'},
      ],
    }
  },
  created() {
    this.initFilters1();
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      axios.get('https://apis.data.go.kr/B551011/KorService/searchStay?serviceKey=q78jx2pDdopDli5F6rUCzaNdpTo1BPB5p%2FhBDuJQVUkaf89mwtC5fauNUQs2BFE50udejJt%2FGaKOkZ3Y9F28OA%3D%3D&numOfRows=30&pageNo=1&MobileOS=ETC&MobileApp=Triplus&_type=json&listYN=Y&arrange=Q&hanOk=0&benikia=0&goodStay=0', this.data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }).then(res => {
        this.products = res.data.response.body.items.item;
      }).catch(err => {
        console.log(err.response);
      });
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
    //관광API 카테고리 변경
    parseCategory(inputCat3) {
      let result = placeCategory.categoryData.filter(function (object) {
        return object['cat3'] === inputCat3;
      })[0];
      if (result) {
        return result.category
      } else {
        //설정해 두지 않은 카테고리가 나올 시, 기타로 처리.
        return '기타';
      }
    },
    initFilters1() {
      this.filters1 = {
        'search': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'title': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'addr1': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'tel': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'cat3': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
      }
    }
  },
  components: {
    Dropdown
  }
}
</script>


<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.p-inputtext {
  width: 400px;
  text-align: left;
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

.product-list-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 200px;
    height: 200px;
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

.wrap {
  width: 100%;
}

.place-inner {
  width: 1080px;
  margin: 0 auto;
}

.section-title {
  margin-top: 20px;
  margin-left: 20px;
  font-weight: bold;
  font-size: 30px;
}
</style>