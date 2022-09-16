<template>
  <div>
    <div class="title">
      <h2 style="color: #009688" v-if="!this.$route.params.brdNum">패키지 등록</h2>
      <h2 style="color: #009688" v-else>패키지 상품 수정</h2>
    </div>
    <hr />
    <table class="form">
      <tr>
        <td>상품명</td>
        <td>
          <InputText
            type="text"
            v-model="title"
            :class="{ 'p-invalid': submitted && !this.title }"
            class="mb-2"
            placeholder="상품명을 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.title" class="p-error">상품명을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>성인 요금</td>
        <td>
          <InputNumber
            v-model="adultPrice"
            :min="0"
            :class="{ 'p-invalid': submitted && !this.adultPrice }"
            class="mb-2"
            placeholder="성인 요금을 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.adultPrice" class="p-error">성인 요금을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>아동 요금</td>
        <td>
          <InputNumber
            v-model="childPrice"
            :min="0"
            currency="KRW"
            locale="ko-KR"
            :class="{ 'p-invalid': submitted && !this.childPrice }"
            class="mb-2"
            placeholder="아동 요금을 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.childPrice" class="p-error">아동 요금을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>여행 시작일</td>
        <td>
          <InputText
            type="date"
            v-model="sDate"
            :class="{ 'p-invalid': submitted && !this.sDate }"
            class="mb-2"
            style="width: 600px"
          />
          <small v-if="submitted && !this.sDate" class="p-error">여행 시작일을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>여행 종료일</td>
        <td>
          <InputText
            type="date"
            v-model="eDate"
            :min="sDate"
            :class="{ 'p-invalid': submitted && !this.eDate }"
            class="mb-2"
            style="width: 600px"
          />
          <small v-if="submitted && !this.eDate" class="p-error">여행 시작일을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>집합 장소</td>
        <td>
          <InputText
            type="text"
            v-model="mtgPlace"
            :class="{ 'p-invalid': submitted && !this.mtgPlace }"
            class="mb-2"
            placeholder="집합 장소를 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.mtgPlace" class="p-error">집합 장소를 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>여행 지역</td>
        <td>
          <InputText
            type="text"
            v-model="region"
            :class="{ 'p-invalid': submitted && !this.region }"
            class="mb-2"
            placeholder="여행 지역을 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.region" class="p-error">여행 지역을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>모집 인원</td>
        <td>
          <InputNumber
            v-model="rcrtCnt"
            :min="1"
            :class="{ 'p-invalid': submitted && !this.rcrtCnt }"
            class="mb-2"
            placeholder="모집 인원을 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.rcrtCnt" class="p-error">모집 인원을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>교통 수단</td>
        <td>
          <InputText
            type="text"
            v-model="trans"
            :class="{ 'p-invalid': submitted && !this.trans }"
            class="mb-2"
            placeholder="교통 수단을 입력해주세요."
            style="width: 600px"
          />
          <small v-if="submitted && !this.trans" class="p-error">교통 수단을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>썸네일 이미지</td>
        <td>
          <div class="file-box">
            <input type="file" id="tImgFile" accept="image/*" @change="changeTImg" />
            <label for="tImgFile" class="p-button p-button-outlined p-button-label mb-2">파일 찾기</label>
            <small v-if="submitted && !this.tImgFile" class="p-error">썸네일 이미지를 등록해 주세요.</small>
          </div>
          <table v-if="tImgFile">
            <tr>
              <td>
                <img class="file-preview" :src="tImgPreview" />
              </td>
              <td class="fileName">
                {{ tImgFile.name }}
              </td>
              <td class="fileSize">{{ tImgFile.size / 1000 }} KB</td>
              <td></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>상세 이미지</td>
        <td>
          <div class="file-box">
            <input type="file" id="pkgImgFile" accept="image/*" @change="changePkgImgs" multiple />
            <label for="pkgImgFile" class="p-button p-button-outlined p-component p-button-label mb-2">파일 찾기</label>
            <small v-if="submitted && !this.pkgImgFiles[0]" class="p-error">상세 이미지를 등록해 주세요.</small>
          </div>
          <table v-if="pkgImgFiles">
            <tr v-for="(img, i) in pkgImgFiles" :key="i">
              <td>
                <img class="file-preview" :src="pkgImgPreview[i]" />
              </td>
              <td class="fileName">
                {{ img.name }}
              </td>
              <td class="fileSize">{{ img.size / 1000 }} KB</td>
              <td>
                <Button icon="pi pi-times" @click="deleteImg(i)"></Button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>상품 상세 설명</td>
        <td><small v-if="submitted && !this.contents" class="p-error">상품 상세 설명을 입력해 주세요.</small></td>
      </tr>
      <tr>
        <td colspan="2">
          <Editor v-model="contents" class="mt-2" editorStyle="width:1080px; height: 600px"></Editor>
        </td>
      </tr>
    </table>
    <div class="button-area">
      <div>
        <Button @click="$router.back()" class="p-button-secondary p-component p-button-label mt-3 mb-5 mr-3">
          이전으로
        </Button>
        <Button v-if="!$route.params.brdNum" @click="write()" class="p-button p-component p-button-label mt-3 mb-5">
          등록하기
        </Button>
        <Button v-else @click="update()" class="p-button p-component p-button-label mt-3 mb-5"> 수정하기 </Button>
      </div>
    </div>
    <Toast></Toast>
  </div>
</template>

<script>
import axios from "axios";
import Editor from "primevue/editor";
import { defaultOptions } from "@/constant/axios.js";
import { multipartOptions } from "@/constant/axios.js";

export default {
  components: {
    Editor
  },

  data() {
    return {
      title: null,
      adultPrice: null,
      childPrice: null,
      sDate: null,
      eDate: null,
      mtgPlace: null,
      region: null,
      rcrtCnt: null,
      trans: null,
      tImgFile: null,
      tImgPreview: null,
      pkgImgFiles: [],
      pkgImgPreview: [],
      contents: null,
      submitted: false
    };
  },

  created() {
    if (this.$route.params.brdNum) {
      this.getData();
    }
  },

  methods: {
    changeTImg(e) {
      let uploadFile = e.target.files[0];

      this.setTImgFileAndPreview(uploadFile);
    },

    changePkgImgs(e) {
      let uploadFiles = e.target.files;

      for (let i = 0; i < uploadFiles.length; i++) {
        this.setImgFilesAndPreview(uploadFiles[i]);
      }
    },

    deleteImg(i) {
      this.pkgImgFiles.splice(i, 1);
      this.pkgImgPreview.splice(i, 1);
    },

    bindForm() {
      const formData = new FormData();

      formData.append("title", this.title);
      formData.append("adultPrice", this.adultPrice);
      formData.append("childPrice", this.childPrice);
      formData.append("sDate", this.sDate);
      formData.append("eDate", this.eDate);
      formData.append("mtgPlace", this.mtgPlace);
      formData.append("region", this.region);
      formData.append("rcrtCnt", this.rcrtCnt);
      formData.append("trans", this.trans);
      formData.append("tImgFile", this.tImgFile);
      formData.append("contents", this.contents);

      for (let i = 0; i < this.pkgImgFiles.length; i++) {
        formData.append("pkgImgFiles", this.pkgImgFiles[i], this.pkgImgFiles[i].name);
      }

      return formData;
    },

    validateForm() {
      if (
        !this.title ||
        !this.adultPrice ||
        !this.childPrice ||
        !this.sDate ||
        !this.eDate ||
        !this.mtgPlace ||
        !this.region ||
        !this.rcrtCnt ||
        !this.trans ||
        !this.tImgFile ||
        !this.pkgImgFiles[0] ||
        !this.contents
      ) {
        return false;
      }
      return true;
    },

    async write() {
      this.submitted = true;
      if (!this.validateForm()) {
        return;
      }

      const formData = this.bindForm();

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/`;

      const res = await axios.post(postUrl, formData, multipartOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      const brdNum = res.data.brdNum;

      if (res.data.result === "success") {
        this.$router.push({ name: "package-detail", params: { brdNum: brdNum } });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: "패키지 상품 등록 실패",
          life: 3000
        });
      }
    },

    async update() {
      this.submitted = true;
      if (!this.validateForm()) {
        return;
      }

      const formData = this.bindForm();

      const putUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/${this.$route.params.brdNum}`;

      const res = await axios.post(putUrl, formData, multipartOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      const brdNum = res.data.brdNum;

      if (res.data.result === "success") {
        this.$router.push({ name: "package-detail", params: { brdNum: brdNum } });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: "패키지 상품 수정 실패",
          life: 3000
        });
      }
    },

    async getData() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/${this.$route.params.brdNum}`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      this.title = res.data.dto.title;
      this.contents = res.data.dto.contents;
      this.adultPrice = res.data.dto.adultPrice;
      this.childPrice = res.data.dto.childPrice;
      this.sDate = new Date(res.data.dto.sdate).toISOString().substring(0, 10);
      this.eDate = new Date(res.data.dto.edate).toISOString().substring(0, 10);
      this.mtgPlace = res.data.dto.mtgPlace;
      this.region = res.data.dto.region;
      this.rcrtCnt = res.data.dto.rcrtCnt;
      this.trans = res.data.dto.trans;

      const tImgFile = this.base64ImgtoFile(res.data.dto.timg, "썸네일 이미지");
      this.setTImgFileAndPreview(tImgFile);

      let pkgImgDtos = res.data.map.pkgImgDtos;
      for (let i = 0; i < pkgImgDtos.length; i++) {
        const dImgFile = this.base64ImgtoFile(pkgImgDtos[i].pkgImg, pkgImgDtos[i].pkgImgName);
        this.setImgFilesAndPreview(dImgFile);
      }
    },

    base64ImgtoFile(base64Img, fileName) {
      let bstr = atob(base64Img),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], fileName, { type: "image/jpeg" });
    },

    setTImgFileAndPreview(file) {
      let reader = new FileReader();

      reader.onload = e => {
        let img = e.target.result;

        this.tImgFile = file;
        this.tImgPreview = img;
      };

      reader.readAsDataURL(file);
    },

    setImgFilesAndPreview(file) {
      let reader = new FileReader();

      reader.onload = e => {
        let img = e.target.result;

        if (!this.pkgImgPreview.includes(img)) {
          this.pkgImgFiles.push(file);
          this.pkgImgPreview.push(img);
        }
      };

      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";

.title {
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  margin-bottom: 15px;
  background: #aaa;
}

.form {
  padding-left: 20px;
}

td {
  width: 90px;
}

.fileName {
  padding-left: 20px;
  width: 550px;
}

.fileSize {
  padding-right: 50px;
  width: 200px;
  text-align: right;
}

.file-box input[type="file"] {
  display: none;
}

.file-preview {
  width: 200px;
}

.button-area {
  @include c-center;
}
</style>
