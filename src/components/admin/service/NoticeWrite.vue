<template>
  <div class="main">
    <div class="notice-main">
      <div class="board">
        <div class="board-header">
          <h1>공지 등록</h1>
        </div>
        <div class="board-main">
          <div class="board-input">
            <label for="aTitle"><h4>제목</h4></label>
            <InputText id="aTitle" type="username" v-model="aTitle" placeholder="제목을 입력하세요" />
          </div>

          <div class="board-input">
            <label for="category"><h4>공지 유형</h4></label>
            <Dropdown
              id="category"
              v-model="category"
              :options="categories"
              optionLabel="name"
              placeholder="카테고리 선택"
            />
          </div>
          <h4>내용</h4>
          <Editor v-model="contents" editorStyle="height: 600px"> </Editor>
        </div>
        <div class="board-footer">
          <Button @click="onCancel">취소</Button>
          <Button v-if="this.tempAuth == 'admin'" @click="onSubmit">등록</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import InputText from "primevue/inputtext";

export default {
  name: "NoticeWrite.vue",
  components: {
    Dropdown,
    Editor,
    InputText
  },
  data() {
    return {
      category: "",
      categories: [
        { name: "패키지", code: "패키지" },
        { name: "이벤트", code: "이벤트" },
        { name: "기타", code: "기타" }
      ],
      aTitle: "",
      contents: "",
      tempAuth: this.$store.state.loginUser.auth
    };
  },
  methods: {
    onSubmit() {
      const writeParam = new URLSearchParams();
      writeParam.append("writerId", "admin");
      writeParam.append("noticeNum", 0);
      writeParam.append("title", this.aTitle);
      writeParam.append("category", this.category.code);
      writeParam.append("contents", this.contents);

      axios
        .post("http://localhost:8082/triplus/api/service/notices/write", writeParam, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            if (resp.data.result == true) {
              this.$router.push({ name: "notices" });
            } else {
              this.$router.push({ name: "notices" });
            }
          }.bind(this)
        );
    },
    onCancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Helvetica";
}
h4 {
  margin-bottom: 5px;
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
  align-items: flex-start;
  padding: 20px;
}
.board-main * {
  width: 100%;
  text-align: left;
}
.board-input {
  min-height: 90px;
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
