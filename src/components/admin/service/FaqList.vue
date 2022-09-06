<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{ title }}</h1>
      </div>
      <div class="board-main">
        <DataTable
          class="board-table"
          :paginator="true"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :value="list"
          responsiveLayout="scroll"
          :rows="10"
          :filters="filters"
        >
          <Column field="faqNum" header="글번호" style="width: 100px"></Column>
          <Column field="category" header="카테고리" style="width: 100px"></Column>
          <Column field="faqTitle" header="제목" alignHeader="center"></Column>
          <Column field="modify" header="수정" alignHeader="center">
            <template #body="slotProps">
              <a href="#" @click="onModify(slotProps.data.faqNum)">수정하기</a>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="board-footer">
        <Button class="p-button-primary mr-2" label="글 등록" @click="onWrite"/>
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
  name: "FaqList",
  components: {
    DataTable,
    Column
  },
  props: {
    title: String,
    listLink: String,
    writeLink: String
  },
  data() {
    return {
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
      this.$router.push({ name: "faqs-add" });
    },
    onPageChange(n) {
      this.curPage = n;
    },
    onModify(faqNum) {
      this.$router.push({ name: "faqs-modify", params: { faqNum: faqNum } });
    },
    getList() {
      axios
        .get("http://localhost:8082/triplus/api/service/faqs", {
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
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      };
    }
  }
};
</script>

<style scoped>
* {
  margin: 0px;
}
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
.board {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1080px;
  border: 1px solid lightgray;
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
  margin: 0px 0px 20px 0px;
  text-align: center;
  border-top: 1px solid gray;
  border-collapse: collapse;
}
.board-page .currentPage {
  color: #67ab9f;
}
.board-page * {
  margin: 0px 4px;
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
</style>
