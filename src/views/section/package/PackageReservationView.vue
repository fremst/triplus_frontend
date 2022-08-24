<template>
  <div class="wrapper">
    <div class="inner">
      <div>
        <h1>상품 정보</h1>
        <br>
        <table>
          <tr>
            <td class="td-title">상품 번호</td>
            <td>{{packageDetails.brdNum}}</td>
          </tr>
          <tr>
            <td>상&nbsp;&nbsp;품&nbsp;&nbsp;명</td>
            <td>{{packageDetails.title}}</td>
          </tr>
          <tr>
            <td>여행 기간</td>
            <td>{{packageDetails.period}}</td>
          </tr>
          <tr>
            <td>출&nbsp;&nbsp;발&nbsp;&nbsp;일</td>
            <td>{{packageDetails.sDate}}</td>
          </tr>
          <tr>
            <td>도&nbsp;&nbsp;착&nbsp;&nbsp;일</td>
            <td>{{packageDetails.eDate}}</td>
          </tr>
          <tr>
            <td>여&nbsp;&nbsp;행&nbsp;&nbsp;자</td>
            <td>성인 {{$route.query.adultCnt}}명 / 아동 {{$route.query.childCnt}}명</td>
          </tr>
        </table>
        <br>
        <h1>예약자 정보</h1>
        <br>
        <table>
          <tr>
            <td class="td-title">이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름</td>
            <td><InputText type="text" class="p-inputtext-sm" name="bookerName" v-model="bookerInfo.name"/></td>
            <td>생년월일</td>
            <td><InputText type="date" class="p-inputtext-sm" name="bookerBDate" v-model="bookerInfo.bDate"/></td>
          </tr>
          <tr>
            <td>이&nbsp;&nbsp;메&nbsp;&nbsp;일</td>
            <td colspan="3">
              <InputText type="text" class="p-inputtext-sm" v-model="bookerInfo.emailId"/>
              &nbsp;@&nbsp;
              <Dropdown v-model="selectedEmail" class="p-inputtext-sm" :options="domains" editable optionLabel="name" placeholder="직접입력"/>
            </td>
          </tr>
          <tr>
            <td>전화 번호</td>
            <td colspan="4">
              <InputText type="text" class="p-inputtext-sm" name="bookerTel" v-model="bookerInfo.tel"/>
            </td>
          </tr>
        </table>
        <br>
        <h1 v-if="list.length>0">동행자 정보</h1>
        <br>
        <table v-for="(pkgCom, index) in list" :key="index">
          <tr>
            <td class="td-title">
              구&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;분
            </td>
            <td>
              {{pkgCom.class}}
            </td>
          </tr>
          <tr>
            <td>
              이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;름
            </td>
            <td>
              <InputText type="text" class="p-inputtext-sm" v-model="pkgCom.name"/>
            </td>
          </tr>
          <tr>
            <td>전화 번호</td>
            <td>
              <InputText type="text" class="p-inputtext-sm" v-model="pkgCom.tel" />
            </td>
          </tr>
          <tr>
            <td>
              성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;별
            </td>
            <td>
              <RadioButton id="male" name="gender" value="M" v-model="pkgCom.gender" />
              <label for="male">남성</label>
              <RadioButton id="female" name="gender" value="F" v-model="pkgCom.gender" />
              <label for="female">여성</label>
            </td>
          </tr>
        </table>
        <br>
        <h1>할인 쿠폰 선택</h1>
        <br>
        <table>
          <tr>
            <td class="td-title">적용된 쿠폰</td>
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
                총&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;액
              </td>
            </tr>
            <tr>
              <td class="td-price">
                {{ this.packageDetails.adultPrice }} x {{ $route.query.adultCnt }}
                + {{ this.packageDetails.childPrice }} x {{ $route.query.childCnt }}
                = {{ this.packageDetails.adultPrice * $route.query.adultCnt + this.packageDetails.childPrice * $route.query.childCnt }} 원
              </td>
              <td class="td-price">
                {{ discAmt }} 원
              </td>
              <td class="td-price">
                {{ this.packageDetails.adultPrice * $route.query.adultCnt + this.packageDetails.childPrice * $route.query.childCnt - discAmt }} 원
              </td>
            </tr>
          </table>
        </div>
          <form id="payForm" action="http://localhost:8082/triplus/api/v1/pay/pcpay" method="POST" target="payFormFrame" hidden>

            <input name="brdNum" type="text" :value="$route.params.brdNum"><br>
            <input name="goodName" type="text" :value="packageDetails.title"><br>

            <input name="adultCnt" type="text" :value="$route.query.adultCnt"><br>
            <input name="childCnt" type="text" :value="$route.query.childCnt "><br>

            <input name="price" readonly type="text" :value="this.packageDetails.adultPrice * $route.query.adultCnt + this.packageDetails.childPrice * $route.query.childCnt - discAmt">원<br>
            <input name="cpnNum" readonly type="text" :value="0"><br><br>

            <input name="id" type="text" :value="bookerInfo.uesrId"><br>
            <input name="bookerName" type="text" :value="bookerInfo.name"><br>
            <input name="bookerTel" type="text" :value="bookerInfo.tel"><br>
            <input name="bookerEmail" type="text" :value="bookerEmail"><br>

            <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.class" name="pkgComClass"><br>
            <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.name" name="pkgComName"><br>
            <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.tel" name="pkgComTel"><br>
            <input v-for="(pkgCom, index) in list" :key="index" :value="pkgCom.gender" name="pkgComGender"><br>

            <button type="submit">결제하기</button>
          </form>
          <br>
          <div class="btns">
            <Button @click="$router.back()">뒤로가기</Button>&emsp;
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
      aa:"none",
      iframeDisplay: 'none',
      packageDetails: {},
      selectedEmail: "triplus.com",
      bookerInfo: {
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
    bookerEmail(){
      if(typeof this.selectedEmail == "object"){
        return this.bookerInfo.emailId + "@" + this.selectedEmail.name;
      }
      return this.bookerInfo.emailId + "@" + this.selectedEmail;
    }
  },

  mounted() {
    for(let i=0; i<this.$route.query.adultCnt-1; i++){
      this.list.push({name: '', class: '성인'})
    }
    for(let i=0; i<this.$route.query.childCnt; i++){
      this.list.push({name: '', class: '아동'})
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
    //   this.bookerInfo = resp.data.dto;
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

.td-title{
  width: 150px;
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