<template>
  <div class="wrap">
    <div class="inner">
      <h1>명소 상세정보</h1>
      <table border="1px solid #333333" class="list-table">
        <tr>
          <td>명소이미지</td>
          <td><img :src="`data:image/jpeg;base64,${data.firstimage}`" /></td>
        </tr>
        <tr>
          <td>명소명</td>
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
          :msg="'선택하신 명소 정보를 삭제하시겠습니까?'"
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
    getDetail() {
      axios
        .get(`http://localhost:8082/triplus/api/section/places/attraction/${this.$route.params.brdNum}`, this.data, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => {
          this.data = res.data;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    openDialog(dialogType, show) {
      if (dialogType === "delete") {
        this.showConfirmDialog = show;
      }
    },
    deleteSelectedProducts(value) {
      //삭제버튼을 누르고 YES클릭시 상태값이 콘솔로그에 찍힘. ex)true
      console.log(value);
      if (!value) {
        return false;
      } else {
        axios
          .delete(
            `http://localhost:8082/triplus/api/section/places/attraction/${this.$route.params.brdNum}`,
            this.data,
            {
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            }
          )
          .then(res => {
            this.data = res.data;
          })
          .catch(err => {
            console.log(err.response);
          });
        this.goList(-1);
      }
    },
    //목록으로 가기
    goList() {
      router.push("/section/place/attraction");
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
