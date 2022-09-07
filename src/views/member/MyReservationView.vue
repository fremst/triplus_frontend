<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <div class="title">
          <h2 style="color: #009688">내 예약</h2>
        </div>
        <hr />

        <br />
        <h3>예약 정보</h3>

        <table>
          <tr>
            <td class="td-title">결제 상품</td>
            <td>{{ myResInfo.title }}</td>
          </tr>
          <tr>
            <td>여행 기간</td>
            <td>{{ myResInfo.period }}</td>
          </tr>
          <tr>
            <td>여행 시작일</td>
            <td>{{ myResInfo.sDate }}</td>
          </tr>
          <tr>
            <td>여행 종료일</td>
            <td>{{ myResInfo.eDate }}</td>
          </tr>
          <tr>
            <td>결제 총액</td>
            <td>{{ $getFormattedCurrency(myResInfo.totPrice) }}</td>
          </tr>
          <tr>
            <td>예약 상태</td>
            <td>{{ myResInfo.resSta }}</td>
          </tr>
        </table>
      </div>
      <div>
        <h3 v-if="pkgComList.length > 0">동행자 정보</h3>
        <table v-for="(pkgCom, index) in pkgComList" :key="index">
          <tr>
            <td class="td-title">구&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;분</td>
            <td>
              {{ pkgCom.pkgComClass }}
            </td>
          </tr>
          <tr>
            <td>이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</td>
            <td>
              {{ pkgCom.pkgComName }}
            </td>
          </tr>
          <tr v-if="pkgCom.pkgComTel">
            <td>전화 번호</td>
            <td>
              {{ pkgCom.pkgComTel }}
            </td>
          </tr>
          <tr>
            <td>성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;별</td>
            <td v-if="pkgCom.pkgComGender === 'M'">남성</td>
            <td v-else>여성</td>
          </tr>
        </table>
        <ConfirmDialog v-model:visible="displayConfirmation" :msg="'정말로 취소하시겠습니까?'" @closeDialog="refund" />
        <Toast></Toast>
      </div>
    </div>
  </div>
  <div class="btns">
    <Button @click="$router.back()" class="p-button-secondary p-component p-button-label mt-3 mb-5 mr-3">
      뒤로가기
    </Button>
    <Button
      @click="openDialog('delete', true)"
      v-if="myResInfo.resSta !== '취소'"
      class="p-button-danger p-component p-button-label mt-3 mb-5"
    >
      취소 / 환불하기
    </Button>
  </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios";
import ConfirmDialog from "@/views/admin/place/ConfirmDialog.vue";

export default {
  data() {
    return {
      myResInfo: {},
      pkgComList: [],
      displayConfirmation: false
    };
  },

  components: {
    ConfirmDialog
  },

  async created() {
    const getUrl = `${process.env.VUE_APP_API_URL || ""}/myreservations/${this.$route.params.oid}`;

    const res = await axios.get(getUrl, defaultOptions).catch(err => {
      this.$toast.add({
        severity: "error",
        summary: "",
        detail: err,
        life: 3000
      });
    });

    this.myResInfo = res.data;
    this.pkgComList = res.data.pkgComDtos;
  },

  methods: {
    openDialog(dialogType, show) {
      if (dialogType === "delete") {
        this.displayConfirmation = show;
      }
    },
    async refund(confirm) {
      if (!confirm) {
        return false;
      }
      const refundParam = new URLSearchParams();
      refundParam.append("oid", this.$route.params.oid);
      refundParam.append("tid", this.myResInfo.tid);
      refundParam.append("refundMsg", "사용자 취소");

      const postUrl = `${process.env.VUE_APP_API_URL || ""}/v1/pay/refund/`;

      const res = await axios.post(postUrl, refundParam, defaultOptions).catch(err => {
        this.$toast.add({
          severity: "error",
          summary: "",
          detail: err,
          life: 3000
        });
      });

      if (res.data.result === "success") {
        await this.$toast.add({
          severity: "success",
          summary: "",
          detail: "예약이 취소되었습니다.",
          life: 3000
        });
        this.$router.go();
      } else {
        await this.$toast.add({
          severity: "error",
          summary: "",
          detail: "실패하였습니다. 다시 시도하세요.",
          life: 3000
        });
        this.$router.go();
      }
    }
  }
};
</script>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 10px;
}

hr {
  border: 0;
  height: 1px;
  margin-bottom: 15px;
  background: #dee2e6;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0 20px;
}

tr {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  height: 50px;
}

td {
  padding: 15px;
  text-align: left;
}

td:not(:last-child) {
  border-right: 1px solid #dee2e6;
}

.td-title {
  width: 150px;
  margin-bottom: 20px;
}

.wrapper {
  width: 1080px;
  margin: auto;
}

.inner {
  width: 900px;
  margin: auto;
}

.btns {
  text-align: center;
  margin-bottom: 20px;
}
</style>
