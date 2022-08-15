<template>
  <table>
    <tr>
      <td>여행 기간</td>
      <td colspan="3">xx박 xx일</td>
    </tr>
    <tr>
      <td>방문 도시</td>
      <td colspan="3">{{packageDetails.region}}</td>
    </tr>
    <tr>
      <td>교&emsp;&emsp;통</td>
      <td colspan="3">{{packageDetails.trans}}</td>
    </tr>
    <tr>
      <td>예약 현황</td>
      <td colspan="3">남은 인원: xx인 (최소 출발 xx인)</td>
    </tr>
    <tr>
      <td>구&emsp;&emsp;분</td>
      <td>성인</td>
      <td>아동<br><span style="font-size: 0.8rem">(만 2세 ~ 만 12세)</span></td>
      <td>유아</td>
    </tr>
    <tr>
      <td>
        패키지 가격
      </td>
      <td class="td-price">
        {{ packageDetails.adultPrice.toLocaleString() }} 원
      </td>
      <td class="td-price">
        {{ packageDetails.childPrice.toLocaleString() }} 원
      </td>
      <td class="td-price">
        0 원
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      sales: null
    }
  },
  props: {
    packageDetails: Object,
  },
  created() {
    this.sales = [
      {product: '패키지 가격', thisYearSale: 30900, lastYearProfit: 28900, thisYearProfit: 0},
    ];
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('ko-KR')+' 원';
    }
  },
  computed: {
    lastYearTotal() {
      let total = 0;
      for(let sale of this.sales) {
        total += sale.lastYearProfit;
      }

      return this.formatCurrency(total);
    },
    thisYearTotal() {
      let total = 0;
      for(let sale of this.sales) {
        total += sale.thisYearProfit;
      }

      return this.formatCurrency(total);
    }
  }
}
</script>

<style scoped>
table{
  width: 500px;
  border-collapse: collapse;
}
tr{
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  height: 50px;
}
td{
  text-align: center;
  padding: 15px;
}
td:not(:last-child){
  border-right: 1px solid #dee2e6;
}
.td-price{
  text-align: center;
  height: 100px;
  font-weight: bold;
  color: #009688;
}
/*.p-column-header-content{*/
/*  justify-content: center;*/
/*}*/
/*tr > td {*/
/*  text-align: center !important;*/
/*  font-weight: bold;*/
/*  font-size: 14pt;*/
/*  color: #009688;*/
/*  height: 150px;*/
/*}*/
</style>