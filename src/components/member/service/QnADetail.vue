<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{title}}</h1>
      </div>
      <div class="board-main">
        <table class="article-header">
          <tr>
            <th style="text-align: start; padding-left: 20px;">{{article.title}}</th>
            <th width="200px">{{article.writerId}}</th>
            <th width="200px">{{article.wdate}}</th>
          </tr>
        </table>
        <div class="article-main">
          <div v-html="article.contents"></div>
        </div>
        <div class="article-footer"></div>
      </div>
      <div class="board-footer">
          <!-- TODO 버튼 구현 -->
        <Dialog header="비밀번호 입력" v-model:visible="displayUpdate">
          <Password id="pwd" v-model="pwd" :feedback="false"/>
          <Button @click="onUpdate">수정</Button>
        </Dialog>
        <Button @click="viewUpdate">수정</Button>
        <Dialog header="비밀번호 입력" v-model:visible="displayDelete">
          <Password id="pwd" v-model="pwd" :feedback="false"/>
          <Button class="p-button-danger" @click="onDelete">삭제</Button>
        </Dialog>
        <Button class="p-button-danger" @click="viewDelete">삭제</Button>
        <Button @click="onList">목록으로</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import Dialog from 'primevue/dialog';
  import Password from 'primevue/password';
  import axios from 'axios';

  export default
  {
    name: 'QnADetail',
    components: {
      Dialog, Password
    },
    props: {
      title: String, // 타이틀
      detailLink: String, // 상세보기 링크
      updateLink: String, // 수정 링크
      deleteLink: String, // 삭제 링크
      listLink: String, // 목록 링크
    },
    data() {
      return {
        article: {
          title: "",
          writerId: "",
          wdate: "",
          contents: ""
        },
        displayUpdate: false,
        displayDelete: false,
        pwd: ""
      };
    },
    methods: {
      onUpdate() {
        this.displayUpdate = !this.displayUpdate;
      },
      viewUpdate() {
        this.displayUpdate = !this.displayUpdate;
      },
      onDelete() {
        const writeParam = new URLSearchParams();
        writeParam.append('brdNum', this.$route.query.num);
        writeParam.append('pwd', this.pwd);

        axios.post(this.deleteLink, writeParam, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }).then(function(resp) {
          console.log(resp);
          if (resp.data.result == true)
          {
            alert("문의글이 제거되었습니다.");
            this.$router.push(this.listLink);
          }
          else
          {
            alert(resp.data.reason);
          }

        }.bind(this));
      },
      viewDelete() {
        this.displayDelete = !this.displayDelete;
      },
      onList() {
        this.$router.push(this.listLink);
      },
      getArticle() {
        this.article = axios.get(this.detailLink, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: {
            num: this.$route.query.num
          }
        }).then(function(resp) {
          console.log(resp);
          this.article = resp.data;
        }.bind(this));
      }
    },
    created() {
      this.getArticle();
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
    color: #333;
    font-weight: bold;
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
  .article-header {
    width: 100%;
    margin: 0;
    text-align: center;
    border-top: 1px solid gray;
    border-collapse: collapse;
  }
  .article-header tr {
    height: 55px;
  }
  .article-header th {
    border-bottom: 1px solid gray;
    font-size: 22px; /* 30px */
    color: #222;
  }
  .article-main {
    display: flex;
    width: 100%;
    margin: 20px 0;
    padding: 0 20px;
  }
  .article-footer {
    width: 100%;
    margin: 0 0 20px 0;
    border-top: 1px solid gray;
  }
  .board-footer {
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
    align-items: center;
    padding: 20px;
    margin: 0px 20px;
  }
  .board-footer * {
    margin: 0px 4px;
  }
</style>
