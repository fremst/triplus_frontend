<template>
  <div class="wrap">
    <div class="sidebar">
      <AdminPageSidebar />
    </div>
    <div class="inner">
      <h1>명소 상세정보</h1>
      <div class="detail">
        <div class="form">
          <table class="list-table">
            <tr height="350px">
              <td width="150px">명소이미지</td>
              <td><img :src="`data:image/jpeg;base64,${data.firstimage}`" /></td>
            </tr>
            <tr height="100px">
              <td>명소명</td>
              <td>{{ data.title }}</td>
            </tr>
            <tr height="100px">
              <td>주소</td>
              <td>{{ data.addr }}</td>
            </tr>
            <tr height="100px">
              <td>경도</td>
              <td>{{ data.mapx }}</td>
            </tr>
            <tr height="100px">
              <td>위도</td>
              <td>{{ data.mapy }}</td>
            </tr>
            <tr height="100px">
              <td>전화번호</td>
              <td>{{ data.tel }}</td>
            </tr>
            <tr height="100px">
              <td>url</td>
              <td>
                <a :href="data.homepage">{{ data.homepage }}</a>
              </td>
            </tr>
            <tr>
              <td>상세설명</td>
              <td width="550px" class="overview">{{ data.overview }}</td>
            </tr>
          </table>
          <div class="list-button">
            <Button
              label="수정하기"
              class="p-button-primary mr-2"
              @click="$router.push('/admin/place/' + data.brdNum)"
            />
            <Button label="삭제하기" class="p-button-danger mr-2" @click="openDialog('delete', true)" />
            <ConfirmDialog
              v-model:visible="showConfirmDialog"
              :msg="'선택하신 명소 정보를 삭제하시겠습니까?'"
              @closeDialog="deleteSelectedProducts"
            />
            <Button label="목록으로" class="p-button-secondary mr-2" @click="goList" />
          </div>
        </div>
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
      const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/attraction/${this.$route.params.brdNum}`;
      const resp = await axios.get(getUrl, defaultOptions).catch(err => {
        alert("서버 연결 실패", err);
      });

      this.data = resp.data;
    },
    openDialog(dialogType, show) {
      if (dialogType === "delete") {
        this.showConfirmDialog = show;
      }
    },
    async deleteSelectedProducts(value) {
      if (!value) {
        return false;
      } else {
        const deleteUrl = `${process.env.VUE_APP_API_URL || ""}/section/places/attraction/${this.$route.params.brdNum}`;
        const resp = await axios.delete(deleteUrl, defaultOptions).catch(err => {
          alert("서버 연결 실패", err);
        });
        this.data = resp.data;
        this.goList(-1);
      }
    },
    //목록으로 가기
    goList() {
      router.push("/admin/place/attraction");
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  min-height: 750px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.sidebar {
  margin-left: -220px;
  margin-right: 20px;
}

.inner {
  width: 1080px;
}

.list-button {
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
}

img {
  width: 500px;
  height: 300px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

td {
  text-align: center;
  border-bottom: 1px solid lightgray;
}

.detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
.list-table {
  border-top: 1px solid lightgray;
}
.overview {
  padding: 20px;
}
</style>
