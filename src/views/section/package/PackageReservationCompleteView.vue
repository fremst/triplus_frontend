<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <div class="info">
          <img :src="require('@/assets/section/package/images/reservation/checkBox.png')" class="checkImg" />
          <h1>결제가 완료되었습니다 :)</h1>
        </div>
        <h1>결제 정보</h1>
        <table>
          <tr>
            <td class="td-title">결제 상품</td>
            <td>{{ pkgResInfo.title }}</td>
          </tr>
          <tr>
            <td class="td-title">결제 금액</td>
            <td>{{ $getFormattedCurrency(pkgResInfo.totPrice) }}</td>
          </tr>
          <tr>
            <td class="td-title">승인 번호</td>
            <td>{{ pkgResInfo.applNum }}</td>
          </tr>
          <tr>
            <td class="td-title">승인 일시</td>
            <td>{{ pkgResInfo.applDateTime }}</td>
          </tr>
        </table>
        <h1>예약 정보</h1>
        <table>
          <tr>
            <td class="td-title">예약자 이름</td>
            <td>{{ pkgResInfo.bookerName }}</td>
          </tr>
          <tr>
            <td class="td-title">예약자 연락처</td>
            <td>{{ pkgResInfo.bookerTel }}</td>
          </tr>
          <tr>
            <td class="td-title">여행 시작일</td>
            <td>{{ pkgResInfo.sDate }}</td>
          </tr>
          <tr>
            <td class="td-title">여행 종료일</td>
            <td>{{ pkgResInfo.eDate }}</td>
          </tr>
        </table>
        <div class="btns">
          <Button @click="this.$router.push({ name: 'myreservation', params: { oid: this.$route.params.oid } })"
            >예약 상세</Button
          >&emsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defaultOptions } from "@/constant/axios";

export default {
  data() {
    return {
      pkgResInfo: {}
    };
  },

  async created() {
    const getUrl = `${process.env.VUE_APP_API_URL || ""}/section/packages/reservation-complete/${
      this.$route.params.oid
    }`;

    const res = await axios.get(getUrl, defaultOptions).catch(err => {
      alert("서버 연결 실패", err);
      console.log(err);
    });

    this.pkgResInfo = res.data;
  }
};
</script>

<style scoped>
.info {
  text-align: center;
  margin: 100px;
}

.checkImg {
  width: 140px;
  margin: 20px;
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
