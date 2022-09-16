<template>
  <table>
    <tr>
      <td>여행 기간</td>
      <td colspan="3">{{ packageDetails.period }}</td>
    </tr>
    <tr>
      <td>방문 도시</td>
      <td colspan="3">{{ packageDetails.region }}</td>
    </tr>
    <tr>
      <td>교&emsp;&emsp;&nbsp;통</td>
      <td colspan="3">{{ packageDetails.trans }}</td>
    </tr>
    <tr>
      <td>예약 현황</td>
      <td colspan="3">남은 인원: {{ packageDetails.vacancy }}인 (최소 출발 10인)</td>
    </tr>
    <tr>
      <td>구&emsp;&emsp;&nbsp;분</td>
      <td>성&emsp;인</td>
      <td>아&emsp;동<br /><span style="font-size: 0.8rem">(만 2세 ~ 만 12세)</span></td>
      <td>&emsp;유&emsp;아&emsp;</td>
    </tr>
    <tr>
      <td>패키지 가격</td>
      <td class="td-price">{{ adultPriceToLocale }} 원</td>
      <td class="td-price">{{ childPriceToLocale }} 원</td>
      <td class="td-price">0 원</td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      sales: null
    };
  },

  props: {
    packageDetails: Object
  },

  computed: {
    adultPriceToLocale() {
      if (this.packageDetails.adultPrice) {
        return parseInt(this.packageDetails.adultPrice).toLocaleString();
      } else {
        return 0;
      }
    },

    childPriceToLocale() {
      if (this.packageDetails.childPrice) {
        return this.packageDetails.childPrice.toLocaleString();
      } else {
        return 0;
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 500px;
  border-collapse: collapse;
}

tr {
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  height: 50px;
}

td {
  text-align: center;
  padding: 15px;
}

td:not(:last-child) {
  border-right: 1px solid #dee2e6;
}
.td-price {
  text-align: center;
  height: 100px;
  font-weight: bold;
  color: #009688;
}
</style>
