<template>
  <div class="box">
    <div>
      <table class="table-reg">
        <tr class="tr-info">
          <td class="td-title">
            출발
          </td>
          <td class="td-content">
            2022. 08. 04. (목) 07:00<br>
          </td>
        </tr>
        <tr class="tr-info">
          <td class="td-title">
            도착
          </td>
          <td class="td-content">
            2022. 08. 06. (토) 20:00<br>
          </td>
        </tr>
        <tr class="tr-info">
          <td class="td-title">
            교통
          </td>
          <td class="td-content">
            버스
          </td>
        </tr>
        <tr class="tr-info">
          <td class="td-title">
            남은 인원
          </td>
          <td class="td-content">
            24명<br>
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <div>
      <table class="table-reg">
        <tr class="tr-price">
          <td class="td-classification">성인</td>
          <td rowspan="2" class="td-content">
            <InputNumber inputStyle="width: 60px; text-align: center" v-model="value1" :min="1" :max="100" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/><br>
          </td>
        </tr>
        <tr class="tr-price">
          <td>
            <span class="price">30,900원</span>
          </td>
        </tr>
        <tr class="tr-price">
          <td class="td-classification">아동</td>
          <td rowspan="2" class="td-content">
            <InputNumber inputStyle="width: 60px; text-align: center" v-model="value2" :min="0" :max="100" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/><br>
          </td>
        </tr>
        <tr class="tr-price">
          <td>
            <span class="price">28,900원</span>
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <div class="totPriceBox">
      <table class="table-reg">
        <tr>
          <td class="td-title">
            총 금액
          </td>
          <td class="td-content">
            <span class="totPrice">30,900원</span>
          </td>
        </tr>
      </table>
    </div>
    <Button label="예약하기" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sales: null,
      value1: 1,
      value2: 0,
    }
  },
  created() {
    this.sales = [
      {product: '패키지 가격', thisYearSale: 30900, lastYearProfit: 28900, thisYearProfit: 0},
    ];
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
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

<style scoped lang="scss">
.box{
  border: 1px solid #dee2e6;
  padding: 30px 20px;
}
.table-reg{
  margin: auto;
  width: 350px;
}
.tr-price{
  height: 10px;
}
.td-title{
  text-align: left;
}
.td-content{
  text-align: right;
}
.td-classification{
  font-size: 14pt
}
.tr-info{
  height: 40px;
}
.totPriceBox{
  margin-top: 20px;
  margin-bottom: 20px;
}
.price{
  font-weight: bold;
}
.totPrice{
  font-weight: bold;
  font-size: 20pt;
  color: #009688;
}
input{
  width:100px;
}
button{
  width: 250px;
}
</style>