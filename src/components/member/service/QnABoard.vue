<!--
  220812 김주현
  문의글 게시판
  
  [ 문제점 ]
    검색 기능 미구현
-->

<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{ title }}</h1>
      </div>
      <div class="board-main">
        <div class="board-search">
          <!-- TODO 검색 기능(axios...) -->
        </div>
        <DataTable
          class="board-table"
          :paginator="true"
          paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :value="list"
          responsiveLayout="scroll"
          :rows="10"
        >
          <Column field="brdNum" header="글번호" style="width: 100px"></Column>
          <Column field="title" header="제목" alignHeader="center">
            <template #body="slotProps">
              <div v-if="slotProps.data.published == true">
                <a href="#" @click="onDetail(slotProps.data.brdNum)" v-text="slotProps.data.title" />
              </div>
              <div v-else>
                <i class="pi pi-lock"></i>
                &nbsp;
                <a href="#" @click="onDetail(slotProps.data.brdNum)" v-text="slotProps.data.title" />
              </div>
            </template>
          </Column>
          <Column field="writerId" header="작성자" style="width: 100px"></Column>
          <Column field="wdate" header="작성일" style="width: 100px"></Column>
          <Column field="hit" header="조회수" style="width: 100px"></Column>
        </DataTable>
      </div>
      <div class="board-footer">
        <Button color="#67AB9F" @click="onWrite">문의글 작성하기</Button>
      </div>
    </div>
  </div>
</template>
<script>
import "primeicons/primeicons.css";
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "QnABoard",
  components: {
    DataTable,
    Column
  },
  props: {
    title: String, // 타이틀
    listLink: String, // 서버 목록 링크
    URL: String // 링크
  },
  data() {
    return {
      searchOpt: ["제목", "내용", "제목/내용"],
      list: [],
      pageIndex: 1 // 현재 페이지 인덱스
    };
  },
  created() {
    this.list = this.getList();
  },
  mounted() {},
  methods: {
    onSearch() {
      alert("미구현");
    },
    onWrite() {
      this.$router.push(`${this.URL}/write`);
    },
    onDetail(brdNum) {
      this.$router.push({ name: "qna-detail", params: { brdNum: brdNum } });
    },
    onPageChange(n) {
      this.curPage = n;
    },
    getList() {
      this.list = axios
        .get(this.listLink, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          params: {}
        })
        .then(
          function (resp) {
            console.log(resp);
            this.list = resp.data;
            for (let el of this.list) {
              el.wdate = this.getDate(el.wdate);
            }
          }.bind(this)
        );
    },
    getDate(ms) {
      let date = new Date(ms);
      return `${date.getUTCMonth() + 1}월 ${date.getUTCDate() + 1}일`;
    }
  }
};
</script>
<style scoped>
* {
  padding: 20px;
  margin: 0px;
  padding: 0px;
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
.board-search {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.board-search * {
  margin: 0;
}
.board-search input[type="submit"] {
  width: 100px;
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
  margin: 0px 4px;
}
</style>
