<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <h1>예약 상세 정보</h1>
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
              <td>{{ myResInfo.totPrice }} 원</td>
            </tr>
            <tr>
              <td>예약 상태</td>
              <td>{{ myResInfo.resSta }}</td>
            </tr>
          </table>
        </div>
        <div>
          <h1 v-if="pkgComList.length>0">동행자 정보</h1>
          <table v-for="(pkgCom, index) in pkgComList" :key="index">
            <tr>
              <td class="td-title">
                구&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;분
              </td>
              <td>
                {{ pkgCom.pkgComClass }}
              </td>
            </tr>
            <tr>
              <td>
                이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
              </td>
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
              <td>
                성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;별
              </td>
              <td v-if="pkgCom.pkgComGender==='M'">
                남성
              </td>
              <td v-else>
                여성
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  <div class="btns">
    <Button @click="$router.back()">뒤로가기</Button>&emsp;
    <Button @click="refund()" v-if="myResInfo.resSta !== '취소'">예약취소</Button>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  data() {
    return {
      myResInfo: {},
      pkgComList: [],
    }
  },

  created(){
    axios.get(`http://localhost:8082/triplus/api/myreservations/${this.$route.params.oid}`, {

      headers: {
        'Access-Control-Allow-Origin': '*'

      },
    }).then(function (res) {

      this.myResInfo = res.data;
      this.pkgComList = res.data.pkgComDtos;

    }.bind(this)).catch(err => {

      console.log(err)

    })
  },

  methods:{
    refund(){

      if(confirm("정말로 취소하시겠습니까?")){

        let refundMsg = prompt("취소 사유를 입력해주세요.");
        const refundParam = new URLSearchParams();
        refundParam.append('oid', this.$route.params.oid);
        refundParam.append('tid', this.myResInfo.tid);
        refundParam.append('refundMsg', refundMsg);

        axios.post(`http://localhost:8082/triplus/api/v1/pay/refund/`, refundParam, {

          headers: {
            'Access-Control-Allow-Origin': '*'
          },

        }).then(function (res) {

          console.log(res);

          if(res.data.result === 'success') {
            alert("예약이 취소되었습니다.");
          }else{
            alert("실패하였습니다. 재시도 하세요.");
          }
          this.$router.go();

        }.bind(this)).catch(err => {

          console.log(err)

        })
      }
    }
  }

}

</script>

<style scoped>

table{
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0 20px;
}

tr{
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  height: 50px;
}

td{

  padding: 15px;
  text-align: left;
}

td:not(:last-child){
  border-right: 1px solid #dee2e6;
}

.td-title{
  width: 150px;
}

.wrapper{
  width: 1080px;
  margin: auto;
}

.inner{
  width: 900px;
  margin: auto;
}

.btns{
  text-align: center;
}

</style>