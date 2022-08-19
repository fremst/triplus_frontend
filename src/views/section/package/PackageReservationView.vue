<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <h1>상품 정보</h1>
        <br>
        <table>
          <tr>
            <td>상품번호</td>
            <td>{{packageDetails.brdNum}}</td>
          </tr>
          <tr>
            <td>상품명</td>
            <td>{{packageDetails.title}}</td>
          </tr>
          <tr>
            <td>여행 기간</td>
            <td>{{packageDetails.period}}</td>
          </tr>
          <tr>
            <td>출발일</td>
            <td>{{packageDetails.sDate}}</td>
          </tr>
          <tr>
            <td>도착일</td>
            <td>{{packageDetails.eDate}}</td>
          </tr>
          <tr>
            <td>여행자</td>
            <td>성인 {{$route.params.adultCnt}}명 / 아동 {{$route.params.childCnt}}명</td>
          </tr>
        </table>
        <br>
        <h1>예약자 정보</h1>
        <br>
        <table>
          <tr>
            <td>이름</td>
            <td><InputText type="text" class="p-inputtext-sm" name="bookerName" v-model="reserverInfo.name"/></td>
            <td>생년월일</td>
            <td><InputText type="text" class="p-inputtext-sm" name="bookerBDate" v-model="reserverInfo.bDate" /></td>
            <td>성별</td>
            <td>
              <RadioButton id="male" name="gender" value="male" v-model="reserverInfo.gender" />
              <label for="male">남성</label>
              <RadioButton id="female" name="gender" value="female" v-model="reserverInfo.gender" />
              <label for="female">여성</label>
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td colspan="5">
              <InputText type="text" class="p-inputtext-sm" v-model="reserverInfo.emailId"/>
              &nbsp;@&nbsp;
              <Dropdown v-model="selectedEmail" class="p-inputtext-sm" :options="domains" editable optionLabel="name" placeholder="직접입력" />
            </td>
          </tr>
          <tr>
            <td>휴대폰 번호</td>
            <td colspan="4">
              <InputText type="text" class="p-inputtext-sm" name="bookerTel" v-model="reserverInfo.tel" />
            </td>
          </tr>
        </table>
        <br>
        <h1 v-if="list">동행자 정보</h1>
        <br>
        <table v-for="(person, index) in list" :key="index">
          <tr>
            <td>
              구분
            </td>
            <td>
              {{person.trvlrClass}}
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <InputText type="text" class="p-inputtext-sm" v-model="person.name" />
            </td>
          </tr>
          <tr>
            <td>휴대폰 번호</td>
            <td>
              <InputText type="text" class="p-inputtext-sm" v-model="person.tel" />
            </td>
          </tr>
        </table>
        <br>
        <h1>할인 쿠폰 선택</h1>
        <br>
        <table>
          <tr>
            <td>적용된 쿠폰</td>
            <td>
              <Dropdown v-model="selectedCoupon" class="p-inputtext-sm" :options="coupons" optionLabel="name" placeholder="쿠폰 선택"
                        empty-message="사용 가능한 쿠폰 없음"/>
              &nbsp;
              <Button class="p-button-sm">
                쿠폰 적용
              </Button>
            </td>
          </tr>
          <tr v-if="selectedCoupon">
            <td>할인금액</td>
            <td>{{ discAmt }} 원</td>
          </tr>
        </table>
        <br>

        <div class="box">
          <table>
            <tr>
              <td class="td-price">
                상품 금액
              </td>
              <td class="td-price">
                할인 금액
              </td>
              <td class="td-price">
                총액
              </td>
            </tr>
            <tr>
              <td class="td-price">
                {{ this.packageDetails.adultPrice }} x {{ $route.params.adultCnt }}
                + {{ this.packageDetails.childPrice }} x {{ $route.params.childCnt }}
                = {{ this.packageDetails.adultPrice * $route.params.adultCnt + this.packageDetails.childPrice * $route.params.childCnt }} 원
              </td>
              <td class="td-price">
                {{ discAmt }} 원
              </td>
              <td class="td-price">
                {{ this.packageDetails.adultPrice * $route.params.adultCnt + this.packageDetails.childPrice * $route.params.childCnt - discAmt }} 원
              </td>
            </tr>
          </table>
        </div>
<!--        {{list}}-->
        <form id="payForm" action="http://localhost:8082/triplus/api/v1/pay/pcpay" method="POST" target="payFormFrame" hidden>

          <label for="brdNum">상품번호: </label>
          <input id="brdNum" name="brdNum" type="text" :value="$route.params.brdNum"><br>
          <label for="goodname">상품명: </label>
          <input id="goodname" name="goodname" type="text" :value="packageDetails.title"><br>

          <label for="adultCnt">성인 수: </label>
          <input id="adultCnt" name="adultCnt" type="text" :value="$route.params.adultCnt"><br>
          <label for="childCnt">아동 수: </label>
          <input id="childCnt" name="childCnt" type="text" :value="$route.params.childCnt "><br>
          <label for="price">가격: </label>
          <input id="price" name="price" readonly type="text" :value="this.packageDetails.adultPrice * $route.params.adultCnt + this.packageDetails.childPrice * $route.params.childCnt - discAmt">원<br>
          <label for="cpnNum">임시쿠폰번호: </label>
          <input id="cpnNum" name="cpnNum" readonly type="text" :value="0"><br><br>

          <label for="id">구매자 아이디: </label>
          <input id="id" name="id" type="text" :value="reserverInfo.uesrId"><br>

          <label for="bookerName">예약자 이름: </label>
          <input id="bookerName" name="bookerName" type="text" :value="reserverInfo.name"><br>

          <label for="bookerEmail">예약자 전화번호: </label>
          <input id="bookerEmail" name="bookerTel" type="text" :value="reserverInfo.tel"><br>

          <label for="bookerEmail">예약자 이메일: </label>
          <input id="bookerEmail" name="bookerEmail" type="text" :value="reserverEmail"><br>

          <input name="bookerBDate" value="2022-08-15">

          <label for="resSta">예약 상태: </label>
          <input id="resSta" name="resSta" type="text" value="결제전"><br><br>
          <button type="submit">결제하기</button>
        </form>
        <br>
        <div class="btns">
          <Button>뒤로가기</Button>&emsp;
          <Button @click="pay()" form="payForm">결제하기</Button>
        </div>
        <br>
          <iframe name="payFormFrame" :style="{position: 'fixed', top:0, left:0, width: '100%', height: '100%', display: iframeDisplay}"></iframe>
        </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      iframeDisplay: 'none',
      packageDetails: {},
      selectedEmail: "triplus.com",
      reserverInfo: {
        uesrId: "test",
        name: "홍길동",
        bDate: "2000-10-10",
        gender: "male",
        emailId: "test",
        tel: "0101112222",
      },
      gender: 'female',
      value1: 'XXXaaaa',
      list: [],
      selectedCoupon: "",
      domains: [
        {name: 'naver.com'},
        {name: 'gmail.com'},
        {name: 'daum.net'},
        {name: 'nate.com'}
      ],
      coupons: [
        // {name: '없음', value: '0'}
      ],
      discAmt: 0,
    }
  },

  computed:{
    reserverEmail(){
      if(typeof this.selectedEmail == "object"){
        return this.reserverInfo.emailId + "@" + this.selectedEmail.name;
      }
      return this.reserverInfo.emailId + "@" + this.selectedEmail;
    }
  },

  mounted() {
    for(let i=0; i<this.$route.params.adultCnt-1; i++){
      this.list.push({name: '', trvlrClass: '성인'})
    }
    for(let i=0; i<this.$route.params.childCnt; i++){
      this.list.push({name: '', trvlrClass: '아동'})
    }
  },

  methods: {
    formatCurrency(value) {
      return value.toLocaleString('ko-KR')+' 원';
    },
    pay(){
      this.iframeDisplay='block';
      document.getElementById("payForm").submit();
    }
  },

  created() {
    axios.get(`http://localhost:8082/triplus/api/section/packages/${this.$route.params.brdNum}`, {

      headers: {
        'Access-Control-Allow-Origin': '*'
      },

    }).then(function(resp) {

      this.packageDetails = Object.assign(resp.data.dto, resp.data.map);

    }.bind(this)).catch(err=> {

          console.log(err)

        }
    );

    // axios.get(`http://localhost:8082/triplus/api/members/${userId}`, {
    //
    //   headers: {
    //     'Access-Control-Allow-Origin': '*'
    //   },
    //
    // }).then(function(resp) {
    //
    //   this.reserverInfo = resp.data.dto;
    //
    // }.bind(this)).catch(err=> {
    //
    //       console.log(err)
    //
    //     }
    // );
  },
}
</script>

<style scoped>


.box{
  border: 1px solid #dee2e6;
  padding: 30px 20px;
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

.td-price{
  text-align: center;
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