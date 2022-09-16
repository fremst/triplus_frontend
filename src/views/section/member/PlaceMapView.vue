<template>
  <div class="map_wrap">
    <div id="map1"></div>
  </div>
</template>
<script>
export default {
  name: "PlaceMapView",
  props: {
    visible: {
      type: Boolean,
      default() {
        return true;
      }
    },
    events: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      test: true,
      infowindow: null,
      map: null
    };
  },
  computed: {
    markers() {
      let result = [];
      for (let i = 0; i < this.events.length; i++) {
        for (let j = 0; j < this.events[i].length; j++) {
          if (this.events[i][j]) {
            result.push({ mapx: this.events[i][j].mapx, mapy: this.events[i][j].mapy });
          }
        }
      }
      return result;
    }
  },
  watch: {
    markers: function () {
      for (let i = 0; i < this.markers.length; i++) {
        const markerPosition = new kakao.maps.LatLng(this.markers[i].mapy, this.markers[i].mapx);
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(this.map);
      }
    }
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=" +
        `${process.env.VUE_APP_KAKAO_API_KEY || ""}` +
        "&libraries=clusterer,drawing,services";
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
    initMap() {
      const container = document.getElementById("map1"); //지도 표시 영역
      const options = {
        // 처음 지도의 위치를 lat, lng(위도, 경도) 값으로 설정한다.
        center: new kakao.maps.LatLng(37.566815190669736, 126.97864094233952), //지도 중심좌표
        level: 7
      };

      this.map = new kakao.maps.Map(container, options);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/main.scss";
.map_wrap {
  @include center;
  position: relative;
  width: 1080px;
  margin: 20px auto;
  height: 500px;
}
#map1 {
  @include c-center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.p-dialog .product-image {
  width: 300px;
  height: 200px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
