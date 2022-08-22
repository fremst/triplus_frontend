<template>
   <div class="wrap">
    <div class="inner">
      <h1 class="add-form-title">관리자 장소 등록</h1>
      <div class="form-group">
        <div class="field col-12 md:col-12">
          <div>
            <h3>제목</h3>
            <span class="p-label">
              <CascadeSelect
                v-model="selectedOptions"
                :class="{ 'p-invalid': submitted && !this.selectedOptions }"
                :optionGroupChildren="['subCategory']"
                :options="options"
                optionGroupLabel="name"
                optionLabel="subname"
                placeholder="카테고리"
                style="min-width: 11rem; margin-right: 10px"
              />
              <small v-if="submitted && !this.region" class="p-error">카테고리를 선택해 주세요.</small>
              <label for="multiselect" />
            </span>
            <InputText
              v-model="title"
              :class="{ 'p-invalid': submitted && !this.title }"
              class="form-control field md:col-4"
              placeholder="제목을 입력해주세요."
              style="width: 350px"
            />
            <small v-if="submitted && !this.title" class="p-error">제목을 입력해 주세요.</small>
          </div>
          <div>
            <h3>지역번호</h3>
            <InputText
              v-model="region"
              :class="{ 'p-invalid': submitted && !this.region }"
              class="form-control field md:col-4"
            />
            <small v-if="submitted && !this.region" class="p-error">지역번호를 입력해 주세요.</small>

            <h3>전화번호</h3>
            <InputText
              v-model="tel"
              :class="{ 'p-invalid': submitted && !this.tel }"
              class="form-control field col-4"
            />
            <small v-if="submitted && !this.tel" class="p-error">전화번호를 입력해 주세요.</small>
          </div>
          <h3>주소</h3>
          <InputText
            v-model="addr"
            :class="{ 'p-invalid': submitted && !this.addr }"
            class="form-control field col-4"
            placeholder="주소를 입력해주세요."
          />
          <small v-if="submitted && !this.tel" class="p-error">주소를 입력해 주세요.</small>

          <h3>경도</h3>
          <InputText v-model="mapx" class="form-control field col-4" placeholder="경도를 입력해주세요." />
          <h3>위도</h3>
          <InputText v-model="mapy" class="form-control field col-4" placeholder="위도를 입력해주세요." />
          <h3>홈페이지</h3>
          <InputText v-model="homepage" class="form-control field col-4" placeholder="홈페이지를 입력해주세요." />
          <h3>상세 이미지</h3>
          <InputText
            v-model="firstimage"
            class="form-control field col-4"
            placeholder="상세이미지URL을 입력해주세요."
          />
          <h3>상세설명</h3>
          <Textarea v-model="overview" class="form-control field col-4" cols="50" rows="5" />
        </div>
      </div>
      <div class="button-group">
        <Button class="p-button-primary mr-2" label="Save" @click="onSave(brdNum)" />
        <Button class="p-button-secondary mr-2" label="cancel" @click="onCancel" />
        <Button class="p-button-secondary mr-2" label="뒤로가기" @click="goBack" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from '@/router';

export default {
  name: "ModifyPlaceForm",
  data() {
    return {
      selectedOptions: {}, //선택된 카테고리
      options: [
        //카테고리 분류
        {
          name: "명소",
          code: "명소",
          subCategory: [
            {
              subname: "자연관광지",
              value: "명소"
            },
            {
              subname: "역사관광지",
              value: "명소"
            },
            {
              subname: "휴양관광지",
              value: "명소"
            },
            {
              subname: "체험관광지",
              value: "명소"
            },
            {
              subname: "산업관광지",
              value: "명소"
            },
            {
              subname: "문화시설",
              value: "명소"
            },
            {
              subname: "기타",
              value: "명소"
            }
          ]
        },
        {
          name: "맛집",
          code: "맛집",
          subCategory: [
            {
              subname: "한식",
              value: "맛집"
            },
            {
              subname: "양식",
              value: "맛집"
            },
            {
              subname: "일식",
              value: "맛집"
            },
            {
              subname: "중식",
              value: "맛집"
            },
            {
              subname: "아시아식",
              value: "맛집"
            },
            {
              subname: "패밀리레스토랑",
              value: "맛집"
            },
            {
              subname: "기타",
              value: "맛집"
            }
          ]
        },
        {
          name: "숙소",
          code: "숙소",
          subCategory: [
            {
              subname: "호텔",
              value: "숙소"
            },
            {
              subname: "펜션/민박",
              value: "숙소"
            },
            {
              subname: "모텔",
              value: "숙소"
            },
            {
              subname: "게스트하우스",
              value: "숙소"
            },
            {
              subname: "기타",
              value: "숙소"
            }
          ]
        }
      ],
      title: "",
      region: "",
      tel: "",
      addr: "",
      mapx: "",
      mapy: "",
      homepage: "",
      firstimage: "",
      overview: "",
      submitted: false
    };
  },
  methods: {
    onSave(brdNum) {
      this.submitted = true;
      const modifyPlaceParam = new URLSearchParams();
      modifyPlaceParam.append("userId", "admin");
      modifyPlaceParam.append("mcatName", this.selectedOptions.value);
      modifyPlaceParam.append("scatName", this.selectedOptions.subname);
      modifyPlaceParam.append("title", this.title);
      modifyPlaceParam.append("region", this.region);
      modifyPlaceParam.append("tel", this.tel);
      modifyPlaceParam.append("addr", this.addr);
      modifyPlaceParam.append("mapx", this.mapx);
      modifyPlaceParam.append("mapy", this.mapy);
      modifyPlaceParam.append("homepage", this.homepage);
      modifyPlaceParam.append("firstimage", this.firstimage);
      modifyPlaceParam.append("overview", this.overview);

      axios
        .put("http://localhost:8082/triplus/api/section/places/"+brdNum, modifyPlaceParam, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(
          function (resp) {
            if (resp.data.result === "success") {
              alert("장소수정 성공");
            } else {
              alert("장소수정 실패");
            }
          }.bind(this)
        );
    },
    onCancel() {
      this.title = "";
      this.region = "";
      this.tel = "";
      this.addr = "";
      this.mapx = "";
      this.mapy = "";
      this.homepage = "";
      this.firstimage = "";
      this.overview = "";

      return this.submitted;
    },
    goBack(){
      router.go(-1);
    },
    checkCategory() {
      return this.category != "";
    }
  }
}
</script>

<style scoped>
.wrap{
    width: 100%;
}
.inner {
    width: 1080px;
    margin: 0 auto;
}
</style>