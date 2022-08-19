<template>
  <div class="box">
    <div>
      <table class="table-reg">
        <tr class="tr-info">
          <td class="td-title">
            출&emsp;발
          </td>
          <td class="td-content">
            {{packageDetails.sdate}}<br>
          </td>
        </tr>
        <tr class="tr-info">
          <td class="td-title">
            도&emsp;착
          </td>
          <td class="td-content">
            {{packageDetails.edate}}<br>
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <div>
      <table class="table-reg">
        <tr class="tr-price">
          <td class="td-classification">성&emsp;인</td>
          <td rowspan="2" class="td-content">
            <InputNumber inputStyle="width: 60px; text-align: center" v-model="adultCnt" :min="1" :max="Math.min(packageDetails.vacancy,packageDetails.vacancy-childCnt)" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/><br>
          </td>
        </tr>
        <tr class="tr-price">
          <td>
            <span class="price">{{ (this.packageDetails.adultPrice * this.adultCnt).toLocaleString() }} 원</span>
          </td>
        </tr>
        <tr class="tr-price">
          <td class="td-classification">아&emsp;동</td>
          <td rowspan="2" class="td-content">
            <InputNumber inputStyle="width: 60px; text-align: center" v-model="childCnt" :min="0" :max="Math.min(packageDetails.vacancy,packageDetails.vacancy-adultCnt)" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/><br>
          </td>
        </tr>
        <tr class="tr-price">
          <td>
            <span class="price">{{ (this.packageDetails.childPrice * this.childCnt).toLocaleString() }} 원</span>
          </td>
        </tr>
      </table>
    </div>
    <hr>
    <div class="totPriceBox">
      <table class="table-reg">
        <tr>
          <td class="td-title">
            <h3>총 금액</h3>
          </td>
          <td class="td-content">
            <span class="totPrice">{{totPrice}} 원</span>
          </td>
        </tr>
      </table>
    </div>
    <Button label="예약하기"
     @click="this.$router.push({name: 'package-reservation', params: {childCnt: this.childCnt, adultCnt: this.adultCnt}})"/>
  </div>
</template>

<script>
export default {

  data() {
    return {
      sales: null,
      adultCnt: 1,
      childCnt: 0,
    }
  },

  props: {
    packageDetails: Object,
  },

  computed: {
    brdNum(){
      return this.$route.params.brdNum;
    },
    adultPriceToLocale(){
      if(this.packageDetails.adultPrice){
        return parseInt(this.packageDetails.adultPrice).toLocaleString();
      }else{
        return 0;
      }
    },
    childPriceToLocale(){
      if(this.packageDetails.childPrice){
        return this.packageDetails.childPrice.toLocaleString();
      }else{
        return 0;
      }
    },
    totPrice(){
      let result = ((this.packageDetails.adultPrice*this.adultCnt)+(this.packageDetails.childPrice*this.childCnt));
      if(result!=null){
        return result.toLocaleString();
      }else{
        return this.packageDetails.adultPrice;
      }
    }
  },
}
</script>

<style scoped lang="scss">

  .box{
    border: 1px solid #dee2e6;
    padding: 20px 15px;
  }

  .table-reg{
    margin: auto;
    width: 350px;
  }

  .tr-price{
    text-align: center;
    height: 10px;
  }

  .td-title{
    width: 130px;
  }

  .td-content{
    text-align: right;
  }

  .td-classification{
    width: 130px;
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
    font-size: 1.1rem;
  }

  .totPrice{
    font-weight: bold;
    font-size: 20pt;
    color: #009688;
  }

  td{
    padding: 5px;
  }

  input{
    width:100px;
  }

  button{
    width: 250px;
  }

</style>