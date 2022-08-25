<!--
-->

<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{title}}</h1>
      </div>
      <div class="board-main">
        <Accordion style="width: 100%" v-if="isReply">
          <AccordionTab header="원본글 보기">
            <div><h2>{{replyArticle.title}}</h2></div>
            <Divider style="border: 1px solid #ccc;" />
            <div v-html="replyArticle.contents"></div>
          </AccordionTab>
        </Accordion>
        <div class="board-input">
          <label for="aTitle"><h2>제목</h2></label>
          <InputText id="aTitle" type="username" v-model="aTitle" area-describedby="aTitle-help" :class="[{ 'p-invalid': !checkTitle() }]"/>
          <small v-if="!checkTitle()" id="aTitle-help" class="p-error">4~30자 사이의 제목을 입력하세요.</small>
        </div>
        <div class="board-input" v-show="!isLogin">
          <label for="email"><h2>임시 이메일</h2></label>
          <InputText
              id="email" type="email"
              v-model="tempEmail" area-describedby="email-help"
              :class="[{ 'p-invalid': !checkEmail() }]"/>
          <small v-if="!checkEmail()" id="email-help" class="p-error">임시로 사용할 이메일 주소를 입력하세요.</small>
        </div>
        <div class="board-input" v-show="!isLogin">
          <label for="pwd"><h2>임시 비밀번호</h2></label>
          <Password id="pwd" v-model="tempPwd" area-describedby="pwd-help" :class="[{ 'p-invalid': !checkPwd() }]"/>
          <small id="pwd-help" v-if="!checkPwd()" class="p-error">4~20자 사이의 비밀번호를 입력하세요.</small>
        </div>
        <div class="board-input" v-show="!isReply">
          <label for="category"><h2>문의 유형</h2></label>
          <Dropdown id="category" v-model="category"
                    ref="category"
                    area-describedby="category-help" :class="[{ 'p-invalid': !checkCategory() }]"
                    :options="categories" optionLabel="name" placeholder="카테고리 선택" />
          <small id="category-help" v-if="!checkCategory()" class="p-error">카테고리를 선택하세요.</small>
        </div>
        <h2>내용</h2>
        <Editor ref="editor" v-model="content" editorStyle="height: 320px">
        </Editor>
        <div class="board-input" v-show="!isReply">
          <h2>비밀글 설정</h2>
          <Checkbox v-model="isSecret" :binary="true" />
        </div>
      </div>
      <div class="board-footer">
        <Button @click="onCancel">취소</Button>
        <Button v-if="!isUpdate" @click="onSubmit" :disabled="submitting">작성</Button>
        <Button v-else @click="onUpdate" :disabled="submitting">수정</Button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default
{
  name: 'QnAWrite',
  components: {
    Dropdown, Editor, InputText, Password, Checkbox, Accordion, AccordionTab
  },
  props: {
    title: String, // 글쓰기 타이틀(제목 아님)
    link: String,
    cancelLink: String, // 취소 링크
    detailURL: String
  },
  data() {
    return {
      category: "", // 카테고리
      categories: [
        {name: '일정 기능', code: 'SCHEDULER'},
        {name: '패키지', code: 'PACKAGE'},
        {name: '매거진', code: 'MAGAZINE'},
        {name: '명소, 맛집, 숙소', code: 'SPOT'},
        {name: '커뮤니티', code: 'COMMUNITY'},
        {name: '고객 지원', code: 'SERVICE'},
        {name: '기타', code: 'ETC'},
      ],
      aTitle: "",
      content: "",
      tempEmail: "",
      tempPwd: "",
      submitting: false,
      isSecret: false,

      isLogin: false,
      isUpdate: false,
      isReply: false,
      updateBrdNum: 0,
      replyBrdNum: 0,
      replyArticle: {
        title: "",
        contents: ""
      }
    }
  },
  methods: {
    onChangeContent(content) {
      this.content = content;
    },
    onSubmit() {
      if (this.submitting)
        return;

      if (!this.checkTitle())
      {
        alert("제목 길이가 길거나 너무 짧습니다.");
        return;
      }
      if (!this.checkEmail())
      {
        alert("이메일 주소가 적합하지 않습니다.");
        return;
      }
      if (!this.checkPwd())
      {
        alert("비밀번호가 길거나 너무 짧습니다.");
        return;
      }
      if (!this.checkCategory())
      {
        alert("문의 유형이 선택되지 않았습니다.");
        return;
      }
      if (!this.checkContent())
      {
        alert("내용이 없습니다.");
        return;
      }

      this.submitting = true;

      console.log("code = " + this.category.code);

      const tempId = localStorage.getItem("id") == null ? "guest" : localStorage.getItem("id");
      const writeParam = new URLSearchParams();
      writeParam.append('brdNum', this.updateBrdNum);
      writeParam.append('writerId', tempId);
      writeParam.append('answerNum', this.replyBrdNum);
      writeParam.append('title', this.aTitle);
      writeParam.append('category', this.category.code === undefined ? this.category.code : "REPLY");
      writeParam.append('tempEmail', this.tempEmail);
      writeParam.append('tempPwd', this.tempPwd);
      writeParam.append('contents', this.content);
      writeParam.append('published', !this.isSecret);

      writeParam.append('id', tempId);
      writeParam.append('token', localStorage.getItem("token"));

      axios.post(this.link, writeParam, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function(resp) {
        console.log(resp);
        if (resp.data.result === true)
        {
          alert("문의글 작성 성공");
          this.$router.push(this.getDetailLink(resp.data.brdNum));
        }
        else
        {
          alert(resp.data.reason);
          this.$router.push(this.cancelLink);
        }

      }.bind(this));
    },
    onUpdate() {
      if (this.submitting)
        return;

      this.submitting = true;

      const tempId = localStorage.getItem("id") == null ? "guest" : localStorage.getItem("id");

      axios.put(`${this.link}/${this.updateBrdNum}/${localStorage.getItem("token")}`, JSON.stringify({
        id: tempId,
        token: localStorage.getItem("token"),
        brdNum: this.updateBrdNum,
        writerId: tempId,
        answerNum: this.isReply ? parseInt(localStorage.getItem("qnaReplyNum")) : 0,
        title: this.aTitle,
        category: this.category.code,
        tempEmail: this.tempEmail,
        tempPwd: this.tempPwd,
        contents: this.content,
        published: !this.isSecret
      }), {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }).then(function(resp) {
        console.log(resp);
        if (resp.data.result === true)
        {
          alert("문의글 수정 성공");
          this.$router.push(this.getDetailLink(resp.data.brdNum));
        }
        else
        {
          alert(resp.data.reason);
          this.$router.push(this.cancelLink);
        }
      }.bind(this));
    },
    onCancel() {
      this.$router.push(this.cancelLink);
    },
    checkTitle() {
      return this.aTitle.length >= 4 && this.aTitle.length <= 30;
    },
    checkEmail() {
      if (localStorage.getItem("id") != null)
        return true;

      let emailFormat = new RegExp(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i);
      return emailFormat.test(this.tempEmail);
    },
    checkPwd() {
      if (localStorage.getItem("id") != null)
        return true;

      return this.tempPwd.length >= 4 && this.tempPwd.length < 20;
    },
    checkCategory() {
      if (this.isReply)
        return true;
      return this.category != "";
    },
    checkContent() {
      return this.content.length > 0;
    },
    getDetailLink(brdNum) {
      return `${this.detailURL}?num=${brdNum}`;
    },
    getArticleForUpdate(tempNum, tempPwd) {
      axios.get(`${this.link}/${tempNum}/password`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        params: {
          num: tempNum,
          pwd: tempPwd
        }
      }).then(function(resp) {
        console.log(resp);
        this.updateArticle(resp.data.article);
      }.bind(this));
    },
    updateArticle(article)
    {
      this.updateBrdNum = article.brdNum;
      this.category = article.category;
      this.tempEmail = article.tempEmail;
      this.tempPwd = article.tempPwd;
      this.isSecret = !article.published;

      this.aTitle = article.title;
      this.content = article.contents;
      console.log(article);
    }
  },
  created() {
    this.isLogin = localStorage.getItem("id") != null;
    if (localStorage.getItem("qnaNum") != null)
    {
      let tempNum = localStorage.getItem("qnaNum");
      axios.get(`${this.link}/${tempNum}/password`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        params: {
          num: tempNum,
          pwd: localStorage.getItem("qnaPwd")
        }
      }).then(function(resp) {
        this.isUpdate = true;
        localStorage.removeItem("qnaNum");
        localStorage.removeItem("qnaPwd");
        this.updateArticle(resp.data.article);
      }.bind(this));
    }
    else if (localStorage.getItem("qnaReplyNum") != null)
    {
      axios.get(`${this.link}/${localStorage.getItem("qnaReplyNum")}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        params: {
        }
      }).then(function(resp) {
        this.replyBrdNum = localStorage.getItem("qnaReplyNum");
        localStorage.removeItem("qnaNum");
        localStorage.removeItem("qnaPwd");
        localStorage.removeItem("qnaReplyNum");
        this.replyArticle = resp.data;
        console.log(this.replyArticle);
        this.isReply = true;
      }.bind(this));
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
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
  align-items: flex-start;
  padding: 20px;
}
.board-main * {
  width: 100%;
  text-align: left;
  margin: 2px 0;
}
.board-input {
  min-height: 90px;
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
  margin: 0 4px;
}
</style>