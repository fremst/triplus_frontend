<template>
  <div>
    <h1>패키지 상품 등록</h1>
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
            min="0"
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
            min="0"
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
            min="1"
            :class="{ 'p-invalid': submitted && !this.rcrtCnt }"
            placeholder="모집 인원을 입력해주세요."
            style="width: 350px"
          />
          <small v-if="submitted && !this.rcrtCnt" class="p-error">집합 장소를 입력해 주세요.</small>
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
            <input type="file" id="tImgFile" accept="image/*" @change="changeTImg">
            <label for="tImgFile" class="p-button p-component p-button-label">파일 찾기</label>
          </div>
            <table v-if="tImgFile">
              <tr>
                <td>
                  <img class="file-preview" :src="tImgPreview">
                </td>
                <td>
                  {{ tImgFile.name }}
                </td>
                <td>
                  {{ tImgFile.size/1000 }} KB
                </td>
                <td>
                  <Button icon="pi pi-times"></Button>
                </td>
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
            <input type="file" id="pkgImgFile" accept="image/*" @change="changePkgImgs" multiple>
            <label for="pkgImgFile" class="p-button p-component p-button-label">파일 찾기</label>
          </div>
            <table v-if="pkgImgFiles">
              <tr v-for="(img, i) in pkgImgFiles" :key="i">
                <td>
                  <img class="file-preview" :src="pkgImgPreview[i]">
                </td>
                <td>
                  {{ img.name }}
                </td>
                <td>
                  {{ img.size/1000 }} KB
                </td>
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
        <td>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <Editor v-model="contents" editorStyle="height: 320px"></Editor>
        </td>
      </tr>
    </table>      
    <Button
      @click="submitForm"
      :disabled="!sDate"
      class="p-button p-component p-button-label"
      icon="pi pi-upload">
      등록
    </Button>
  </div>
</template>

<script>
import axios from "axios";
import Editor from 'primevue/editor';

export default {

  components:{
    Editor
  },

  data(){

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
      submitted: false,
    }

  },

  methods: {

    changeTImg(e){

      let uploadFiles = e.target.files;

          this.tImgFile = uploadFiles[0];

          let reader = new FileReader();

          reader.onload = (e) => {

            this.tImgPreview = e.target.result;

          }

          reader.readAsDataURL(e.target.files[0]);

    },

    changePkgImgs(e){

      let uploadFiles = e.target.files;

      for (let i = 0; i < uploadFiles.length; i++){

        // if(!this.pkgImgFiles.includes(uploadFiles[i])){ // 파일 중복 검사 로직 수정 필요


          let reader = new FileReader();

          reader.onload = (e) => {

            let img = e.target.result;

            if(!this.pkgImgPreview.includes(img)){
              
              this.pkgImgFiles.push(uploadFiles[i]);
              this.pkgImgPreview.push(img);
            }

          }

          reader.readAsDataURL(e.target.files[i]);

        // }

      }

    },

    deleteImg(i){
      this.pkgImgFiles.splice(i, 1);
      this.pkgImgPreview.splice(i, 1);
    },

    submitForm(){

      const formData = new FormData();

        formData.append('title', this.title);
        formData.append('adultPrice', this.adultPrice);
        formData.append('childPrice', this.childPrice);
        formData.append('sDate', this.sDate);
        formData.append('eDate', this.eDate);
        formData.append('mtgPlace', this.mtgPlace);
        formData.append('region', this.eDate);
        formData.append('rcrtCnt', this.rcrtCnt);
        formData.append('trans', this.trans);
        formData.append('tImgFile', this.tImgFile);
        formData.append('contents', this.contents);

      for(let i = 0; i < this.pkgImgFiles.length; i++){

        formData.append('pkgImgFiles', this.pkgImgFiles[i], this.pkgImgFiles[i].name);
      
      }

      axios.post("http://localhost:8082/triplus/api/section/packages/", formData, {

        headers:{

          'Access-Control-Allow-Origin' : '*',
          // 'Content-Type' : 'multipart/form-data',
          'enctype' : 'multipart/form-data',
          // 'ContentType' : false,
          // 'processData' : false

        }

      }).then(function (resp) {

        if (resp.data.result === "success") {

          alert("파일 업로드 성공");
          this.$router.push({ name: "admin-packages",})

        } else {

          alert("파일 업로드 실패");

        }

      }.bind(this));

    },

  }

}
</script>

<style scoped>

.file-box input[type="file"] {
  display: none;
}

.file-preview{
  width: 200px;
}

/* .md\:col-4 {
  padding: 0;
} */

</style>