<template>
  <div class="main">
    <div class="notice-main">
      <div class="board">
        <div class="board-header">
          <h1>{{ title }}</h1>
        </div>
        <div class="board-main">
          <table class="article-header">
            <tr>
              <th width="150px">[ {{ article.category }} ]</th>
              <th style="text-align: start; padding-left: 20px">{{ article.title }}</th>
              <th width="200px">{{ article.wdate }}</th>
            </tr>
          </table>
          <div class="article-main">
            <div v-html="article.contents"></div>
          </div>
          <div class="article-footer"></div>
        </div>
        <div class="board-footer">
          <Button
            v-if="this.tempAuth == 'admin'"
            @click="$router.push(`/service/notices/${this.$route.params.brdNum}/update`)"
            >수정</Button
          >
          <Button v-if="this.tempAuth == 'admin'" class="p-button-danger" @click="onDelete">삭제</Button>
          <Button @click="onList">목록으로</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NoticeDetail.vue",
  props: {
    title: String,
    detailLink: String,
    updateLink: String,
    deleteLink: String,
    listLink: String
  },
  data() {
    return {
      article: {
        brdNum: 0,
        title: "",
        writerId: "",
        wdate: "",
        contents: ""
      },
      tempAuth: this.$store.state.loginUser.auth
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    onList() {
      this.$router.go(-1);
    },
    onDelete() {
      axios
        .delete(`http://localhost:8082/triplus/api/service/notices/${this.$route.params.brdNum}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            if (resp.data == "success") {
              this.$router.push({ name: "notices" });
            }
          }.bind(this)
        );
    },
    getArticle() {
      this.article = axios
        .get(`http://localhost:8082/triplus/api/service/notices/${this.$route.params.brdNum}`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            console.log(resp);
            this.article = resp.data;
          }.bind(this)
        );
    }
  }
};
</script>

<style scoped>
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
