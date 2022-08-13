<!--
-->

<template>
  <div class="main">
    <div class="board">
      <div class="board-header">
        <h1>{{title}}</h1>
      </div>
      <div class="board-main">
        <div class="">
          <label for="aTitle"><h2>제목</h2></label>
          <InputText id="aTitle" type="username" v-model="aTitle" area-describedby="aTitle-help" class="p-invalid"/>
          <small id="aTitle-help" class="p-error">쓰슈.</small>
        </div>
        <div class="">
          <label for="email"><h2>임시 이메일</h2></label>
          <InputText id="email" type="email" v-model="tempEmail" area-describedby="email-help" class="p-invalid"/>
          <small id="email-help" class="p-error">쓰슈.</small>
        </div>
        <div class="">
          <label for="pwd"><h2>임시 비밀번호</h2></label>
          <Password id="pwd" v-model="tempPwd" area-describedby="pwd-help" class="p-invalid"/>
          <small id="pwd-help" class="p-error">쓰슈.</small>
        </div>
        <div class="">
          <label for="category"><h2>문의 유형</h2></label>
          <Dropdown id="category" v-model="category" area-describedby="category-help" class="p-invalid"
            :options="categories" optionLabel="name" placeholder="카테고리 선택" />
          <small id="category-help" class="p-error">고르슈.</small>
        </div>
        <h2>내용</h2>
        <Editor v-model="content" editorStyle="height: 320px">
        </Editor>
      </div>
      <div class="board-footer">
          <Button @click="onCancel">취소</Button>
          <Button @click="onSubmit">작성</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import Dropdown from 'primevue/dropdown';
  import Editor from 'primevue/editor';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';

  export default
  {
    name: 'QnAWrite',
    components: {
      Dropdown, Editor, InputText, Password
    },
    props: {
      title: String, // 글쓰기 타이틀(제목 아님)
      submitLink: String, // 쓰기 링크
      cancelLink: String // 취소 링크
    },
    data() {
      return {
        category: "", // 카테고리
        categories: [
          {name: '일정 기능', code: 'SCHEDULER'},
          {name: '패키지', code: 'PACKAGE'},
          {name: '고객 지원', code: 'CUSTOMER SERVICE'},
          {name: '나도 잘 모름', code: 'I DONT KNOW'},
          {name: '기타', code: 'ETC'},
        ],
        aTitle: "",
        content: "",
        tempEmail: "",
        tempPwd: "",
      }
    },
    methods: {
      onChangeContent(content) {
        this.content = content;
      },
      onSubmit() {
        console.log(this.content);
        console.log(this.submitLink);
      },
      onCancel() {
        console.log(this.cancelLink);
      }
    }
  }
</script>
<style scoped>
  * {
    padding: 20px;
    font-family: 'Helvetica';
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
    justify-content: top;
    width: 100%;
    align-items: flex-start;
    padding: 20px;
  }
  .board-main * {
    width: 100%;
    text-align: left;
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
