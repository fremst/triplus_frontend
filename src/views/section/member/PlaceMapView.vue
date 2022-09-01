<template>
  <div id="map1"></div>
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
    }
  },
  data() {
    return {
      test: true,
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
        level: 5
      };

      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map1");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map1.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach(marker => marker.setMap(null));
      }

      const positions = markerPositions.map(position => new kakao.maps.LatLng(...position));

      if (positions.length > 0) {
        this.markers = positions.map(
          position =>
            new kakao.maps.Marker({
              map: this.map1,
              position
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map1.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map1.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(37.566815190669736, 126.97864094233952), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map1, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable
      });

      this.map.setCenter(iwPosition);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
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
#map1 {
  width: 600px;
  height: 350px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}
</style>
