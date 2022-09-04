<template>
  <div>
    <h1 v-if="!this.$route.params.brdNum">패키지 상품 등록</h1>
    <h1 v-else>패키지 상품 수정</h1>
    <table>
      <tr>
        <td>
          <h3>상품명</h3>
        </td>
        <td>
          <InputText
            type="text"
            v-model="title"
            :class="{ 'p-invalid': submitted && !this.title }"
            placeholder="상품명을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.title" class="p-error">상품명을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>성인 요금</h3>
        </td>
        <td>
          <InputNumber
            v-model="adultPrice"
            :min="0"
            :class="{ 'p-invalid': submitted && !this.adultPrice }"
            placeholder="성인 요금을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.adultPrice" class="p-error">성인 요금을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>아동 요금</h3>
        </td>
        <td>
          <InputNumber
            v-model="childPrice"
            :min="0"
            currency="KRW"
            locale="ko-KR"
            :class="{ 'p-invalid': submitted && !this.childPrice }"
            placeholder="아동 요금을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.childPrice" class="p-error">아동 요금을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>여행 시작일</h3>
        </td>
        <td>
          <InputText
            type="date"
            v-model="sDate"
            :class="{ 'p-invalid': submitted && !this.sDate }"
            style="width: 350px"
          />
          <small v-if="submitted && !this.sDate" class="p-error">여행 시작일을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>여행 종료일</h3>
        </td>
        <td>
          <InputText
            type="date"
            v-model="eDate"
            :class="{ 'p-invalid': submitted && !this.eDate }"
            style="width: 350px"
          />
          <small v-if="submitted && !this.eDate" class="p-error">여행 시작일을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>집합 장소</h3>
        </td>
        <td>
          <InputText
            type="text"
            v-model="mtgPlace"
            :class="{ 'p-invalid': submitted && !this.mtgPlace }"
            placeholder="집합 장소를 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.mtgPlace" class="p-error">집합 장소를 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>여행 지역</h3>
        </td>
        <td>
          <InputText
            type="text"
            v-model="region"
            :class="{ 'p-invalid': submitted && !this.region }"
            placeholder="여행 지역을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.region" class="p-error">여행 지역을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>모집 인원</h3>
        </td>
        <td>
          <InputNumber
            v-model="rcrtCnt"
            :min="1"
            :class="{ 'p-invalid': submitted && !this.rcrtCnt }"
            placeholder="모집 인원을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.rcrtCnt" class="p-error">모집 인원을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>교통 수단</h3>
        </td>
        <td>
          <InputText
            type="text"
            v-model="trans"
            :class="{ 'p-invalid': submitted && !this.trans }"
            placeholder="교통 수단을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.trans" class="p-error">교통 수단을 입력해 주세요.</small>
        </td>
      </tr>
      <tr>
        <td>
          <h3>썸네일 이미지</h3>
        </td>
        <td>
          <div class="file-box">
            <input type="file" id="tImgFile" accept="image/*" @change="changeTImg" />
            <label for="tImgFile" class="p-button p-component p-button-label">파일 찾기</label>
            <small v-if="submitted && !this.tImgFile" class="p-error">썸네일 이미지를 등록해 주세요.</small>
          </div>
          <table v-if="tImgFile">
            <tr>
              <td>
                <img class="file-preview" :src="tImgPreview" />
              </td>
              <td>
                {{ tImgFile.name }}
              </td>
              <td>{{ tImgFile.size / 1000 }} KB</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <h3>상세 이미지</h3>
        </td>
        <td>
          <div class="file-box">
            <input type="file" id="pkgImgFile" accept="image/*" @change="changePkgImgs" multiple />
            <label for="pkgImgFile" class="p-button p-component p-button-label">파일 찾기</label>
            <small v-if="submitted && !this.pkgImgFiles[0]" class="p-error">상세 이미지를 등록해 주세요.</small>
          </div>
          <table v-if="pkgImgFiles">
            <tr v-for="(img, i) in pkgImgFiles" :key="i">
              <td>
                <img class="file-preview" :src="pkgImgPreview[i]" />
              </td>
              <td>
                {{ img.name }}
              </td>
              <td>{{ img.size / 1000 }} KB</td>
              <td>
                <Button icon="pi pi-times" @click="deleteImg(i)"></Button>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <h3>상품 상세 설명</h3>
        </td>
        <td><small v-if="submitted && !this.contents" class="p-error">상품 상세 설명을 입력해 주세요.</small></td>
      </tr>
      <tr>
        <td colspan="2">
          <Editor v-model="contents" editorStyle="height: 320px"></Editor>
        </td>
      </tr>
    </table>
    <Button
      v-if="!$route.params.brdNum"
      @click="write()"
      class="p-button p-component p-button-label"
      icon="pi pi-upload"
    >
      등록
    </Button>
    <Button v-else @click="update()" class="p-button p-component p-button-label" icon="pi pi-upload"> 수정 </Button>
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
        alert("서버 연결 실패", err);
      });

      const brdNum = res.data.brdNum;

      if (res.data.result === "success") {
        alert("패키지 상품 등록 성공");
        this.$router.push({ name: "package-detail", params: { brdNum: brdNum } });
      } else {
        alert("패키지 상품 등록 실패");
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
        alert("서버 연결 실패", err);
      });

      const brdNum = res.data.brdNum;

      if (res.data.result === "success") {
        alert("패키지 상품 수정 성공");
        this.$router.push({ name: "package-detail", params: { brdNum: brdNum } });
      } else {
        alert("패키지 상품 수정 실패");
      }
    },

    async getData() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/${this.$route.params.brdNum}`;

      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
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

<style scoped>
.file-box input[type="file"] {
  display: none;
}

.file-preview {
  width: 200px;
}
</style>
