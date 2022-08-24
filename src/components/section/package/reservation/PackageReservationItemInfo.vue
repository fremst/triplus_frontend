<template>
  <h1>상품 정보</h1>
  <table>
    <tr>
      <td>상품번호</td>
      <td>100</td>
    </tr>
    <tr>
      <td>상품명</td>
      <td>xx</td>
    </tr>
    <tr>
      <td>여행 기간</td>
      <td>xx</td>
    </tr>
    <tr>
      <td>출발일</td>
      <td>xx</td>
    </tr>
    <tr>
      <td>도착일</td>
      <td>xx</td>
    </tr>
    <tr>
      <td>여행자</td>
      <td>성인 xx명 / 아동 xx명</td>
    </tr>
  </table>
  <br>
  <h1>예약자 정보</h1>
  <table>
    <tr>
      <td>이름</td>
      <td><InputText type="text" class="p-inputtext-sm" v-model="value1"/></td>
      <td>생년월일</td>
      <td><InputText type="text" class="p-inputtext-sm" v-model="value1" /></td>
      <td>성별</td>
      <td>
        <RadioButton id="male" name="gender" value="male" v-model="gender" />
        <label for="male">남성</label>
        <br>
        <RadioButton id="female" name="gender" value="female" v-model="gender" />
        <label for="female">여성</label>
      </td>
    </tr>
    <tr>
      <td>이메일</td>
      <td colspan="5">
        <InputText type="text" class="p-inputtext-sm" v-model="value1" />
        &nbsp;@&nbsp;
        <Dropdown v-model="selectedDomain" class="p-inputtext-sm" :options="domains" editable optionLabel="name" placeholder="직접입력" />
      </td>
    </tr>
    <tr>
      <td>전화 번호</td>
      <td colspan="4">
        <InputText type="text" class="p-inputtext-sm" v-model="value1" />
      </td>
    </tr>
  </table>

  <h1>일행 정보</h1>

  <table v-for="(pkgCom, index) in list" :key="index">
    <tr>
      <td>
        구분
      </td>
      <td>
        {{pkgCom.class}}
      </td>
    </tr>
    <tr>
      <td>이름</td>
      <td><InputText type="text" class="p-inputtext-sm" :value="pkgCom.name" v-model="value1" /></td>
    </tr>
    <tr>
      <td>전화 번호</td>
      <td>
        <InputText type="text" class="p-inputtext-sm" v-model="value1" />
      </td>
    </tr>
  </table>

  <h1>할인 쿠폰 선택</h1>
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
<!--    <tr>-->
<!--      <td>할인금액</td>-->
<!--      <td>0 원</td>-->
<!--    </tr>-->
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
          xx 원
        </td>
        <td class="td-price">
          xx 원
        </td>
        <td class="td-price">
          xx 원
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sales: null,
      gender: 'male',
      list: [{name: '가성인', class: '성인'}, {name: '나성인', class: '성인'}, {name: '가아동', class: '아동'}],
      selectedDomain: "",
      selectedCoupon: "없음",
      domains: [
        {name: 'naver.com', value: 'naver.com'},
        {name: 'gmail.com', value: 'gmail.com'},
        {name: 'daum.net', value: 'daum.net'},
        {name: 'nate.com', value: 'nate.com'}
      ],
      coupons: [
        // {name: '없음', value: '0'}
      ]
    }
  },
  methods: {
    formatCurrency(value) {
      return value.toLocaleString('ko-KR')+' 원';
    }
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

</style>