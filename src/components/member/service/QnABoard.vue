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
        <h1>{{title}}</h1>
      </div>
      <div class="board-main">
        <div class="board-search">
          <!-- TODO 검색 기능(axios...) -->
        </div>
        <DataTable class="board-table" :value="list" responsiveLayout="scroll" :rows="10">
            <Column field="brdNum" header="글번호" style="width: 100px;"></Column>
            <Column field="title" header="제목" alignHeader="center">
              <template #body="slotProps">
                <a :href="getDetailLink(slotProps.data.brdNum)" v-text="slotProps.data.title" />
              </template>
            </Column>
            <Column field="writerId" header="작성자" style="width: 100px;"></Column>
            <Column field="wdate" header="작성일" style="width: 100px;"></Column>
            <Column field="hit" header="조회수" style="width: 100px;"></Column>
        </DataTable>
        <Paginator :rows="10" :pageLinkSize="9" :totalRecords="pageCount"></Paginator>
      </div>
      <div class="board-footer">
        <Button color="#67AB9F">전체 글 보기(?)</Button>
        <Button color="#67AB9F">공지 등록(??)</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Paginator from 'primevue/paginator';

  export default
  {
    name: 'QnABoard',
    components: {
      DataTable, Column, Paginator
    },
    props: {
      title: String, // 타이틀
      listLink: String, // 목록 링크
      detailLink: String, // 자세히 보기 링크
    },
    data() {
      return {
        searchOpt: ["제목", "내용", "제목/내용"],
        list: [],
        pageIndex: 1, // 현재 페이지 인덱스
        pageCount: 160 // 페이지 개수
      }
    },
    created() {
        this.list = this.getList();
    },
    mounted() {
    },
    methods: {
      onSearch() {
        alert("미구현");
      },
      onPageChange(n) {
        this.curPage = n;
        console.log(`${this.detailLink}?page=${this.curPage}`);
      },
      getList() {
        this.list = axios.get(this.listLink, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: { }
        }).then(function(resp) {
          console.log(resp);
          this.list = resp.data;
          for (let el of this.list)
          {
            el.wdate = this.getDate(el.wdate);
          }
        }.bind(this));
      },
      getDetailLink(brdNum) {
        return `${this.detailLink}?num=${brdNum}`;
      },
      getDate(ms) {
        let date = new Date(ms);
        return `${date.getUTCMonth() + 1}월 ${date.getUTCDate() + 1}일`;
      }
    }
  }
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
    justify-content: top;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
  .board-search {
    display: flex;
    width: 100%;
    justify-content: end;
    align-items: right;
  }
  .board-search * {
    margin: 0px 0px 0px 0px;
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
    color: #67AB9F;
  }
  .board-page * {
    margin: 0px 4px;
  }
  .board-footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    align-items: center;
    padding: 20px;
  }
  .board-footer * {
    margin: 0px 4px;
  }
</style>
