<template>
  <div class="main">
    <div class="notice-main">
      <div class="board">
        <div class="board-header">
          <h1>{{ title }}</h1>
        </div>
        <div class="board-main">
          <div class="table-header" id="searchGroup">
            <span class="p-input-icon-left">
              <i class="pi pi-search" id="icon" />
              <InputText v-model="filters['global'].value" placeholder="검색어를 입력하세요" id="keyword" />
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
            <Column field="brdNum" header="글번호" style="min-width: 3rem; text-align: center"></Column>
            <Column field="category" header="카테고리" style="min-width: 3rem; text-align: center"></Column>
            <Column field="title" header="제목" style="min-width: 19rem; text-align: center">
              <template #body="slotProps">
                <a href="#" @click.prevent="onDetail(slotProps.data.brdNum)" v-text="slotProps.data.title"></a>
              </template>
            </Column>
            <Column field="wdate" header="작성일" style="min-width: 9rem; text-align: center"></Column>
            <Column field="hit" header="조회" style="min-width: 9rem; text-align: center"></Column>
          </DataTable>
        </div>
        <div class="board-footer">
          <Button v-if="this.tempAuth == 'admin'" color="#67AB9F" @click="onWrite">공지등록</Button>
          <Button color="#67AB9F" @click="onList">전체 글 보기</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "NoticeList",
  components: {
    DataTable,
    Column
  },
  props: {
    title: String,
    listLink: String,
    detailLink: String,
    writeLink: String
  },
  data() {
    return {
      searchOpt: ["제목", "내용", "제목/내용"],
      list: [],
      pageIndex: 1,
      filters: {},
      tempAuth: this.$store.state.loginUser.auth
    };
  },
  created() {
    this.getList();
    this.initFilters();
  },
  mounted() {},
  methods: {
    onWrite() {
      this.$router.push({ name: "notice-write" });
    },
    onPageChange(n) {
      this.curPage = n;
    },
    getList() {
      axios
        .get("http://localhost:8082/triplus/api/service/notices", {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          params: {}
        })
        .then(
          function (resp) {
            this.list = resp.data;
          }.bind(this)
        );
    },
    onDetail(brdNum) {
      console.log(brdNum);
      this.$router.push({ name: "notice-detail", params: { brdNum: brdNum } });
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      };
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.notice-main {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1080px;
  border: 0px solid lightgray;
}
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1080px;
  border: 0px solid lightgray;
}
.board-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100px;
  align-items: flex-start;
  padding: 20px;
}
.board-header h1 {
  font-size: 50px;
  font-weight: bold;
  color: #222;
}
.board-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 20px;
}
.board-table {
  width: 100%;
  margin: 0 0 20px 0;
  text-align: center;
  border-top: 1px solid gray;
  border-collapse: collapse;
}
.board-page .currentPage {
  color: #67ab9f;
}
.board-page * {
  margin: 0 4px;
}
.board-footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
  padding: 20px;
}
.board-footer * {
  margin: 0 4px;
}
#searchGroup {
  margin-bottom: 10px;
}
#keyword {
  height: 50px;
  width: 300px;
  margin-left: 735px;
}
#icon {
  margin-left: 735px;
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
</style>
