<template>
  <div class="wrap">
    <div class="magazine-main">
    <AdminPageSidebar />
    <div class="inner">
      <div class="title">
        <h2 style="color: #009688; margin-top:20px">매거진 목록</h2>
      </div>
      <hr />
      <div>
        <div class="card">
          <br />
          <div class="table-header" id="searchGroup">
            <span class="p-input-icon-left" style="margin-bottom: 10px">
              <i class="pi pi-search" id="icon" />
              <InputText
                v-model="filters['global'].value"
                placeholder="검색어를 입력하세요"
                id="keyword"
                style="margin-right: 10px; width: 300px"
              />
              <Button @click="onWrite">매거진 등록</Button>
            </span>
          </div>
          <DataTable
            class="board-table"
            :paginator="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            :value="list"
            responsiveLayout="scroll"
            :rows="10"
            :filters="filters"
          >
            <Column field="tImg" header="썸네일" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                <img :src="`data:image/jpeg;base64,${slotProps.data.timg}`" :alt="slotProps.data.tImg" class="tImg" />
              </template>
            </Column>
            <Column field="category" header="카테고리" style="min-width: 6rem; text-align: center"></Column>
            <Column field="title" header="제목" style="min-width: 19rem; text-align: center">
              <template #body="slotProps">
                <a href="#" @click.prevent="onDetail(slotProps.data.brdNum)" v-text="slotProps.data.title"></a>
              </template>
            </Column>
            <Column field="wdate" header="작성일" style="min-width: 9rem; text-align: center"></Column>
            <Column field="hit" header="조회" style="min-width: 6rem; text-align: center"></Column>
            <Column header="수정" style="min-width: 9rem; text-align: center">
              <template #body="slotProps">
                  <Button @click="this.$router.push({ name: 'magazine-update', params: { brdNum: slotProps.data.brdNum } })">수정</Button>
              </template>
            </Column>
          </DataTable>
        </div>
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
      list: [],
      filters: {}
    };
  },
  created() {
    this.initFilters();
  },
  mounted() {
    this.getList();
  },
  methods: {
    onWrite() {
      this.$router.push({ name: "magazine-write" });
    },
    onDetail(brdNum) {
      this.$router.push({ name: "magazine-detail", params: { brdNum: brdNum } });
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
  min-height: 750px;
}
.inner {
  width: 1080px;
  margin: 0 auto;
  margin-top: 20px;
}
.title {
  margin-bottom: 10px;
}
hr {
  border: 0;
  height: 1px;
  /*margin-bottom: 15px;*/
  background: #aaa;
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

::v-deep(.p-datatable .p-column-header-content) {
  justify-content: center;
}
img {
  width: 180px;
  height: 200px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 2rem;
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
</style>
