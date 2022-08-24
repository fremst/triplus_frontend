<template>
  <div class="wrapper">
    <div class="inner">
      <div>

        <div class = "info">
          <img :src="require('@/assets/section/package/images/reservation/checkBox.png')" class="checkImg">
          <h1>결제가 완료되었습니다 :)</h1>
        </div>
        <h1>결제 정보</h1>
          <table>
            <tr>
              <td>결제 상품</td>
              <td>{{ pkgResInfo.title }}</td>
            </tr>
            <tr>
              <td>예약자 이름</td>
              <td>{{ pkgResInfo.bookerName }}</td>
            </tr>
            <tr>
              <td>예약자 연락처</td>
              <td>{{ pkgResInfo.bookerTel }}</td>
            </tr>
            <tr>
              <td>여행 시작일</td>
              <td>{{ pkgResInfo.sDate }}</td>
            </tr>
            <tr>
              <td>여행 종료일</td>
              <td>{{ pkgResInfo.eDate }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {

  data() {
    return {
      pkgResInfo: {},
    }
  },

  created(){
    console.log(this.$route.params.oid);

    axios.get(`http://localhost:8082/triplus/api/section/packages/reservation-complete/${this.$route.params.oid}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }).then(function (resp) {

      this.pkgResInfo = resp.data;

    }.bind(this)).catch(err => {

      console.log(err)

    })
  },

}

</script>

<style scoped>

.info{
  text-align: center;
  margin: 100px;
}

.checkImg{
  width: 140px;
  margin: 20px;
}

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

.wrapper{
  width: 1080px;
  margin: auto;
}

.inner{
  width: 900px;
  margin: auto;
}

</style>