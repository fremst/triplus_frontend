<template>
  <div class="main">
    <div class="magazine-main">
      <div class="title">
        <h2 style="color: #009688" v-if="!this.$route.params.brdNum">매거진 등록</h2>
        <h2 style="color: #009688" v-else>매거진 수정</h2>
      </div>
      <hr />
      <div class="board">
        <div class="board-main">
          <div class="board-input">
            <label for="aTitle"><h4>제목</h4></label>
            <InputText id="aTitle" type="username" v-model="title" placeholder="제목을 입력하세요" />
          </div>

          <div class="board-input">
            <label for="category"><h4>매거진 유형</h4></label>
            <Dropdown
              id="category"
              v-model="category"
              :options="categories"
              optionLabel="name"
              placeholder="카테고리 선택"
            />
          </div>
          <h4>내용</h4>
          <Editor v-model="contents" editorStyle="height: 320px"> </Editor>
          <div class="file-box">
            <input type="file" id="tImgFile" accept="image/*" @change="changeTImg" />
            <label for="tImgFile" class="p-button p-component p-button-label" style="width: 130px; margin-top: 5px"
              >썸네일 선택</label
            >
          </div>
          <table v-if="tImgFile">
            <tr>
              <td style="width: 70%">
                <img class="file-preview" :src="tImgPreview" style="margin-top: 10px; width: 300px" />
              </td>
              <th style="width: 10%; height: 100px">
                {{ tImgFile.name }}
              </th>
              <th style="width: 10%; height: 100px">{{ tImgFile.size / 1000 }} KB</th>
            </tr>
          </table>
        </div>
        <div class="board-footer">
          <Button @click="onCancel">취소</Button>
          <Button v-if="!$route.params.brdNum" @click="write">등록</Button>
          <Button v-else @click="update">수정</Button>
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
import { defaultOptions } from "@/constant/axios.js";
import { multipartOptions } from "@/constant/axios.js";

export default {
  name: "MagazineWrite.vue",
  components: {
    Dropdown,
    Editor,
    InputText
  },
  data() {
    return {
      category: "",
      categories: [
        { name: "맛집투어", code: "맛집투어" },
        { name: "엑티비티", code: "엑티비티" },
        { name: "사진명소", code: "사진명소" },
        { name: "힐링", code: "힐링" }
      ],
      title: "",
      contents: "",
      tImgFile: null,
      tImgPreview: null
    };
  },
  created() {
    if (this.$route.params.brdNum) {
      this.getData();
    }
  },
  methods: {
    onCancel() {
      this.$router.go(-1);
    },
    changeTImg(e) {
      let uploadFile = e.target.files[0];

      this.setTImgFileAndPreview(uploadFile);
    },
    bindForm() {
      const formData = new FormData();

      formData.append("writerId", "admin");
      formData.append("title", this.title);
      formData.append("category", this.category.code);
      formData.append("contents", this.contents);
      formData.append("tImgFile", this.tImgFile);

      return formData;
    },
    async write() {
      const formData = this.bindForm();

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/admin/magazines/`;

      const resp = await axios.post(postUrl, formData, multipartOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      if (resp.data.result === "success") {
        this.$router.push({ name: "magazines" });
      } else {
        alert("매거진 등록 실패");
      }
    },

    async update() {
      const formData = this.bindForm();

      const putUrl = `${process.env.VUE_APP_API_URL || ""}/admin/magazines/${this.$route.params.brdNum}`;

      const resp = await axios.post(putUrl, formData, multipartOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      if (resp.data.result === "success") {
        this.$router.push({ name: "magazines" });
      } else {
        alert("매거진 수정 실패");
      }
    },

    async getData() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/magazines/${this.$route.params.brdNum}`;

      const resp = await axios.get(getUrl, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      this.title = resp.data.title;
      this.contents = resp.data.contents;
      this.category = resp.data.category;

      const tImgFile = this.base64ImgtoFile(resp.data.tImgFile, "썸네일 이미지");
      this.setTImgFileAndPreview(tImgFile);
    },

    // base64ImgtoFile(base64Img, fileName) {
    //
    //     let bstr = atob(base64Img),
    //         n = bstr.length,
    //         u8arr = new Uint8Array(n);
    //
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //
    //     return new File([u8arr], fileName, {type: "image/jpeg"});
    //
    // },

    setTImgFileAndPreview(file) {
      let reader = new FileReader();

      reader.onload = e => {
        let img = e.target.result;

        this.tImgFile = file;
        this.tImgPreview = img;
      };

      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
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
.magazine-main {
  // margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1080px;
}
.board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1080px;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  margin-bottom: 10px;
}
hr {
  border: 0;
  height: 1px;
  margin-bottom: 15px;
  background: #aaa;
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
.file-box input[type="file"] {
  display: none;
}
</style>
