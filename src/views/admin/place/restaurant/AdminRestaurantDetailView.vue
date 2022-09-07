<template>
  <div class="wrap">
    <div class="inner">
      <h1>맛집 상세정보</h1>
      <table border="1px solid #333333" class="list-table">
        <tr>
          <td>맛집이미지</td>
          <td><img :src="`data:image/jpeg;base64,${data.firstimage}`" /></td>
        </tr>
        <tr>
          <td>맛집명</td>
          <td>{{ data.title }}</td>
        </tr>
        <tr>
          <td>주소</td>
          <td>{{ data.addr }}</td>
        </tr>
        <tr>
          <td>경도</td>
          <td>{{ data.mapx }}</td>
        </tr>
        <tr>
          <td>위도</td>
          <td>{{ data.mapy }}</td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{{ data.tel }}</td>
        </tr>
        <tr>
          <td>url</td>
          <td>
            <a :href="data.homepage">{{ data.homepage }}</a>
          </td>
        </tr>
        <tr>
          <td>상세설명</td>
          <td>{{ data.overview }}</td>
        </tr>
      </table>
      <div class="list-button">
        <Button label="수정하기" class="p-button-primary mr-2" @click="$router.push('/admin/place/' + data.brdNum)" />
        <Button label="삭제하기" class="p-button-danger mr-2" @click="openDialog('delete', true)" />
        <ConfirmDialog
          v-model:visible="showConfirmDialog"
          :msg="'선택하신 맛집 정보를 삭제하시겠습니까?'"
          @closeDialog="deleteSelectedProducts"
        />
        <Button label="목록으로" class="p-button-secondary mr-2" @click="goList" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import ConfirmDialog from "@/views/admin/place/ConfirmDialog.vue";
import { defaultOptions } from "@/constant/axios";

export default {
  data() {
    return {
      products: null,
      data: {},
      submitted: false,
      showConfirmDialog: false
    };
  },
  components: {
    ConfirmDialog
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/restaurant/${this.$route.params.brdNum}`;
      const resp = await axios.get(getUrl, defaultOptions).catch(err => {
        this.serverError(err);
      });

      this.data = resp.data;
    },
    openDialog(dialogType, show) {
      if (dialogType === "delete") {
        this.showConfirmDialog = show;
      }
    },
    async deleteSelectedProducts(value) {
      //삭제버튼을 누르고 YES클릭시 상태값이 콘솔로그에 찍힘. ex)true
      console.log(value);
      if (!value) {
        return false;
      } else {
        const deleteUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/restaurant/${this.$route.params.brdNum}`;
        const resp = await axios.delete(deleteUrl, defaultOptions).catch(err => {
          alert("서버 연결 실패", err);
        });
        this.data = resp.data;
        this.goList(-1);
      }
    },
    serverError() {
      this.$toast.add({ severity: "error", summary: "Error Message", detail: "서버에러", life: 3000 });
    },
    //목록으로 가기
    goList() {
      router.push("/admin/place/restaurant");
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
.list-button {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 760px;
}
</style>
