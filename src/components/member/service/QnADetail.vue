<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{title}}</h1>
      </div>
      <div class="board-main" v-show="article.published">
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
      <div class="board-main" v-show="article.published">
        <Accordion style="width: 100%">
          <AccordionTab v-for="reply of replyList" :key="reply" :header="reply.title">
            <div style="text-align: end;">{{reply.writerId}}님이 {{reply.wdate}}에 작성한 글입니다.</div>
            <Divider style="border: 1px solid #ccc;" />
            <div v-html="reply.contents"></div>
            <Divider style="border: 1px solid #ccc;" />
            <div>
              답변이 도움이 되었다면 평가해주세요!
              <rating v-model="rate" :cancel="false"></rating>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
      <div class="board-main" v-if="!article.published">
        <div v-if="article.writerId == 'guest'" class="article-main" style="height: 300px; flex-direction: column; justify-content: center; align-items: center;">
          <h3>해당 글은 잠겨있습니다.</h3>
          <br>
          <Password id="pwd" v-model="pwd" :feedback="false"/>
          <br>
          <Button @click="inputPassword">보기</Button>
        </div>
        <div v-else class="article-main" style="height: 300px; flex-direction: column; justify-content: center; align-items: center;">
          <h3>해당 글은 잠겨있습니다.</h3>
        </div>
      </div>
      <div class="board-footer" v-show="article.published" style="flex-direction: column; justify-content: flex-end; align-items: flex-end;">
        <!-- 답글 -->
        <div v-if="isLogin">
          <Button @click="onReply">질문에 답변하기</Button>
        </div>
        <br>
        <div>
          <!-- 수정 -->
          <Dialog header="비밀번호 입력" v-model:visible="displayUpdate">
            <Password id="pwd" v-model="pwd" :feedback="false"/>
            <Button @click="onUpdate">수정</Button>
          </Dialog>
          <Button @click="viewUpdate">수정</Button>
  
          <!-- 삭제 -->
          <Dialog header="비밀번호 입력" v-model:visible="displayDelete">
            <Password id="pwd" v-model="pwd" :feedback="false"/>
            <Button class="p-button-danger" @click="onDelete">삭제</Button>
          </Dialog>
          <Button class="p-button-danger" @click="viewDelete">삭제</Button>
  
          <!-- 목록 -->
          <Button @click="onList">목록으로</Button>
        </div>
      </div>
      <div class="board-footer" v-if="!article.published">
        <Button @click="onList">목록으로</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import Dialog from 'primevue/dialog';
  import Password from 'primevue/password';
  import axios from 'axios';
  import Accordion from 'primevue/accordion';
  import AccordionTab from 'primevue/accordiontab';
  import Divider from 'primevue/divider';
  import Rating from 'primevue/rating';

  export default
  {
    name: 'QnADetail',
    components: {
      Dialog, Password, Accordion, AccordionTab, Divider, Rating
    },
    props: {
      title: String, // 타이틀
      link: String, // 서버 링크
      URL: String, // 링크
    },
    data() {
      return {
        article: {
          title: "",
          writerId: "",
          wdate: "",
          contents: "",
          published: true
        },
        replyList: [],
        displayUpdate: false,
        displayDelete: false,
        pwd: "",
        rate: 0,
        isLogin: false
      };
    },
    methods: {
      onUpdate() {
        let tempBrdNum = this.$route.params.brdNum;
        this.article = axios.get(`${this.link}/${tempBrdNum}/password`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: {
            num: tempBrdNum,
            pwd: this.pwd
          }
        }).then(function(resp) {
          console.log(resp);
          if (resp.data.result == false)
          {
            alert("비밀번호가 틀렸습니다.");
          }
          else
          {
            localStorage.setItem("qnaNum", tempBrdNum);
            localStorage.setItem("qnaPwd", this.pwd);
            this.$router.push(`${this.URL}/write`);
          }
        }.bind(this));
      },
      onReply() {
        if (localStorage.getItem("id") == null)
          return alert("로그인이 필요한 서비스입니다.");

        localStorage.setItem("qnaReplyNum", this.$route.params.brdNum);
        this.$router.push(`${this.URL}/write`);
      },
      viewUpdate() {
        this.displayUpdate = !this.displayUpdate;
      },
      onDelete() {
        const writeParam = new URLSearchParams();
        writeParam.append('pwd', this.pwd);

        axios.delete(`${this.link}/${this.$route.params.brdNum}/${this.pwd}`, "", {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }).then(function(resp) {
          console.log(resp);
          if (resp.data.result == true)
          {
            alert("문의글이 제거되었습니다.");
            this.$router.push(this.URL);
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
        this.$router.push(this.URL);
      },
      getArticle() {
        this.article = axios.get(`${this.link}/${this.$route.params.brdNum}`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: {
            num: this.$route.params.brdNum,
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
          }
        }).then(function(resp) {
          console.log(resp);
          this.article = resp.data;
        }.bind(this));
      },
      getReplyList() {
        axios.get(`${this.link}/${this.$route.params.brdNum}/reply`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: {
            num: this.$route.params.brdNum,
          }
        }).then(function(resp) {
          console.log(resp);
          this.replyList = resp.data;
        }.bind(this));
      },
      inputPassword() {
        axios.get(`${this.link}/${this.$route.params.brdNum}/password`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          params: {
            num: this.$route.params.brdNum,
            pwd: this.pwd
          }
        }).then(function(resp) {
          console.log(resp);
          if (resp.data.result == false)
          {
            alert("비밀번호가 틀렸습니다.");
          }
          else
          {
            this.article = resp.data.article;
            this.article.published = true;
            this.pwd = "";
          }
        }.bind(this));
      }
    },
    created() {
      this.getArticle();
      this.getReplyList();
      this.isLogin = localStorage.getItem("id");
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
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    padding: 20px;
    margin: 0px 20px;
  }
  .board-footer * {
    margin: 0px 4px;
  }
</style>
