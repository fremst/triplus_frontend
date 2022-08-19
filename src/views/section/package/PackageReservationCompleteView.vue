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
              <td></td>
            </tr>
            <tr>
              <td>예약자 이름</td>
              <td></td>
            </tr>
            <tr>
              <td>예약자 연락처</td>
              <td></td>
            </tr>
            <tr>
              <td>여행 시작일</td>
              <td></td>
            </tr>
            <tr>
              <td>여행 종료일</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</template>

<script>

export default {

  data() {
    return {
    }
  },

}

</script>

<style scoped>

.info{
  text-align: center;
  margin: 100px;
}

.checkImg{
  width: 80px;
  margin: 20px;
}

table{
  width: 100%;
  border-collapse: collapse;
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