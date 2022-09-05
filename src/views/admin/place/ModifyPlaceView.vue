<template>
  <div class="wrap">
    <div class="inner">
      <h1 class="add-form-title">관리자 장소 수정</h1>
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
                optionLabel="scatName"
                placeholder="카테고리"
                style="min-width: 11rem; margin-right: 10px"
              />
              <small v-if="submitted && !this.scatName" class="p-error">카테고리를 선택해 주세요.</small>
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
        <Button class="p-button-primary mr-2" label="Save" @click="onSave" />
        <Button class="p-button-secondary mr-2" label="Cancel" @click="onCancel" />
        <Button class="p-button-secondary mr-2" label="목록으로" @click="goDetail()" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { defaultOptions } from "@/constant/axios";
import { putOptions } from "@/constant/axios";

export default {
  data() {
    return {
      selectedOptions: null, //선택된 카테고리
      options: [
        //카테고리 분류
        {
          name: "명소",
          code: "명소",
          subCategory: [
            {
              scatName: "자연관광지",
              value: "명소"
            },
            {
              scatName: "역사관광지",
              value: "명소"
            },
            {
              scatName: "휴양관광지",
              value: "명소"
            },
            {
              scatName: "체험관광지",
              value: "명소"
            },
            {
              scatName: "산업관광지",
              value: "명소"
            },
            {
              scatName: "문화시설",
              value: "명소"
            },
            {
              scatName: "기타",
              value: "명소"
            }
          ]
        },
        {
          name: "맛집",
          code: "맛집",
          subCategory: [
            {
              scatName: "한식",
              value: "맛집"
            },
            {
              scatName: "양식",
              value: "맛집"
            },
            {
              scatName: "일식",
              value: "맛집"
            },
            {
              scatName: "중식",
              value: "맛집"
            },
            {
              scatName: "아시아식",
              value: "맛집"
            },
            {
              scatName: "패밀리레스토랑",
              value: "맛집"
            },
            {
              scatName: "기타",
              value: "맛집"
            }
          ]
        },
        {
          name: "숙소",
          code: "숙소",
          subCategory: [
            {
              scatName: "호텔",
              value: "숙소"
            },
            {
              scatName: "펜션/민박",
              value: "숙소"
            },
            {
              scatName: "모텔",
              value: "숙소"
            },
            {
              scatName: "게스트하우스",
              value: "숙소"
            },
            {
              scatName: "기타",
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
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/accommodation/${this.$route.params.brdNum}`;
      const res = await axios.get(getUrl, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });
      this.data = res.data;
      this.scatName = this.data.scatName;
      this.title = this.data.title;
      this.region = this.data.region;
      this.tel = this.data.tel;
      this.addr = this.data.addr;
      this.mapx = this.data.mapx;
      this.mapy = this.data.mapy;
      this.homepage = this.data.homepage;
      this.firstimage = this.data.firstimage;
      this.overview = this.data.overview;
    },
    async onSave() {
      this.submitted = true;

      const updateParam = {
        userId: "admin",
        mcatName: this.selectedOptions.value,
        scatName: this.selectedOptions.scatName,
        title: this.title,
        region: this.region,
        tel: this.tel,
        addr: this.addr,
        mapx: this.mapx,
        mapy: this.mapy,
        homepage: this.homepage,
        firstimage: this.firstimage,
        overview: this.overview
      };

      const putUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/${this.mcatNameToEng(updateParam.mcatName)}/${
        this.$route.params.brdNum
      }`;

      const resp = await axios.put(putUrl, updateParam, putOptions).catch(err => {
        this.serverError();
        console.log(err);
      });
      if (resp.data.result === "success") {
        this.$router.push(`/admin/place/${this.mcatNameToEng(updateParam.mcatName)}`);
      } else {
        this.showError();
      }
    },
    showError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "장소수정 실패", life: 3000 });
    },
    serverError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "서버에러", life: 3000 });
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
    checkCategory() {
      return this.category != "";
    },
    goDetail() {
      let mcatName = this.selectedOptions.value;
      if (mcatName === "명소") {
        return router.push(`/section/place/attraction/${this.$route.params.brdNum}`);
      } else if (mcatName === "맛집") {
        return router.push(`/section/place/restaurant/${this.$route.params.brdNum}`);
      } else {
        return router.push(`/section/place/accommodation/${this.$route.params.brdNum}`);
      }
    },
    mcatNameToEng(mcatName) {
      if (mcatName == "명소") {
        return "attraction";
      } else if (mcatName == "맛집") {
        return "restaurant";
      } else {
        return "accommodation";
      }
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
}

.inner {
  width: 1080px;
  margin: 0 auto;
}

.form-control {
  width: 500px;
}

.button-group {
  margin-bottom: 20px;
}
</style>
