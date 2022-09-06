<template>
  <div class="card">
    <DataView :value="list" :layout="layout" :paginator="true" :rows="5" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
        <div class="grid grid-no gutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="정렬 옵션 선택"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <Button v-if="this.tempAuth === 'admin'" color="#67AB9F" @click="onWrite" style="margin-top: 10px"
            >매거진등록</Button>
          </div>
        </div>
      </template>
      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img :src="`data:image/jpeg;base64,${slotProps.data.timg}`" :alt="slotProps.data.tImg" class="tImg" />
            <div class="product-list-detail">
              <div style="margin-bottom:10px">
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">{{ slotProps.data.category }}</span></div>
              <div class="product-name">{{ slotProps.data.title }}</div>
            </div>
            <div class="product-list-action">
              <Button class="p-button" @click="onDetail(slotProps.data.brdNum)">상세내용</Button>
              <i class="pi pi-eye" style="font-size: 1.2rem; margin-bottom: 5px; "><span style="margin-left:5px">{{ slotProps.data.hit }}</span></i>
              <p>{{ slotProps.data.wdate }}</p>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import axios from "axios";
import DataView from "primevue/dataview";

export default {
  name: "MagazineList.vue",
  components: {
    DataView
  },
  data() {
    return {
      list: [],
      pageIndex: 1,
      layout: "list",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "조회 순", value: "!hit" },
        { label: "최신 순", value: "!brdNum" }
      ],
      like: 0,
      tempAuth: this.$store.state.loginUser.auth
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onWrite() {
      this.$router.push({ name: "magazine-write" });
    },
    onPageChange(n) {
      this.curPage = n;
    },
    getList() {
      axios
        .get("http://localhost:8082/triplus/api/section/magazines", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            this.list = resp.data;
          }.bind(this)
        );
    },
    onDetail(brdNum) {
      this.$router.push({ name: "magazine-detail", params: { brdNum: brdNum } });
    },
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
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 1080px;
  margin: auto;
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
    width: 180px;
    height: 200px;
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
