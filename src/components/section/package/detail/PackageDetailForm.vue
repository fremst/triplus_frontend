<template>
  <div class="box">
    <div>
      <table class="table-reg">
        <tr class="tr-info">
          <td class="td-title">
            출&emsp;발
          </td>
          <td class="td-content">
            {{new Date(packageDetails.sdate).toLocaleDateString()}}<br>
          </td>
        </tr>
        <tr class="tr-info">
          <td class="td-title">
            도&emsp;착
          </td>
          <td class="td-content">
            {{new Date(packageDetails.edate).toLocaleDateString()}}<br>
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
            <InputNumber inputStyle="width: 60px; text-align: center" v-model="adultCnt" :min="1" :max="100" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/><br>
          </td>
        </tr>
        <tr class="tr-price">
          <td>
            <span class="price">{{packageDetails.adultPrice.toLocaleString()}} 원</span>
          </td>
        </tr>
        <tr class="tr-price">
          <td class="td-classification">아동</td>
          <td rowspan="2" class="td-content">
            <InputNumber inputStyle="width: 60px; text-align: center" v-model="childCnt" :min="0" :max="100" showButtons buttonLayout="horizontal" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"/><br>
          </td>
        </tr>
        <tr class="tr-price">
          <td>
            <span class="price">{{packageDetails.childPrice.toLocaleString()}} 원</span>
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
            <span class="totPrice">{{totPrice}} 원</span>
          </td>
        </tr>
      </table>
    </div>
    <Button label="예약하기"
     @click="$router.push(`/section/packages/${this.brdNum}/reservation`)"/>
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
    totPrice(){
      let result = ((this.packageDetails.adultPrice*this.adultCnt)+(this.packageDetails.childPrice*this.childCnt));
      if(result!=null){
        return result.toLocaleString();
      }else{
        return this.packageDetails.adultPrice;
      }
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
  text-align: center;
  height: 10px;
}
.td-title{
  text-align: left;
  padding-left: 20px;
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