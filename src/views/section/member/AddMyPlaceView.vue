<template>
  <div class="title-area">
    <h1>나만의 장소 추가</h1>
    <hr />
  </div>
  <div class="map_wrap">
    <div id="map" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>
  </div>
  <div class="wrap">
    <div class="inner">
      <table>
        <thead>
          <tr>
            <th>장소명</th>
            <td>
              <InputText
                style="width: 400px"
                v-model="title"
                :class="{ 'p-invalid': submitted && !this.title }"
              ></InputText>
              <small v-if="submitted && !this.title" class="p-error">장소명을 입력해 주세요.</small>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>주소</th>
            <td>
              <InputText style="width: 400px" v-model="detailAddr" readonly></InputText>
            </td>
          </tr>
          <tr>
            <th>메모</th>
            <td>
              <Textarea style="width: 400px" v-model="overview"></Textarea>
              <InputText style="width: 400px" v-model="firstimage" hidden></InputText>
              <InputText style="width: 400px" v-model="mcatName" hidden></InputText>
              <InputText style="width: 400px" v-model="scatName" hidden></InputText>
              <InputText style="width: 400px" v-model="region" hidden></InputText>
              <InputText style="width: 400px" v-model="tel" hidden></InputText>
              <InputText style="width: 400px" v-model="mapx" hidden></InputText>
              <InputText style="width: 400px" v-model="mapy" hidden></InputText>
              <InputText style="width: 400px" v-model="homepage" hidden></InputText>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="button-group">
        <Button label="취소" class="p-button-rounded p-button-secondary p-button-sm mb-3 mr-3 mt-4" @click="onCancel" />
        <Button
          label="추가"
          icon="pi pi-plus"
          class="p-button-rounded p-button-primary p-button-sm mb-3 mt-4"
          @click="addMyPlace"
        />
      </div>
    </div>
  </div>
  <Toast />
</template>
<script>
import axios from "axios";
import { multipartOptions } from "@/constant/axios.js";
import router from "@/router";

export default {
  data() {
    return {
      title: "",
      detailAddr: "",
      overview: "",
      firstimage: "",
      mcatName: "",
      scatName: "",
      region: "",
      tel: "",
      mapx: "",
      mapy: "",
      homepage: "",
      displayBasic: false,
      submitted: false,
      markers: [],
      infowindow: null
    };
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        `${process.env.VUE_APP_KAKAO_API_KEY || ""}` +
        "&libraries=services";
      /* eslint를 사용한다면 kakao 변수가 선언되지 않았다고
       * 오류를 내기 때문에 아래 줄과 같이 전역변수임을
       * 알려주어야 한다. */
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(() => {
          // 카카오맵 API가 로딩이 완료된 후 지도의 기본적인 세팅을 시작해야 한다.
          this.initMap();
        });
      });
      document.head.appendChild(script);
    } else {
      // 이미 카카오맵 API가 로딩되어 있다면 바로 지도를 생성한다.
      this.initMap();
    }
  },
  methods: {
    async addMyPlace() {
      const formData = new FormData();

      formData.append("writerId", localStorage.getItem("id"));
      formData.append("title", this.title);
      formData.append("overview", this.memo);
      formData.append("mcatName", "내장소");
      formData.append("scatName", "전체");
      formData.append("region", this.title);
      formData.append("addr", this.detailAddr);
      formData.append("mapx", this.mapx);
      formData.append("mapy", this.mapy);

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/myplaces/`;
      const response = await axios.post(postUrl, formData, multipartOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      if (response.data.result === "success") {
        this.$router.push({ name: "add-schedule-main", params: { skdNum: this.$route.params.skdNum } });
      } else {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: "오류",
          life: 3000
        });
      }
    },
    onCancel() {
      router.back();
    },
    showError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "나만의 장소추가 실패", life: 3000 });
    },
    serverError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "서버에러", life: 3000 });
    },
    initMap() {
      const container = document.getElementById("map"); //지도 표시 영역
      const options = {
        // 처음 지도의 위치를 lat, lng(위도, 경도) 값으로 설정한다.
        center: new kakao.maps.LatLng(37.566815190669736, 126.97864094233952), //지도 중심좌표
        level: 5
      };

      this.map = new kakao.maps.Map(container, options);
      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      var marker = new kakao.maps.Marker(); // 클릭한 위치를 표시할 마커입니다

      // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
      const myMap = this.map;
      let myThis = this;
      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(myMap, "click", function (mouseEvent) {
        // let myThis = this;
        searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            var detailAddr = result[0].address.address_name;
            myThis.detailAddr = detailAddr;

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(myMap);
            myThis.mapx = mouseEvent.latLng.La;
            myThis.mapy = mouseEvent.latLng.Ma;
          }
        });
      });

      function searchDetailAddrFromCoords(coords, callback) {
        // 좌표로 법정동 상세 주소 정보를 요청합니다
        geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/main.scss";
.title-area {
  width: 1080px;
  margin: 20px auto;
}

.wrap {
  @include center;
  width: 100%;
}
.inner {
  @include c-center;
  width: 1080px;
  margin: 20px auto;
}
.map_wrap {
  position: relative;
  width: 1080px;
  margin: 20px auto;
  height: 500px;
}
.hAddr {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  background: #fff;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  padding: 5px;
}
.bAddr {
  padding: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.button-group {
  margin-bottom: 20px;
}
</style>
