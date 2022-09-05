<template>
  <div class="wrap">
    <AdminPageSidebar />
    <div class="inner">
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
                style="margin-right: 10px"
              />
              <Button @click="onWrite">매거진 추가</Button>
            </span>
          </div>
          <DataTable
            class="board-table"
            :paginator="true"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :value="list"
            responsiveLayout="scroll"
            :rows="10"
            :filters="filters"
          >
            <Column field="tImg" header="" style="width: 200px">
              <template #body="slotProps">
                <img :src="`data:image/jpeg;base64,${slotProps.data.timg}`" :alt="slotProps.data.tImg" class="tImg" />
              </template>
            </Column>
            <Column field="category" header="카테고리" style="width: 100px"></Column>
            <Column field="title" header="제목">
              <template #body="slotProps">
                <a href="#" @click.prevent="onDetail(slotProps.data.brdNum)" v-text="slotProps.data.title"></a>
              </template>
            </Column>
            <Column field="wdate" header="작성일" style="width: 150px"></Column>
            <Column field="hit" header="조회수" style="width: 100px"></Column>
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
img {
  width: 200px;
  height: 120px;
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
